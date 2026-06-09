import type { AssessmentAnswers } from './assessmentState';

export const SCENE1_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:assessment-latest';

export type Scene1AssessmentLatestRecord = {
  answers: AssessmentAnswers;
  completedAt: string;
};

function readJson<T>(storageKey: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(storageKey);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
}

function writeJson(storageKey: string, value: unknown) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

export function readScene1AssessmentLatest() {
  return readJson<Scene1AssessmentLatestRecord>(SCENE1_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeScene1AssessmentLatest(record: Scene1AssessmentLatestRecord) {
  writeJson(SCENE1_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
