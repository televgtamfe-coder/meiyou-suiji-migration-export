import type {
  Gad7AssessmentAnswers,
  Gad7AssessmentDraftSnapshot,
} from './gad7AssessmentState';

export const SCENE1_GAD7_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:gad7-assessment-draft';
export const SCENE1_GAD7_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:gad7-assessment-latest';

export type Gad7AssessmentLatestRecord = {
  answers: Gad7AssessmentAnswers;
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

export function readGad7AssessmentDraft() {
  return readJson<Gad7AssessmentDraftSnapshot>(SCENE1_GAD7_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeGad7AssessmentDraft(draft: Gad7AssessmentDraftSnapshot) {
  writeJson(SCENE1_GAD7_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearGad7AssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_GAD7_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readGad7AssessmentLatest() {
  return readJson<Gad7AssessmentLatestRecord>(SCENE1_GAD7_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeGad7AssessmentLatest(record: Gad7AssessmentLatestRecord) {
  writeJson(SCENE1_GAD7_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
