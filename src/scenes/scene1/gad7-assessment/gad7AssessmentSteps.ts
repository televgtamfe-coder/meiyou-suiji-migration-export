import {
  Gad7AssessmentFieldKey,
  Gad7AssessmentStepId,
  gad7AssessmentStepCopy,
  gad7AssessmentStepOneFields,
  gad7AssessmentStepThreeFields,
  gad7AssessmentStepTwoFields,
} from './gad7AssessmentContent';

export type Gad7AssessmentStep = {
  id: Gad7AssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly Gad7AssessmentFieldKey[];
};

export const gad7AssessmentSteps: Gad7AssessmentStep[] = [
  {
    id: 1,
    ...gad7AssessmentStepCopy[1],
    fields: gad7AssessmentStepOneFields,
  },
  {
    id: 2,
    ...gad7AssessmentStepCopy[2],
    fields: gad7AssessmentStepTwoFields,
  },
  {
    id: 3,
    ...gad7AssessmentStepCopy[3],
    fields: gad7AssessmentStepThreeFields,
  },
];

export function getGad7AssessmentStep(stepId: Gad7AssessmentStepId) {
  return gad7AssessmentSteps.find((step) => step.id === stepId) ?? gad7AssessmentSteps[0];
}
