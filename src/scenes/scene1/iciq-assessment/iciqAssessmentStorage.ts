import type { IciqAssessmentAnswers, IciqAssessmentDraftSnapshot } from './iciqAssessmentState';

export const SCENE1_ICIQ_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:iciq-assessment-draft';
export const SCENE1_ICIQ_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:iciq-assessment-latest';

export type IciqAssessmentLatestRecord = {
  answers: IciqAssessmentAnswers;
  completedAt: string;
  previousAnswers?: IciqAssessmentAnswers;
  previousCompletedAt?: string;
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

export function readIciqAssessmentDraft() {
  return readJson<IciqAssessmentDraftSnapshot>(SCENE1_ICIQ_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeIciqAssessmentDraft(draft: IciqAssessmentDraftSnapshot) {
  writeJson(SCENE1_ICIQ_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearIciqAssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_ICIQ_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readIciqAssessmentLatest() {
  return readJson<IciqAssessmentLatestRecord>(SCENE1_ICIQ_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeIciqAssessmentLatest(record: IciqAssessmentLatestRecord) {
  const previousRecord = readIciqAssessmentLatest();

  writeJson(SCENE1_ICIQ_ASSESSMENT_LATEST_STORAGE_KEY, {
    ...record,
    previousAnswers: record.previousAnswers ?? previousRecord?.answers,
    previousCompletedAt: record.previousCompletedAt ?? previousRecord?.completedAt,
  });
}
