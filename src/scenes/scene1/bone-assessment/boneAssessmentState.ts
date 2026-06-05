import { BoneAssessmentFieldKey, BoneAssessmentStepId } from './boneAssessmentContent';
import { getBoneAssessmentAutofilledFields } from './boneAssessmentSharedProfile';
import { getBoneAssessmentStep, boneAssessmentSteps } from './boneAssessmentSteps';

export type BoneAssessmentAnswers = Record<BoneAssessmentFieldKey, string>;

export type BoneAssessmentDraftSnapshot = {
  currentStep: BoneAssessmentStepId;
  answers: BoneAssessmentAnswers;
  hiddenFields: BoneAssessmentFieldKey[];
};

export type BoneAssessmentState = {
  currentStep: BoneAssessmentStepId;
  completed: boolean;
  answers: BoneAssessmentAnswers;
  hiddenFields: BoneAssessmentFieldKey[];
};

type BoneAssessmentSharedProfile = Partial<Record<'age' | 'heightCm' | 'weightKg', string>>;

const emptyAnswers: BoneAssessmentAnswers = {
  age: '',
  heightCm: '',
  weightKg: '',
  boneParentOsteoporosisOrFragilityFracture: '',
  boneParentHunchback: '',
  boneAdultFragilityFracture: '',
  boneFrequentFallsOrFear: '',
  boneHeightLossOver3cm: '',
  boneSteroidOver3Months: '',
  boneRheumatoidArthritis: '',
  boneSecondaryDisease: '',
  boneHeavyAlcohol: '',
  boneSmokingHistory: '',
  boneExerciseUnder30Min: '',
  boneNoDairyAndNoCalcium: '',
  boneOutdoorUnder10MinAndNoVitaminD: '',
  boneMenopauseBefore45: '',
  boneAmenorrheaOver12Months: '',
  boneOvaryRemovalBefore50WithoutHrt: '',
  vdSunExposureUnder20Min: '',
  vdStrictSunProtection: '',
  vdMostlyIndoor: '',
  vdDietLack: '',
  vdDigestiveAbsorptionIssue: '',
  vdDarkSkin: '',
  vdBoneMuscleDiscomfort: '',
  vdLegCramp: '',
  vdFatigueMoodAnxiety: '',
  vdBrittleNails: '',
};

export function createEmptyBoneAssessmentAnswers(
  overrides: Partial<BoneAssessmentAnswers> = {}
): BoneAssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

function getFirstVisibleBoneAssessmentStepId(hiddenFields: BoneAssessmentFieldKey[]) {
  const visibleStep = boneAssessmentSteps.find((step) =>
    step.fields.some((field) => !hiddenFields.includes(field))
  );

  return visibleStep?.id ?? 1;
}

function sanitizeBoneAssessmentCurrentStep(
  currentStep: BoneAssessmentStepId,
  hiddenFields: BoneAssessmentFieldKey[]
) {
  const visibleSteps = boneAssessmentSteps.filter((step) =>
    step.fields.some((field) => !hiddenFields.includes(field))
  );

  if (visibleSteps.some((step) => step.id === currentStep)) {
    return currentStep;
  }

  return visibleSteps[0]?.id ?? 1;
}

export function createBoneAssessmentState(
  sharedProfile?: BoneAssessmentSharedProfile,
  draft?: BoneAssessmentDraftSnapshot | null
): BoneAssessmentState {
  const autofilledFields = getBoneAssessmentAutofilledFields(sharedProfile ?? {});

  if (draft) {
    return {
      currentStep: sanitizeBoneAssessmentCurrentStep(draft.currentStep, draft.hiddenFields ?? autofilledFields),
      completed: false,
      answers: createEmptyBoneAssessmentAnswers({
        ...draft.answers,
      }),
      hiddenFields: draft.hiddenFields ?? autofilledFields,
    };
  }

  const answers = createEmptyBoneAssessmentAnswers({
    age: sharedProfile?.age ?? '',
    heightCm: sharedProfile?.heightCm ?? '',
    weightKg: sharedProfile?.weightKg ?? '',
  });

  return {
    currentStep: getFirstVisibleBoneAssessmentStepId(autofilledFields),
    completed: false,
    answers,
    hiddenFields: autofilledFields,
  };
}

export function getVisibleBoneAssessmentSteps(state: BoneAssessmentState) {
  return boneAssessmentSteps
    .map((step) => ({
      ...step,
      fields: step.fields.filter((field) => !state.hiddenFields.includes(field)),
    }))
    .filter((step) => step.fields.length > 0);
}

export function getCurrentBoneAssessmentStep(state: BoneAssessmentState) {
  const visibleSteps = getVisibleBoneAssessmentSteps(state);
  return visibleSteps.find((step) => step.id === state.currentStep) ?? visibleSteps[0] ?? getBoneAssessmentStep(1);
}

export function getCurrentBoneAssessmentStepIndex(state: BoneAssessmentState) {
  const visibleSteps = getVisibleBoneAssessmentSteps(state);
  const currentIndex = visibleSteps.findIndex((step) => step.id === state.currentStep);
  return currentIndex >= 0 ? currentIndex + 1 : 1;
}

export function getBoneAssessmentTotalSteps(state: BoneAssessmentState) {
  return getVisibleBoneAssessmentSteps(state).length;
}

export function answerBoneAssessmentField(
  state: BoneAssessmentState,
  field: BoneAssessmentFieldKey,
  value: string
): BoneAssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isBoneAssessmentStepComplete(state: BoneAssessmentState) {
  const currentStep = getCurrentBoneAssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextBoneAssessmentStep(state: BoneAssessmentState): BoneAssessmentState {
  const visibleSteps = getVisibleBoneAssessmentSteps(state);
  const currentIndex = visibleSteps.findIndex((step) => step.id === state.currentStep);
  const nextStep = visibleSteps[Math.min(currentIndex + 1, visibleSteps.length - 1)];

  return {
    ...state,
    currentStep: nextStep?.id ?? state.currentStep,
  };
}

export function goToPreviousBoneAssessmentStep(state: BoneAssessmentState): BoneAssessmentState {
  const visibleSteps = getVisibleBoneAssessmentSteps(state);
  const currentIndex = visibleSteps.findIndex((step) => step.id === state.currentStep);
  const previousStep = visibleSteps[Math.max(currentIndex - 1, 0)];

  return {
    ...state,
    currentStep: previousStep?.id ?? state.currentStep,
  };
}
