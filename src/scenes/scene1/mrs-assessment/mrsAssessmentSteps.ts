import {
  MrsAssessmentFieldKey,
  MrsAssessmentStepId,
  mrsAssessmentStepCopy,
  mrsAssessmentStepOneFields,
  mrsAssessmentStepTwoFields,
  mrsAssessmentStepThreeFields,
} from './mrsAssessmentContent';

export type MrsAssessmentStep = {
  id: MrsAssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly MrsAssessmentFieldKey[];
};

export const mrsAssessmentSteps: MrsAssessmentStep[] = [
  { id: 1, ...mrsAssessmentStepCopy[1], fields: mrsAssessmentStepOneFields },
  { id: 2, ...mrsAssessmentStepCopy[2], fields: mrsAssessmentStepTwoFields },
  { id: 3, ...mrsAssessmentStepCopy[3], fields: mrsAssessmentStepThreeFields },
];

export function getMrsAssessmentStep(stepId: MrsAssessmentStepId) {
  return mrsAssessmentSteps.find((step) => step.id === stepId) ?? mrsAssessmentSteps[0];
}
