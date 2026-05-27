import { kmiRules } from './kmiRules';

export type AssessmentStepId = 1 | 2 | 3 | 4 | 5 | 6;

export type AssessmentFieldKey =
  | 'birthDate'
  | 'heightCm'
  | 'weightKg'
  | 'periodPresence'
  | 'cycleChange'
  | 'volumeChange'
  | 'lastPeriodDate'
  | 'lastPeriodQuickOption'
  | 'ovarianFailure'
  | 'surgeryHistory'
  | 'hormonalContraception'
  | 'hormoneReplacementTherapy'
  | 'kmiHotFlashes'
  | 'kmiParesthesia'
  | 'kmiInsomnia'
  | 'kmiNervousness'
  | 'kmiMelancholia'
  | 'kmiVertigo'
  | 'kmiFatigue'
  | 'kmiJointPain'
  | 'kmiHeadache'
  | 'kmiPalpitations'
  | 'kmiFormication'
  | 'kmiSexualImpact'
  | 'kmiUrinarySymptoms';

export type AssessmentOption = {
  value: string;
  label: string;
  description?: string;
};

export type AssessmentStepDefinition = {
  id: AssessmentStepId;
  title: string;
  subtitle: string;
  requiredFields: AssessmentFieldKey[];
  options?: Partial<Record<AssessmentFieldKey, AssessmentOption[]>>;
};

const kmiOptionMap = Object.fromEntries(kmiRules.map((rule) => [rule.field, rule.options])) as Partial<
  Record<AssessmentFieldKey, AssessmentOption[]>
>;

export const assessmentSteps: AssessmentStepDefinition[] = [
  {
    id: 1,
    title: '开始评估',
    subtitle: '花几分钟，快速了解当前围绝经期状态。',
    requiredFields: [],
  },
  {
    id: 2,
    title: '先了解一下你的基本信息',
    subtitle: '这些信息会帮助我们更准确地理解你的身体状态。',
    requiredFields: ['birthDate', 'heightCm', 'weightKg'],
  },
  {
    id: 3,
    title: '最近的月经周期有什么变化？',
    subtitle: '请选择最符合你最近状态的选项。',
    requiredFields: ['periodPresence', 'cycleChange', 'volumeChange', 'lastPeriodQuickOption'],
    options: {
      periodPresence: [
        { value: 'yes', label: '是的，仍有规律或不规律月经' },
        { value: 'no', label: '已经停止了一段时间' },
      ],
      cycleChange: [
        { value: 'same', label: '基本无变化，周期稳定' },
        { value: 'shorter', label: '周期缩短（比平时少7天以上）' },
        { value: 'longer', label: '周期延长（两个月才来一次，或间隔超过40天）' },
        { value: 'unsure', label: '说不清，不确定' },
      ],
      volumeChange: [
        { value: 'heavier', label: '明显增多' },
        { value: 'lighter', label: '明显减少' },
        { value: 'same', label: '无明显变化' },
        { value: 'unsure', label: '说不清' },
      ],
      lastPeriodQuickOption: [
        { value: 'forgot', label: '记不清了' },
        { value: 'current-period', label: '目前正处于经期' },
        { value: 'not-applicable', label: '不适用' },
      ],
    },
  },
  {
    id: 4,
    title: '以下情况可能会影响结果判断',
    subtitle: '这些信息会帮助结果解释更贴近实际。',
    requiredFields: [
      'ovarianFailure',
      'surgeryHistory',
      'hormonalContraception',
      'hormoneReplacementTherapy',
    ],
    options: {
      ovarianFailure: [
        { value: 'yes', label: '是，有相关医疗诊断' },
        { value: 'no', label: '否' },
      ],
      surgeryHistory: [
        { value: 'ovary', label: '双侧卵巢切除' },
        { value: 'uterus', label: '全子宫切除' },
        { value: 'none', label: '两者均无' },
      ],
      hormonalContraception: [
        { value: 'yes', label: '是，正在使用中' },
        { value: 'no', label: '否' },
      ],
      hormoneReplacementTherapy: [
        { value: 'yes', label: '是，正在进行治疗' },
        { value: 'no', label: '否' },
      ],
    },
  },
  {
    id: 5,
    title: 'KMI 题组 1',
    subtitle: '请选择最符合你最近状态的程度。',
    requiredFields: [
      'kmiHotFlashes',
      'kmiParesthesia',
      'kmiInsomnia',
      'kmiNervousness',
      'kmiMelancholia',
      'kmiVertigo',
    ],
    options: {
      kmiHotFlashes: kmiOptionMap.kmiHotFlashes,
      kmiParesthesia: kmiOptionMap.kmiParesthesia,
      kmiInsomnia: kmiOptionMap.kmiInsomnia,
      kmiNervousness: kmiOptionMap.kmiNervousness,
      kmiMelancholia: kmiOptionMap.kmiMelancholia,
      kmiVertigo: kmiOptionMap.kmiVertigo,
    },
  },
  {
    id: 6,
    title: 'KMI 题组 2',
    subtitle: '完成最后一组后，我们会展示本次评估完成结果。',
    requiredFields: [
      'kmiFatigue',
      'kmiJointPain',
      'kmiHeadache',
      'kmiPalpitations',
      'kmiFormication',
      'kmiSexualImpact',
      'kmiUrinarySymptoms',
    ],
    options: {
      kmiFatigue: kmiOptionMap.kmiFatigue,
      kmiJointPain: kmiOptionMap.kmiJointPain,
      kmiHeadache: kmiOptionMap.kmiHeadache,
      kmiPalpitations: kmiOptionMap.kmiPalpitations,
      kmiFormication: kmiOptionMap.kmiFormication,
      kmiSexualImpact: kmiOptionMap.kmiSexualImpact,
      kmiUrinarySymptoms: kmiOptionMap.kmiUrinarySymptoms,
    },
  },
];

export function getAssessmentStep(id: AssessmentStepId): AssessmentStepDefinition {
  const step = assessmentSteps.find((item) => item.id === id);

  if (!step) {
    throw new Error(`Unknown assessment step: ${id}`);
  }

  return step;
}
