import { scene1Modes } from './scene1Data';

export type Scene1Mode = (typeof scene1Modes)[number];

export type Scene1State = {
  activeTab: 'cal' | 'note';
  showAnalysisNotice: boolean;
  periodConfirmed: boolean;
  selectedMode: Scene1Mode;
};

export function createScene1State(): Scene1State {
  return {
    activeTab: 'cal',
    showAnalysisNotice: false,
    periodConfirmed: false,
    selectedMode: '经期',
  };
}

export function confirmPeriodStart(state: Scene1State): Scene1State {
  return {
    ...state,
    periodConfirmed: true,
    showAnalysisNotice: true,
  };
}

export function dismissAnalysisNotice(state: Scene1State): Scene1State {
  return {
    ...state,
    showAnalysisNotice: false,
  };
}

export function selectScene1Mode(state: Scene1State, mode: Scene1Mode): Scene1State {
  return {
    ...state,
    selectedMode: mode,
  };
}
