import type { TimelineEntry } from './record';

export type TimelineBlock =
  | { id: string; type: 'day'; date: string; weekday: string; isToday?: boolean }
  | TimelineEntry;

export type Scene1State = {
  activeTab: 'cal' | 'note';
  showAnalysisNotice: boolean;
  timeline: TimelineBlock[];
};
