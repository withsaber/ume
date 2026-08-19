import './codeblock.css';
export interface CodeBlockProps {
    code: string;
    title?: string;
    className?: string;
}
export declare function CodeBlock({ code, title, className }: CodeBlockProps): any;
