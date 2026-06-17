import type {
  EmqR13AssessmentAnswers,
  EmqR13AssessmentDraftSnapshot,
} from './emqR13AssessmentState';

export const SCENE1_EMQ_R13_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:emq-r13-assessment-draft';
export const SCENE1_EMQ_R13_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:emq-r13-assessment-latest';

export type EmqR13AssessmentLatestRecord = {
  answers: EmqR13AssessmentAnswers;
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

export function readEmqR13AssessmentDraft() {
  return readJson<EmqR13AssessmentDraftSnapshot>(SCENE1_EMQ_R13_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeEmqR13AssessmentDraft(draft: EmqR13AssessmentDraftSnapshot) {
  writeJson(SCENE1_EMQ_R13_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearEmqR13AssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_EMQ_R13_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readEmqR13AssessmentLatest() {
  return readJson<EmqR13AssessmentLatestRecord>(SCENE1_EMQ_R13_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeEmqR13AssessmentLatest(record: EmqR13AssessmentLatestRecord) {
  writeJson(SCENE1_EMQ_R13_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
