import {
  boneAssessmentBoneRiskStepAFields,
  boneAssessmentBoneRiskStepBFields,
  BoneAssessmentFieldKey,
  boneAssessmentProfileFields,
  BoneAssessmentStepId,
  boneAssessmentStepCopy,
  boneAssessmentVitaminDRiskStepAFields,
  boneAssessmentVitaminDRiskStepBFields,
} from './boneAssessmentContent';

export type BoneAssessmentStepDefinition = {
  id: BoneAssessmentStepId;
  title: string;
  subtitle: string;
  fields: BoneAssessmentFieldKey[];
};

export const boneAssessmentSteps: BoneAssessmentStepDefinition[] = [
  {
    id: 1,
    title: boneAssessmentStepCopy[1].title,
    subtitle: boneAssessmentStepCopy[1].subtitle,
    fields: [...boneAssessmentProfileFields],
  },
  {
    id: 2,
    title: boneAssessmentStepCopy[2].title,
    subtitle: boneAssessmentStepCopy[2].subtitle,
    fields: [...boneAssessmentBoneRiskStepAFields],
  },
  {
    id: 3,
    title: boneAssessmentStepCopy[3].title,
    subtitle: boneAssessmentStepCopy[3].subtitle,
    fields: [...boneAssessmentBoneRiskStepBFields],
  },
  {
    id: 4,
    title: boneAssessmentStepCopy[4].title,
    subtitle: boneAssessmentStepCopy[4].subtitle,
    fields: [...boneAssessmentVitaminDRiskStepAFields],
  },
  {
    id: 5,
    title: boneAssessmentStepCopy[5].title,
    subtitle: boneAssessmentStepCopy[5].subtitle,
    fields: [...boneAssessmentVitaminDRiskStepBFields],
  },
];

export function getBoneAssessmentStep(id: BoneAssessmentStepId) {
  const step = boneAssessmentSteps.find((item) => item.id === id);

  if (!step) {
    throw new Error(`Unknown bone assessment step: ${id}`);
  }

  return step;
}
