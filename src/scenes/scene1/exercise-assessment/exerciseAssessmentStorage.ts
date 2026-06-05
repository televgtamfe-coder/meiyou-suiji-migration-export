import type {
  ExerciseAssessmentAnswers,
  ExerciseAssessmentDraftSnapshot,
} from './exerciseAssessmentState';

export const SCENE1_EXERCISE_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:exercise-assessment-draft';
export const SCENE1_EXERCISE_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:exercise-assessment-latest';

export type ExerciseAssessmentLatestRecord = {
  answers: ExerciseAssessmentAnswers;
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

export function readExerciseAssessmentDraft() {
  return readJson<ExerciseAssessmentDraftSnapshot>(SCENE1_EXERCISE_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeExerciseAssessmentDraft(draft: ExerciseAssessmentDraftSnapshot) {
  writeJson(SCENE1_EXERCISE_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearExerciseAssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_EXERCISE_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readExerciseAssessmentLatest() {
  return readJson<ExerciseAssessmentLatestRecord>(SCENE1_EXERCISE_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeExerciseAssessmentLatest(record: ExerciseAssessmentLatestRecord) {
  writeJson(SCENE1_EXERCISE_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
