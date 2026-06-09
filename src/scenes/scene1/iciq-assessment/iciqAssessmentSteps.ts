import { IciqAssessmentFieldKey, IciqAssessmentStepId, iciqAssessmentStepCopy } from './iciqAssessmentContent';

export type IciqAssessmentStep = {
  id: IciqAssessmentStepId;
  title: string;
  subtitle: string;
  fields: readonly IciqAssessmentFieldKey[];
};

export const iciqAssessmentSteps: IciqAssessmentStep[] = [
  { id: 1, ...iciqAssessmentStepCopy[1], fields: ['iciqLeakFrequency', 'iciqLeakAmount'] },
  { id: 2, ...iciqAssessmentStepCopy[2], fields: ['iciqImpact', 'iciqLeakTriggers'] },
];

export function getIciqAssessmentStep(stepId: IciqAssessmentStepId) {
  return iciqAssessmentSteps.find((step) => step.id === stepId) ?? iciqAssessmentSteps[0];
}
