import type { MrsAssessmentAnswers, MrsAssessmentDraftSnapshot } from './mrsAssessmentState';

export const SCENE1_MRS_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:mrs-assessment-draft';
export const SCENE1_MRS_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:mrs-assessment-latest';

export type MrsAssessmentLatestRecord = {
  answers: MrsAssessmentAnswers;
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

export function readMrsAssessmentDraft() {
  return readJson<MrsAssessmentDraftSnapshot>(SCENE1_MRS_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeMrsAssessmentDraft(draft: MrsAssessmentDraftSnapshot) {
  writeJson(SCENE1_MRS_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearMrsAssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_MRS_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readMrsAssessmentLatest() {
  return readJson<MrsAssessmentLatestRecord>(SCENE1_MRS_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeMrsAssessmentLatest(record: MrsAssessmentLatestRecord) {
  writeJson(SCENE1_MRS_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
