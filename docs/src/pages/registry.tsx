import React from 'react';
import IntroductionPage from './IntroductionPage';
import QuickstartPage from './QuickstartPage';
import AvatarPage from './AvatarPage';
import IconsPage from './IconsPage';
import PasswordPage from './PasswordPage';
import PhoneInputPage from './PhoneInputPage';
import CardNumberPage from './CardNumberPage';
import ExpiryCVCPage from './ExpiryCVCPage';
import LabelsPage from './LabelsPage';
import FormPatternsPage from './FormPatternsPage';
import FormPreviewsPage from './FormPreviewsPage';
import ColorsPage from './ColorsPage';
import ShadowsPage from './ShadowsPage';
import TypographyPage from './TypographyPage';
import ChatBubblePage from './ChatBubblePage';
import MenuPage from './MenuPage';
import DialogPage from './DialogPage';
import PopoverPage from './PopoverPage';
import MarkdownPage from './MarkdownPage';
import ShortcutCodeblockPage from './ShortcutCodeblockPage';
import { ComponentPage } from './ComponentPage';
import { COMPONENT_SPECS } from './componentSpecs';

export const PAGE_REGISTRY: Record<string, React.ComponentType> = {
  password: PasswordPage,
  phone: PhoneInputPage,
  card: CardNumberPage,
  expiry: ExpiryCVCPage,
  labels: LabelsPage,
  'form-patterns': FormPatternsPage,
  'form-previews': FormPreviewsPage,

  introduction: IntroductionPage,
  quickstart: QuickstartPage,
  colors: ColorsPage,
  shadows: ShadowsPage,
  typography: TypographyPage,
  avatar: AvatarPage,
  icons: IconsPage,
  chatbubble: ChatBubblePage,
  menu: MenuPage,
  dialog: DialogPage,
  popover: PopoverPage,
  markdown: MarkdownPage,
  'shortcut-codeblock': ShortcutCodeblockPage,
  ...Object.fromEntries(
    Object.entries(COMPONENT_SPECS).map(([id, spec]) => [
      id,
      function SpecPage() {
        return <ComponentPage spec={spec} />;
      },
    ])
  ),
};
