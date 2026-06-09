export type PsqiAssessmentStepId = 1 | 2 | 3;

export type PsqiAssessmentFieldKey =
  | 'psqiBedTime'
  | 'psqiSleepLatencyMinutes'
  | 'psqiWakeTime'
  | 'psqiSleepDurationHours'
  | 'psqiSleepDisturbanceFallingAsleep'
  | 'psqiSleepDisturbanceWakeUp'
  | 'psqiSleepDisturbanceBathroom'
  | 'psqiSleepDisturbanceBreathing'
  | 'psqiSleepDisturbanceSnoring'
  | 'psqiSleepDisturbanceCold'
  | 'psqiSleepDisturbanceHot'
  | 'psqiSleepDisturbanceDreams'
  | 'psqiSleepDisturbancePain'
  | 'psqiSleepDisturbanceOther'
  | 'psqiSleepDisturbanceOtherText'
  | 'psqiSubjectiveQuality'
  | 'psqiSleepMedication'
  | 'psqiDaytimeSleepiness'
  | 'psqiDaytimeEnthusiasm';

export type PsqiAssessmentOption = {
  value: string;
  label: string;
};

export type PsqiAssessmentFieldCopy = {
  label: string;
  description?: string;
};

export type PsqiAssessmentResultLevel =
  | 'good'
  | 'early-warning'
  | 'moderate-burden'
  | 'high-burden';

export type PsqiAssessmentResultTone = 'green' | 'pink' | 'orange';

export const psqiAssessmentTitle = 'PSQI 睡眠评估';
export const psqiAssessmentQuestionnaireTitle = 'PSQI 匹兹堡睡眠质量指数';
export const psqiAssessmentResultTitle = '你的 PSQI 睡眠评估已完成';
export const psqiAssessmentIntro =
  '请回忆最近 1 个月内的睡眠情况，补充入睡时点、夜间干扰和白天状态。';
export const psqiAssessmentDisclaimer =
  '本结果用于睡眠健康筛查，不替代医生诊断。若睡眠问题持续存在，或已明显影响白天功能、情绪或工作生活，建议进一步咨询专业医生。';

export const psqiFrequencyOptions: PsqiAssessmentOption[] = [
  { value: '0', label: '无' },
  { value: '1', label: '<1次/周' },
  { value: '2', label: '1-2次/周' },
  { value: '3', label: '≥3次/周' },
];

export const psqiSubjectiveQualityOptions: PsqiAssessmentOption[] = [
  { value: '0', label: '很好' },
  { value: '1', label: '较好' },
  { value: '2', label: '较差' },
  { value: '3', label: '很差' },
];

export const psqiDaytimeEnthusiasmOptions: PsqiAssessmentOption[] = [
  { value: '0', label: '没有' },
  { value: '1', label: '偶尔有' },
  { value: '2', label: '有时有' },
  { value: '3', label: '经常有' },
];

export const psqiAssessmentStepCopy: Record<PsqiAssessmentStepId, { title: string; subtitle: string }> = {
  1: {
    title: '睡眠作息',
    subtitle: '先补充最近 1 个月内的上床、入睡、起床和实际睡眠时长。',
  },
  2: {
    title: '夜间干扰',
    subtitle: '再确认入睡困难、夜醒、起夜和疼痛等夜间睡眠中断情况。',
  },
  3: {
    title: '主观感受',
    subtitle: '最后确认主观睡眠质量、助眠药物使用和白天精力受损程度。',
  },
};

