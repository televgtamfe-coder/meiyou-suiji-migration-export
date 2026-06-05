export type ExerciseAssessmentStepId = 1 | 2 | 3;

export type ExerciseAssessmentFieldKey =
  | 'exerciseHeartDiseaseOrHypertension'
  | 'exerciseChestPain'
  | 'exerciseDizzinessOrSyncope'
  | 'exerciseOtherChronicDisease'
  | 'exercisePrescriptionMedication'
  | 'exerciseBoneJointSoftTissueIssue'
  | 'exerciseMedicalSupervisionOnly';

export type ExerciseAssessmentOption = {
  value: string;
  label: string;
  description?: string;
};

export type ExerciseAssessmentFieldCopy = {
  label: string;
  description?: string;
};

export type ExerciseAssessmentResultLevel = 'ready' | 'caution' | 'consult' | 'restricted';

export type ExerciseAssessmentResultTone = 'green' | 'pink' | 'orange';

export const exerciseAssessmentTitle = '你的运动准备度评估已完成';

export const exerciseAssessmentExplanation =
  '这次结果更侧重评估你是否适合安全开始运动，而不是判断你的体能高低。对围绝经期女性来说，选择安全、可持续、适合当下身体状态的运动方式，比盲目追求强度更重要。';

export const exerciseAssessmentDisclaimer =
  '本评估用于运动前健康筛查，不替代医生诊断。若你近期出现明显不适，或已有正在治疗中的疾病，请先咨询专业医生。';

export const exerciseAssessmentYesNoOptions: ExerciseAssessmentOption[] = [
  { value: 'yes', label: '是' },
  { value: 'no', label: '否' },
];

export const exerciseAssessmentStepOneFields = [
  'exerciseHeartDiseaseOrHypertension',
  'exerciseChestPain',
  'exerciseDizzinessOrSyncope',
] as const satisfies readonly ExerciseAssessmentFieldKey[];

export const exerciseAssessmentStepTwoFields = [
  'exerciseOtherChronicDisease',
  'exercisePrescriptionMedication',
] as const satisfies readonly ExerciseAssessmentFieldKey[];

export const exerciseAssessmentStepThreeFields = [
  'exerciseBoneJointSoftTissueIssue',
  'exerciseMedicalSupervisionOnly',
] as const satisfies readonly ExerciseAssessmentFieldKey[];

export const exerciseAssessmentFields = [
  ...exerciseAssessmentStepOneFields,
  ...exerciseAssessmentStepTwoFields,
  ...exerciseAssessmentStepThreeFields,
] as const satisfies readonly ExerciseAssessmentFieldKey[];

export const exerciseAssessmentCriticalAlertFields = [
  'exerciseChestPain',
  'exerciseDizzinessOrSyncope',
  'exerciseMedicalSupervisionOnly',
] as const satisfies readonly ExerciseAssessmentFieldKey[];

export const exerciseAssessmentStepCopy: Record<
  ExerciseAssessmentStepId,
  { title: string; subtitle: string }
> = {
  1: {
    title: '心血管与即时风险',
    subtitle: '先确认是否存在运动前需要优先排除的高风险信号。',
  },
  2: {
    title: '慢病与用药',
    subtitle: '慢病和处方药不等于不能运动，但会影响起步强度与安全边界。',
  },
  3: {
    title: '骨关节与运动限制',
    subtitle: '最后补充骨关节限制和医生是否要求医学监督下运动。',
  },
};

export const exerciseAssessmentFieldCopyMap: Record<
  ExerciseAssessmentFieldKey,
  ExerciseAssessmentFieldCopy
