#!/usr/bin/env python3
"""Thin client for the Paper Desktop MCP server (streamable HTTP).

Usage:
  paper_mcp.py tools                          -> list tool names
  paper_mcp.py call <tool> '<json-args>'      -> call a tool, print text result
  paper_mcp.py call <tool> @file.json         -> args from file
"""
import json, sys, urllib.request, uuid

URL = "http://127.0.0.1:29979/mcp"

def _post(payload, session=None, timeout=120):
    req = urllib.request.Request(URL, data=json.dumps(payload).encode(), method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json, text/event-stream")
    if session:
        req.add_header("mcp-session-id", session)
    resp = urllib.request.urlopen(req, timeout=timeout)
    sid = resp.headers.get("mcp-session-id", session)
    raw = resp.read().decode()
    want_id = payload.get("id")
    chosen, fallback = None, None
    if raw.lstrip().startswith(("event:", "data:")) or "\ndata:" in raw:
        for line in raw.splitlines():
            if line.startswith("data:"):
                chunk = line[5:].strip()
                if not chunk:
                    continue
                try:
                    msg = json.loads(chunk)
                except json.JSONDecodeError:
                    continue
                fallback = msg
                if want_id is not None and msg.get("id") == want_id:
                    chosen = msg
        result = chosen or fallback
    else:
        result = json.loads(raw) if raw.strip() else None
    return result, sid

class PaperMCP:
    FILE_ID = "01M0DP6PXQ0Q5Z4WHCJKDX0B4V"  # Ume - Design system

    def __init__(self, auto_open=True):
        init, self.sid = _post({
            "jsonrpc": "2.0", "id": 1, "method": "initialize",
            "params": {"protocolVersion": "2025-03-26", "capabilities": {},
                       "clientInfo": {"name": "hermes", "version": "1.0"}}})
        # initialized notification (no id)
        _post({"jsonrpc": "2.0", "method": "notifications/initialized"}, self.sid)
        self._id = 1
        if auto_open:
            self.call("open_file", {"fileId": self.FILE_ID})

    def call(self, tool, args=None, timeout=300):
        self._id += 1
        res, _ = _post({"jsonrpc": "2.0", "id": self._id, "method": "tools/call",
                        "params": {"name": tool, "arguments": args or {}}},
                       self.sid, timeout=timeout)
        if res is None:
            return {"error": "empty response"}
        if "error" in res:
            return {"error": res["error"]}
        return res.get("result", res)

    def list_tools(self):
        self._id += 1
        res, _ = _post({"jsonrpc": "2.0", "id": self._id, "method": "tools/list",
                        "params": {}}, self.sid)
        return res.get("result", {}).get("tools", [])

def main():
    if len(sys.argv) < 2:
        print(__doc__); return
    mcp = PaperMCP()
    if sys.argv[1] == "tools":
        for t in mcp.list_tools():
            print(t["name"])
        return
    if sys.argv[1] == "call":
        tool = sys.argv[2]
        argstr = sys.argv[3] if len(sys.argv) > 3 else "{}"
        if argstr.startswith("@"):
            args = json.load(open(argstr[1:]))
        else:
            args = json.loads(argstr)
        result = mcp.call(tool, args)
        # MCP content blocks -> text
        if isinstance(result, dict) and "content" in result:
            out = []
            for c in result["content"]:
                if c.get("type") == "text":
                    out.append(c["text"])
                else:
                    out.append(json.dumps(c)[:500])
            print("\n".join(out))
            if result.get("isError"):
                sys.exit(1)
        else:
            print(json.dumps(result, indent=2)[:8000])
        return
    print(__doc__)

if __name__ == "__main__":
    main()
