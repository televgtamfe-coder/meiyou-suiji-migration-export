import {
  Phq9AssessmentFieldKey,
  Phq9AssessmentStepId,
  phq9AssessmentStepCopy,
  phq9AssessmentStepOneFields,
  phq9AssessmentStepThreeFields,
  phq9AssessmentStepTwoFields,
} from './phq9AssessmentContent';

export type Phq9AssessmentStep = {
  id: Phq9AssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly Phq9AssessmentFieldKey[];
};

export const phq9AssessmentSteps: Phq9AssessmentStep[] = [
  {
    id: 1,
    ...phq9AssessmentStepCopy[1],
    fields: phq9AssessmentStepOneFields,
  },
  {
    id: 2,
    ...phq9AssessmentStepCopy[2],
    fields: phq9AssessmentStepTwoFields,
  },
  {
    id: 3,
    ...phq9AssessmentStepCopy[3],
    fields: phq9AssessmentStepThreeFields,
  },
];

export function getPhq9AssessmentStep(stepId: Phq9AssessmentStepId) {
  return phq9AssessmentSteps.find((step) => step.id === stepId) ?? phq9AssessmentSteps[0];
}
