export type IciqAssessmentStepId = 1 | 2;

export type IciqAssessmentFieldKey =
  | 'iciqLeakFrequency'
  | 'iciqLeakAmount'
  | 'iciqImpact'
  | 'iciqLeakTriggers';

export type IciqLeakTrigger =
  | 'none'
  | 'toilet'
  | 'cough'
  | 'exercise'
  | 'sleep'
  | 'dress'
  | 'no-reason'
  | 'always';

export type IciqAssessmentOption = {
  value: string;
  label: string;
};

export type IciqAssessmentResultLevel =
  | 'none'
  | 'mild'
  | 'moderate'
  | 'severe'
  | 'very-severe';

export type IciqAssessmentLeakageType = 'none' | 'stress' | 'urge' | 'mixed' | 'other';
export type IciqAssessmentResultTone = 'green' | 'pink' | 'orange';

export const iciqAssessmentTitle = 'ICIQ 尿失禁评估';
export const iciqAssessmentQuestionnaireTitle = 'ICIQ-UI-SF 尿失禁评估';
export const iciqAssessmentResultTitle = '你的 ICIQ 尿失禁评估已完成';
export const iciqAssessmentIntro =
  '请根据过去 4 周内的实际感受，补充漏尿频率、漏尿量、生活影响和触发场景。';
export const iciqAssessmentDisclaimer =
  '本问卷用于了解过去 4 周的漏尿症状及其对生活的影响，不能替代医生诊断。若症状持续、影响生活，建议到妇科 / 泌尿妇科 / 盆底门诊进一步评估。';

export const iciqFrequencyOptions: IciqAssessmentOption[] = [
  { value: '0', label: '从不' },
  { value: '1', label: '每周约 1 次或更少' },
  { value: '2', label: '每周 2-3 次' },
  { value: '3', label: '每天 1 次' },
  { value: '4', label: '每天数次' },
  { value: '5', label: '一直有漏尿' },
];

export const iciqAmountOptions: IciqAssessmentOption[] = [
  { value: '0', label: '没有漏尿' },
  { value: '2', label: '少量' },
  { value: '4', label: '中量' },
  { value: '6', label: '大量' },
];

export const iciqImpactOptions: IciqAssessmentOption[] = Array.from({ length: 11 }, (_, index) => ({
  value: String(index),
  label: String(index),
}));

export const iciqLeakTriggerOptions: { value: IciqLeakTrigger; label: string }[] = [
  { value: 'none', label: '从不漏尿' },
  { value: 'toilet', label: '在去厕所的路上漏尿' },
  { value: 'cough', label: '咳嗽或打喷嚏时' },
  { value: 'exercise', label: '大笑或跑跳、运动时' },
  { value: 'sleep', label: '睡着时' },
  { value: 'dress', label: '穿好衣服或脱衣服时' },
  { value: 'no-reason', label: '无缘无故、没有明显原因时' },
  { value: 'always', label: '一直有漏尿' },
];

export const iciqAssessmentStepCopy: Record<IciqAssessmentStepId, { title: string; subtitle: string }> = {
  1: {
    title: '漏尿程度',
    subtitle: '先确认过去 4 周内的漏尿频率和通常漏尿量。',
  },
  2: {
    title: '生活影响与场景',
    subtitle: '再补充漏尿对日常生活的影响，以及更常见的触发场景。',
  },
};

export const iciqAssessmentResultCopy: Record<
  IciqAssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: IciqAssessmentResultTone;
  }
> = {
  none: {
    levelLabel: '症状负担低',
    summary:
      '根据本次问卷，你在过去 4 周内未报告明显漏尿问题。目前尿失禁症状负担较低。',
    advice:
      '建议继续关注盆底健康、体重管理、便秘和咳嗽控制，并在症状变化时再次测评。',
    tone: 'green',
  },
  mild: {
    levelLabel: '轻度漏尿症状',
    summary:
      '根据本次问卷，你目前存在轻度漏尿症状，对日常生活的影响相对有限，适合尽早开始生活方式和盆底肌训练干预。',
    advice:
      '这个阶段通常更适合先坚持盆底肌训练、体重管理和膀胱刺激物回避，再观察几周变化。',
    tone: 'pink',
  },
  moderate: {
    levelLabel: '中度漏尿困扰',
    summary:
      '根据本次问卷，你的漏尿症状已经对日常生活产生一定影响，建议尽早开始规范干预，并结合症状特点判断是否需要就医评估。',
    advice:
      '若症状持续数周以上，或已经影响社交、运动、睡眠或情绪，建议预约专业门诊。',
    tone: 'pink',
  },
  severe: {
    levelLabel: '漏尿症状较重',
    summary:
      '根据本次问卷，你的漏尿症状较明显，且对生活质量影响较大，建议不要只靠观察，尽快寻求专业评估。',
    advice:
      '建议明确是否与压力性、急迫性或混合性尿失禁有关，并尽快制定针对性的管理方案。',
    tone: 'orange',
  },
  'very-severe': {
    levelLabel: '症状负担很高',
    summary:
      '根据本次问卷，你目前的漏尿症状已经达到很高负担水平，通常会明显影响日常活动和生活质量。',
    advice:
      '建议尽快到专业门诊评估，明确病因并讨论治疗方案。',
    tone: 'orange',
  },
};
