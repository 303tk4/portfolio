import type {
  Locale,
  LocalizedString,
  LocalizedStringArray,
} from '../types/project';

export const LOCALE_OPTIONS: ReadonlyArray<{ code: Locale; label: string }> = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'EN' },
  { code: 'zh-TW', label: '繁體中文' },
];

const FALLBACK_ORDER: Locale[] = ['ja', 'en', 'zh-TW'];

export function isLocale(value: string | null): value is Locale {
  return value === 'ja' || value === 'en' || value === 'zh-TW';
}

export function resolveText(value: LocalizedString, locale: Locale): string {
  if (typeof value === 'string') {
    return value;
  }
  const localized = value[locale];
  if (localized !== undefined) {
    return localized;
  }
  for (const fallback of FALLBACK_ORDER) {
    const candidate = value[fallback];
    if (candidate !== undefined) {
      return candidate;
    }
  }
  return '';
}

export function resolveList(
  value: LocalizedStringArray,
  locale: Locale,
): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  const localized = value[locale];
  if (localized !== undefined) {
    return localized;
  }
  for (const fallback of FALLBACK_ORDER) {
    const candidate = value[fallback];
    if (candidate !== undefined) {
      return candidate;
    }
  }
  return [];
}

const APP_LANGUAGE_NAMES: Record<string, Record<Locale, string>> = {
  en: { ja: '英語', en: 'English', 'zh-TW': '英語' },
  ja: { ja: '日本語', en: 'Japanese', 'zh-TW': '日語' },
  'zh-TW': { ja: '繁体中文', en: 'Trad. Chinese', 'zh-TW': '繁體中文' },
  vi: { ja: 'ベトナム語', en: 'Vietnamese', 'zh-TW': '越南語' },
};

export function formatAppLanguages(codes: string[], locale: Locale): string {
  const separator = locale === 'en' ? ' · ' : '・';
  return codes
    .map((code) => APP_LANGUAGE_NAMES[code]?.[locale] ?? code)
    .join(separator);
}

export interface UiTranslations {
  languageSwitcherLabel: string;
  socialLinksLabel: string;
  worksHeading: string;
  worksSubheading: string;
  projectsCountSuffix: string;
  filterGroupLabel: string;
  allTagLabel: string;
  noMatchingProjects: string;
  featuredLabel: string;
  openAppLabel: string;
  githubLabel: string;
  viewDetailsPrefix: string;
  screenshotAltSuffix: string;
  modalPreviewAltSuffix: string;
  closeModalLabel: string;
  overviewHeading: string;
  highlightsHeading: string;
  techStackHeading: string;
  supportedLanguagesLabel: string;
  previewUnavailableLabel: string;
  footerUpdateHint: string;
  statuses: Record<string, string>;
}

export const UI_TEXT: Record<Locale, UiTranslations> = {
  ja: {
    languageSwitcherLabel: '表示言語の切り替え',
    socialLinksLabel: 'ソーシャルリンク',
    worksHeading: 'Works',
    worksSubheading: 'カードをクリックすると詳細や工夫した点を確認できます。',
    projectsCountSuffix: 'projects',
    filterGroupLabel: '技術タグで作品を絞り込む',
    allTagLabel: 'All',
    noMatchingProjects: '該当するタグの作品が見つかりませんでした。',
    featuredLabel: 'Featured',
    openAppLabel: 'アプリを開く',
    githubLabel: 'GitHub',
    viewDetailsPrefix: 'の詳細を表示',
    screenshotAltSuffix: 'のスクリーンショット',
    modalPreviewAltSuffix: 'のプレビュー',
    closeModalLabel: 'モーダルを閉じる',
    overviewHeading: '概要',
    highlightsHeading: '工夫した点・特徴',
    techStackHeading: '技術スタック',
    supportedLanguagesLabel: '対応言語',
    previewUnavailableLabel: 'Preview Unavailable',
    footerUpdateHint: 'Update works via src/data/projects.json',
    statuses: {
      Live: 'Live',
      'In Development': 'In Development',
      Beta: 'Beta',
      Archived: 'Archived',
    },
  },
  en: {
    languageSwitcherLabel: 'Switch display language',
    socialLinksLabel: 'Social links',
    worksHeading: 'Works',
    worksSubheading: 'Click a card to inspect details and technical highlights.',
    projectsCountSuffix: 'projects',
    filterGroupLabel: 'Filter projects by technology tag',
    allTagLabel: 'All',
    noMatchingProjects: 'No projects matched the selected tag.',
    featuredLabel: 'Featured',
    openAppLabel: 'Open App',
    githubLabel: 'GitHub',
    viewDetailsPrefix: ' — view details',
    screenshotAltSuffix: ' screenshot',
    modalPreviewAltSuffix: ' preview',
    closeModalLabel: 'Close modal',
    overviewHeading: 'Overview',
    highlightsHeading: 'Highlights & Engineering',
    techStackHeading: 'Tech Stack',
    supportedLanguagesLabel: 'Supported Languages',
    previewUnavailableLabel: 'Preview Unavailable',
    footerUpdateHint: 'Update works via src/data/projects.json',
    statuses: {
      Live: 'Live',
      'In Development': 'In Development',
      Beta: 'Beta',
      Archived: 'Archived',
    },
  },
  'zh-TW': {
    languageSwitcherLabel: '切換顯示語言',
    socialLinksLabel: '社群連結',
    worksHeading: 'Works',
    worksSubheading: '點擊卡片即可查看詳細說明與開發亮點。',
    projectsCountSuffix: 'projects',
    filterGroupLabel: '依技術標籤篩選作品',
    allTagLabel: 'All',
    noMatchingProjects: '找不到符合所選標籤的作品。',
    featuredLabel: 'Featured',
    openAppLabel: '開啟應用',
    githubLabel: 'GitHub',
    viewDetailsPrefix: ' 的詳細資訊',
    screenshotAltSuffix: ' 畫面截圖',
    modalPreviewAltSuffix: ' 預覽圖',
    closeModalLabel: '關閉視窗',
    overviewHeading: '簡介',
    highlightsHeading: '技術亮點與特色',
    techStackHeading: '技術棧',
    supportedLanguagesLabel: '支援語言',
    previewUnavailableLabel: 'Preview Unavailable',
    footerUpdateHint: 'Update works via src/data/projects.json',
    statuses: {
      Live: 'Live',
      'In Development': 'In Development',
      Beta: 'Beta',
      Archived: 'Archived',
    },
  },
};
