import type { PsqiAssessmentAnswers, PsqiAssessmentDraftSnapshot } from './psqiAssessmentState';

export const SCENE1_PSQI_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:psqi-assessment-draft';
export const SCENE1_PSQI_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:psqi-assessment-latest';

export type PsqiAssessmentLatestRecord = {
  answers: PsqiAssessmentAnswers;
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

export function readPsqiAssessmentDraft() {
  return readJson<PsqiAssessmentDraftSnapshot>(SCENE1_PSQI_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writePsqiAssessmentDraft(draft: PsqiAssessmentDraftSnapshot) {
  writeJson(SCENE1_PSQI_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearPsqiAssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_PSQI_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readPsqiAssessmentLatest() {
  return readJson<PsqiAssessmentLatestRecord>(SCENE1_PSQI_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writePsqiAssessmentLatest(record: PsqiAssessmentLatestRecord) {
  writeJson(SCENE1_PSQI_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