> = {
  exerciseHeartDiseaseOrHypertension: {
    label: '医生是否曾告诉过您患有心脏病或高血压？',
  },
  exerciseChestPain: {
    label: '您在休息时、日常活动时或进行体力活动时是否感到胸痛？',
  },
  exerciseDizzinessOrSyncope: {
    label:
      '在过去12个月内，您是否因为头晕而失去平衡或失去过意识？（请回答“否”：如果您的头晕与过度换气有关，包括剧烈运动时）',
  },
  exerciseOtherChronicDisease: {
    label: '您是否曾被诊断患有其他慢性疾病（心脏病或高血压除外）？',
  },
  exercisePrescriptionMedication: {
    label: '您是否正在服用处方药物治疗慢性疾病？',
  },
  exerciseBoneJointSoftTissueIssue: {
    label:
      '您现在是否（或在过去12个月内）存在骨骼、关节或软组织（肌肉、韧带、肌腱）问题，且可能因增加体力活动而加重？（如果过去有问题但现在不影响活动能力，请回答“否”）',
  },
  exerciseMedicalSupervisionOnly: {
    label: '医生是否曾告诉过您只能进行医学监督下的体力活动？',
  },
};

export const exerciseAssessmentStepNotes: Record<
  ExerciseAssessmentStepId,
  { title: string; body: string }
> = {
  1: {
    title: '这一步优先识别不能硬扛的风险信号',
    body: '如果近期运动中或运动前已经出现胸痛、明显头晕、失衡或曾短暂失去意识，结果页会优先做强化提醒。',
  },
  2: {
    title: '慢病与用药更适合先做健康确认',
    body: '这类情况通常不是完全禁止运动，而是更适合先明确安全边界，再决定强度和运动种类。',
  },
  3: {
    title: '骨关节问题会直接影响动作选择',
    body: '如果只是局部骨关节或软组织问题，通常更适合从低冲击、可控幅度的运动开始，不建议直接冲强度。',
  },
};

export const exerciseAssessmentResultCopy: Record<
  ExerciseAssessmentResultLevel,
  {
    resultSummary: string;
    summaryText: string;
    detailPrefix: string;
    nextStepLabel: string;
    nextStepAdvice: string;
    tone: ExerciseAssessmentResultTone;
  }
> = {
  ready: {
    resultSummary: '可直接开始运动',
    summaryText: '根据本次评估，你目前属于【可直接开始运动】。',
    detailPrefix: '本次 7 项均为“否”，目前未见明显运动禁忌信号。',
    nextStepLabel: '继续保持规律运动',
    nextStepAdvice: '你可以从快走、骑行、瑜伽等中低强度项目起步，逐步建立规律的每周运动节奏。',
    tone: 'green',
  },
  caution: {
    resultSummary: '可以运动但需注意',
    summaryText: '根据本次评估，你目前属于【可以运动但需注意】。',
    detailPrefix: '本次结果主要集中在骨骼、关节或软组织限制上。',
    nextStepLabel: '从低强度开始',
    nextStepAdvice: '优先选择低冲击、动作幅度可控的运动，并在活动中持续观察疼痛或不适是否加重。',
    tone: 'pink',
  },
  consult: {
    resultSummary: '建议先专业评估',
    summaryText: '根据本次评估，你目前属于【建议先专业评估】。',
    detailPrefix: '本次结果提示目前存在需要先做健康确认的慢病、血压、心脏或用药因素。',
    nextStepLabel: '先做健康确认',
    nextStepAdvice: '建议先结合现有疾病、用药和医生意见确认运动安全边界，再决定运动强度与类型会更稳妥。',
    tone: 'pink',
  },
  restricted: {
    resultSummary: '暂不建议自行开始高强度运动',
    summaryText: '根据本次评估，你目前属于【暂不建议自行开始高强度运动】。',
    detailPrefix: '本次结果命中了需要优先重视的风险信号，或同时出现了多项阳性提示。',
    nextStepLabel: '在专业指导下开始',
    nextStepAdvice: '请先不要自行开展高强度运动，待医生或专业人员确认后，再决定是否以及如何开始运动。',
    tone: 'orange',
  },
};
