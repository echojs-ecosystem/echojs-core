import type { TestingCodePanel } from "@entities/home/constants/testing-advantages.js";

export type CompareTone = "muted" | "accent";

export type CompareCardData = {
  title: string;
  items: readonly string[];
};

export type CodeTab = {
  readonly id: string;
  readonly label: string;
  readonly layer: string;
  readonly icon: string;
  readonly code: string;
  readonly lang: string;
  readonly title: string;
  readonly body: string;
  readonly points: readonly string[];
};

export type HomeVM = {
  activeCodeTab: () => CodeTab;
  setCodeTab: (index: number) => void;
  isCodeTabActive: (index: number) => boolean;
  activeTestingPanel: () => TestingCodePanel;
  setTestingPanel: (index: number) => void;
  isTestingPanelActive: (index: number) => boolean;
};

export type CompareCardViewProps = {
  tone: CompareTone;
  data: CompareCardData;
};
