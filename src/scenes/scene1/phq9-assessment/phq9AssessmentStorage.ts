import type {
  Phq9AssessmentAnswers,
  Phq9AssessmentDraftSnapshot,
} from './phq9AssessmentState';

export const SCENE1_PHQ9_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:phq9-assessment-draft';
export const SCENE1_PHQ9_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:phq9-assessment-latest';

export type Phq9AssessmentLatestRecord = {
  answers: Phq9AssessmentAnswers;
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

export function readPhq9AssessmentDraft() {
  return readJson<Phq9AssessmentDraftSnapshot>(SCENE1_PHQ9_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writePhq9AssessmentDraft(draft: Phq9AssessmentDraftSnapshot) {
  writeJson(SCENE1_PHQ9_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearPhq9AssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_PHQ9_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readPhq9AssessmentLatest() {
  return readJson<Phq9AssessmentLatestRecord>(SCENE1_PHQ9_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writePhq9AssessmentLatest(record: Phq9AssessmentLatestRecord) {
  writeJson(SCENE1_PHQ9_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
