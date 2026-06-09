import {
  PsqiAssessmentFieldKey,
  PsqiAssessmentStepId,
  psqiAssessmentStepCopy,
  psqiAssessmentStepOneFields,
  psqiAssessmentStepTwoFields,
  psqiAssessmentStepThreeFields,
} from './psqiAssessmentContent';

export type PsqiAssessmentStep = {
  id: PsqiAssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly PsqiAssessmentFieldKey[];
};

export const psqiAssessmentSteps: PsqiAssessmentStep[] = [
  { id: 1, ...psqiAssessmentStepCopy[1], fields: psqiAssessmentStepOneFields },
  { id: 2, ...psqiAssessmentStepCopy[2], fields: psqiAssessmentStepTwoFields },
  { id: 3, ...psqiAssessmentStepCopy[3], fields: psqiAssessmentStepThreeFields },
];

export function getPsqiAssessmentStep(stepId: PsqiAssessmentStepId) {
  return psqiAssessmentSteps.find((step) => step.id === stepId) ?? psqiAssessmentSteps[0];
}
