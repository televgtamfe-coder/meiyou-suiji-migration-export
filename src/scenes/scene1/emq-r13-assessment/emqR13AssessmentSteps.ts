import {
  EmqR13AssessmentFieldKey,
  EmqR13AssessmentStepId,
  emqR13AssessmentStepCopy,
  emqR13AssessmentStepOneFields,
  emqR13AssessmentStepThreeFields,
  emqR13AssessmentStepTwoFields,
} from './emqR13AssessmentContent';

export type EmqR13AssessmentStep = {
  id: EmqR13AssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly EmqR13AssessmentFieldKey[];
};

export const emqR13AssessmentSteps: EmqR13AssessmentStep[] = [
  { id: 1, ...emqR13AssessmentStepCopy[1], fields: emqR13AssessmentStepOneFields },
  { id: 2, ...emqR13AssessmentStepCopy[2], fields: emqR13AssessmentStepTwoFields },
  { id: 3, ...emqR13AssessmentStepCopy[3], fields: emqR13AssessmentStepThreeFields },
];

export function getEmqR13AssessmentStep(stepId: EmqR13AssessmentStepId) {
  return emqR13AssessmentSteps.find((step) => step.id === stepId) ?? emqR13AssessmentSteps[0];
}
