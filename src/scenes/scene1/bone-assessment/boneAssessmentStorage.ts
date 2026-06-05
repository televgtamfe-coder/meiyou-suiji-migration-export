import type { BoneAssessmentAnswers, BoneAssessmentDraftSnapshot } from './boneAssessmentState';

export const SCENE1_HEALTH_PROFILE_STORAGE_KEY = 'scene1:health-profile';
export const SCENE1_BONE_ASSESSMENT_DRAFT_STORAGE_KEY = 'scene1:bone-assessment-draft';
export const SCENE1_BONE_ASSESSMENT_LATEST_STORAGE_KEY = 'scene1:bone-assessment-latest';

export type Scene1HealthProfile = Partial<Record<'age' | 'heightCm' | 'weightKg', string>>;

export type BoneAssessmentLatestRecord = {
  answers: BoneAssessmentAnswers;
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

export function readScene1HealthProfile() {
  return readJson<Scene1HealthProfile>(SCENE1_HEALTH_PROFILE_STORAGE_KEY);
}

export function writeScene1HealthProfile(profile: Scene1HealthProfile) {
  const previousProfile = readScene1HealthProfile() ?? {};
  const nextProfile: Scene1HealthProfile = {
    ...previousProfile,
  };

  (Object.keys(profile) as Array<keyof Scene1HealthProfile>).forEach((key) => {
    const value = profile[key];

    if (typeof value !== 'string') {
      return;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    nextProfile[key] = trimmedValue;
  });

  writeJson(SCENE1_HEALTH_PROFILE_STORAGE_KEY, nextProfile);
}

export function readBoneAssessmentDraft() {
  return readJson<BoneAssessmentDraftSnapshot>(SCENE1_BONE_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function writeBoneAssessmentDraft(draft: BoneAssessmentDraftSnapshot) {
  writeJson(SCENE1_BONE_ASSESSMENT_DRAFT_STORAGE_KEY, draft);
}

export function clearBoneAssessmentDraft() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SCENE1_BONE_ASSESSMENT_DRAFT_STORAGE_KEY);
}

export function readBoneAssessmentLatest() {
  return readJson<BoneAssessmentLatestRecord>(SCENE1_BONE_ASSESSMENT_LATEST_STORAGE_KEY);
}

export function writeBoneAssessmentLatest(record: BoneAssessmentLatestRecord) {
  writeJson(SCENE1_BONE_ASSESSMENT_LATEST_STORAGE_KEY, record);
}