export const psqiAssessmentFieldCopyMap: Record<PsqiAssessmentFieldKey, PsqiAssessmentFieldCopy> = {
  psqiBedTime: { label: '通常晚上几点上床睡觉？', description: '请填写最近 1 个月内更常见的时间。' },
  psqiSleepLatencyMinutes: {
    label: '从上床到入睡通常需要多少分钟？',
    description: '按分钟填写，可直接填常见范围，如 15、30、60。',
  },
  psqiWakeTime: { label: '通常早上几点起床？' },
  psqiSleepDurationHours: {
    label: '通常每天实际睡眠多少小时？',
    description: '不包括上床后还未入睡的时间，可填写半小时，例如 6.5。',
  },
  psqiSleepDisturbanceFallingAsleep: { label: '30 分钟内仍不能入睡' },
  psqiSleepDisturbanceWakeUp: { label: '夜间易醒或早醒' },
  psqiSleepDisturbanceBathroom: { label: '夜间需要起夜去厕所' },
  psqiSleepDisturbanceBreathing: { label: '夜间呼吸不畅' },
  psqiSleepDisturbanceSnoring: { label: '咳嗽或鼾声过高' },
  psqiSleepDisturbanceCold: { label: '夜间感觉冷' },
  psqiSleepDisturbanceHot: { label: '夜间感觉热' },
  psqiSleepDisturbanceDreams: { label: '做恶梦' },
  psqiSleepDisturbancePain: { label: '疼痛不适影响睡眠' },
  psqiSleepDisturbanceOther: { label: '其他影响睡眠的事情' },
  psqiSleepDisturbanceOtherText: { label: '如有，请说明' },
  psqiSubjectiveQuality: { label: '你认为自己的睡眠质量如何？' },
  psqiSleepMedication: { label: '你使用药物帮助睡眠的频率如何？' },
  psqiDaytimeSleepiness: { label: '你是否经常感到困倦？' },
  psqiDaytimeEnthusiasm: { label: '你做事情时是否感到精力不足？' },
};

export const psqiAssessmentStepOneFields = [
  'psqiBedTime',
  'psqiSleepLatencyMinutes',
  'psqiWakeTime',
  'psqiSleepDurationHours',
] as const satisfies readonly PsqiAssessmentFieldKey[];

export const psqiAssessmentStepTwoFields = [
  'psqiSleepDisturbanceFallingAsleep',
  'psqiSleepDisturbanceWakeUp',
  'psqiSleepDisturbanceBathroom',
  'psqiSleepDisturbanceBreathing',
  'psqiSleepDisturbanceSnoring',
  'psqiSleepDisturbanceCold',
  'psqiSleepDisturbanceHot',
  'psqiSleepDisturbanceDreams',
  'psqiSleepDisturbancePain',
  'psqiSleepDisturbanceOther',
] as const satisfies readonly PsqiAssessmentFieldKey[];

export const psqiAssessmentStepThreeFields = [
  'psqiSubjectiveQuality',
  'psqiSleepMedication',
  'psqiDaytimeSleepiness',
  'psqiDaytimeEnthusiasm',
] as const satisfies readonly PsqiAssessmentFieldKey[];

export const psqiAssessmentScoredFields = [
  ...psqiAssessmentStepTwoFields,
  ...psqiAssessmentStepThreeFields,
] as const satisfies readonly PsqiAssessmentFieldKey[];

export const psqiAssessmentResultCopy: Record<
  PsqiAssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: PsqiAssessmentResultTone;
  }
> = {
  good: {
    levelLabel: '睡眠质量较好',
    summary:
      '你本次 PSQI 总分为 {{score}} 分，提示近期整体睡眠状态较稳定，暂未见明显睡眠障碍信号。',
    advice:
      '建议继续保持固定起床时间、减少睡前蓝光刺激，并关注夜间醒来和情绪波动是否有新变化。',
    tone: 'green',
  },
  'early-warning': {
    levelLabel: '早期困扰信号',
    summary:
      '你本次 PSQI 总分为 {{score}} 分，提示已经出现早期睡眠波动，可能表现为入睡变慢、夜间睡不实或恢复感下降。',
    advice:
      '现在适合尽早调整作息和睡前状态，优先减少晚间咖啡因、电子设备使用和高唤醒活动。',
    tone: 'pink',
  },
  'moderate-burden': {
    levelLabel: '睡眠问题较明显',
    summary:
      '你本次 PSQI 总分为 {{score}} 分，提示已经存在比较明确的睡眠困扰，常见于入睡困难、夜间易醒和白天疲惫并存。',
    advice:
      '建议尽快开始系统干预，并重点关注情绪压力、慢性病、助眠药物使用和生活方式因素。',
    tone: 'pink',
  },
  'high-burden': {
    levelLabel: '睡眠负担较高',
    summary:
      '你本次 PSQI 总分为 {{score}} 分，提示睡眠问题已经较明显，且可能正在影响白天状态、情绪和整体生活质量。',
    advice:
      '建议尽快寻求专业帮助，评估是否存在失眠、焦虑加重或其他需要处理的身心问题。',
    tone: 'orange',
  },
};
