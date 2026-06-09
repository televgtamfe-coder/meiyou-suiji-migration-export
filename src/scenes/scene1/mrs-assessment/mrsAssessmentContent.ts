export type MrsAssessmentStepId = 1 | 2 | 3;

export type MrsAssessmentFieldKey =
  | 'mrsHotFlashes'
  | 'mrsHeartDiscomfort'
  | 'mrsSleepProblem'
  | 'mrsDepressiveMood'
  | 'mrsIrritability'
  | 'mrsAnxiety'
  | 'mrsExhaustion'
  | 'mrsSexualProblems'
  | 'mrsBladderProblems'
  | 'mrsVaginalDryness'
  | 'mrsJointPain';

export type MrsAssessmentOption = {
  value: string;
  label: string;
};

export type MrsAssessmentFieldCopy = {
  label: string;
};

export type MrsAssessmentResultLevel = 'minimal' | 'mild' | 'moderate' | 'severe';
export type MrsAssessmentResultTone = 'green' | 'pink' | 'orange';

export const mrsAssessmentTitle = 'MRS 更年期评定';
export const mrsAssessmentQuestionnaireTitle = 'MRS 更年期评定';
export const mrsAssessmentResultTitle = '你的 MRS 更年期评定已完成';
export const mrsAssessmentIntro = '请根据近期实际感受，选择每项症状对你的影响程度。';
export const mrsAssessmentDisclaimer =
  '本量表用于更年期症状筛查和生活质量影响评估，不能替代医生诊断。若症状持续加重或明显影响睡眠、情绪、工作与生活，建议及时就医。';

export const mrsAssessmentOptions: MrsAssessmentOption[] = [
  { value: '0', label: '无' },
  { value: '1', label: '轻度' },
  { value: '2', label: '中度' },
  { value: '3', label: '重度' },
];

export const mrsAssessmentStepCopy: Record<MrsAssessmentStepId, { title: string; subtitle: string }> = {
  1: {
    title: '身体与睡眠',
    subtitle: '先判断潮热、心悸、睡眠和关节肌肉不适对生活的影响。',
  },
  2: {
    title: '情绪与精力',
    subtitle: '再确认情绪波动、焦虑和疲乏感是否已经持续存在。',
  },
  3: {
    title: '泌尿生殖',
    subtitle: '最后补充性生活、膀胱和阴道干燥相关的困扰程度。',
  },
};

export const mrsAssessmentFieldCopyMap: Record<MrsAssessmentFieldKey, MrsAssessmentFieldCopy> = {
  mrsHotFlashes: { label: '潮热和出汗' },
  mrsHeartDiscomfort: { label: '心脏不适（心悸、胸闷）' },
  mrsSleepProblem: { label: '睡眠问题（难入睡、易醒）' },
  mrsDepressiveMood: { label: '情绪低落' },
  mrsIrritability: { label: '易怒、烦躁' },
  mrsAnxiety: { label: '紧张、焦虑' },
  mrsExhaustion: { label: '体力和脑力下降、疲乏' },
  mrsSexualProblems: { label: '性问题或性生活不适' },
  mrsBladderProblems: { label: '膀胱问题（尿频、尿急）' },
  mrsVaginalDryness: { label: '阴道干燥' },
  mrsJointPain: { label: '关节和肌肉不适' },
};

export const mrsAssessmentStepOneFields = [
  'mrsHotFlashes',
  'mrsHeartDiscomfort',
  'mrsSleepProblem',
  'mrsJointPain',
] as const satisfies readonly MrsAssessmentFieldKey[];

export const mrsAssessmentStepTwoFields = [
  'mrsDepressiveMood',
  'mrsIrritability',
  'mrsAnxiety',
  'mrsExhaustion',
] as const satisfies readonly MrsAssessmentFieldKey[];

export const mrsAssessmentStepThreeFields = [
  'mrsSexualProblems',
  'mrsBladderProblems',
  'mrsVaginalDryness',
] as const satisfies readonly MrsAssessmentFieldKey[];

export const mrsAssessmentFields = [
  ...mrsAssessmentStepOneFields,
  ...mrsAssessmentStepTwoFields,
  ...mrsAssessmentStepThreeFields,
] as const satisfies readonly MrsAssessmentFieldKey[];

export const mrsAssessmentResultCopy: Record<
  MrsAssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: MrsAssessmentResultTone;
  }
> = {
  minimal: {
    levelLabel: '正常 / 极轻微',
    summary:
      '你本次 MRS 评分为 {{score}} 分，提示当前整体症状负担较低，暂未见明显更年期综合征对生活质量造成持续影响。',
    advice: '继续关注月经、睡眠和血管舒缩症状变化，保持规律作息与适度运动。',
    tone: 'green',
  },
  mild: {
    levelLabel: '轻度更年期综合征',
    summary:
      '你本次 MRS 评分为 {{score}} 分，提示已出现轻度更年期相关不适，建议优先从睡眠、情绪和生活节律入手调整。',
    advice: '建议继续观察近 1-3 个月的变化，并优先处理最影响日常状态的症状。',
    tone: 'pink',
  },
  moderate: {
    levelLabel: '中度更年期综合征',
    summary:
      '你本次 MRS 评分为 {{score}} 分，提示更年期症状已对生活质量造成一定影响，建议更系统地进行生活方式和就医评估。',
    advice: '建议结合妇科、更年期门诊或身心支持进一步评估，明确干预重点。',
    tone: 'pink',
  },
  severe: {
    levelLabel: '重度更年期综合征',
    summary:
      '你本次 MRS 评分为 {{score}} 分，提示当前症状负担较重，已具有明确临床干预意义，建议尽快就医评估。',
    advice: '建议尽快到妇科、内分泌科或更年期门诊评估，必要时同步处理睡眠、情绪和泌尿生殖问题。',
    tone: 'orange',
  },
};
