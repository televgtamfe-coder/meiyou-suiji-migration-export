import { BoneAssessmentFieldKey, boneAssessmentFieldCopyMap, boneAssessmentProfileFields } from './boneAssessmentContent';
import { readScene1HealthProfile, Scene1HealthProfile } from './boneAssessmentStorage';

export type BoneAssessmentCarryoverItem = {
  field: (typeof boneAssessmentProfileFields)[number];
  label: string;
  value: string;
  text: string;
};

export function readBoneAssessmentSharedProfile() {
  return readScene1HealthProfile() ?? {};
}

export function isBoneAssessmentProfileField(
  field: BoneAssessmentFieldKey
): field is (typeof boneAssessmentProfileFields)[number] {
  return (boneAssessmentProfileFields as readonly string[]).includes(field);
}

export function formatBoneAssessmentProfileValue(
  field: (typeof boneAssessmentProfileFields)[number],
  value: string
) {
  if (field === 'age') {
    return `${value}岁`;
  }

  return `${value}${field === 'heightCm' ? 'cm' : 'kg'}`;
}

export function getBoneAssessmentAutofilledFields(profile: Scene1HealthProfile) {
  return boneAssessmentProfileFields.filter((field) => {
    const value = profile[field];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export function getBoneAssessmentCarryoverItems(profile: Scene1HealthProfile): BoneAssessmentCarryoverItem[] {
  return boneAssessmentProfileFields
    .filter((field) => {
      const value = profile[field];
      return typeof value === 'string' && value.trim().length > 0;
    })
    .map((field) => {
      const value = profile[field]?.trim() ?? '';
      return {
        field,
        label: boneAssessmentFieldCopyMap[field].label,
        value,
        text: `已带入 ${boneAssessmentFieldCopyMap[field].label} ${formatBoneAssessmentProfileValue(field, value)}`,
      };
    });
}
