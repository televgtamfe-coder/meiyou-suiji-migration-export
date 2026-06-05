export type Gad7AssessmentStepId = 1 | 2 | 3;

export type Gad7AssessmentFieldKey =
  | 'gad7Nervous'
  | 'gad7UncontrollableWorry'
  | 'gad7ExcessiveWorry'
  | 'gad7TroubleRelaxing'
  | 'gad7Restlessness'
  | 'gad7Irritability'
  | 'gad7FearSomethingAwful';

export type Gad7AssessmentOption = {
  value: string;
  label: string;
};

export type Gad7AssessmentFieldCopy = {
  label: string;
};

export type Gad7AssessmentResultLevel = 'minimal' | 'mild' | 'moderate' | 'severe';

export type Gad7AssessmentResultTone = 'green' | 'pink' | 'orange';

export const gad7AssessmentTitle = 'GAD-7 焦虑评估';
export const gad7AssessmentIntro =
  '请回顾过去两周，选择每种情况出现的频率。';
export const gad7AssessmentQuestionnaireTitle = 'GAD-7 焦虑评估';
export const gad7AssessmentResultTitle = '你的 GAD-7 焦虑评估已完成';
export const gad7AssessmentDisclaimer =
  '本量表用于情绪状态筛查，不能替代临床诊断。若您近期已明显影响睡眠、进食、学习、工作或社交，建议尽快寻求专业帮助。';

export const gad7AssessmentOptions: Gad7AssessmentOption[] = [
  { value: '0', label: '完全不会' },
  { value: '1', label: '好几天' },
  { value: '2', label: '一半以上的日子' },
  { value: '3', label: '几乎每天' },
];

export const gad7AssessmentStepCopy: Record<
  Gad7AssessmentStepId,
  { title: string; subtitle: string }
> = {
  1: {
    title: '紧张与担忧',
    subtitle: '先看最近两周里，紧张感与反复担心是否已经开始影响日常状态。',
  },
  2: {
    title: '放松与烦躁',
    subtitle: '继续确认身体是否难以放松，或已经出现静不下来、坐立不宁的感觉。',
  },
  3: {
    title: '易怒与预期性焦虑',
    subtitle: '最后补充近期是否更易烦躁，以及是否常常预想糟糕结果。',
  },
};

export const gad7AssessmentFieldCopyMap: Record<
  Gad7AssessmentFieldKey,
  Gad7AssessmentFieldCopy
> = {
  gad7Nervous: {
    label: '感觉紧张、焦虑或急切',
  },
  gad7UncontrollableWorry: {
    label: '不能停止或控制担忧',
  },
  gad7ExcessiveWorry: {
    label: '对各种事情担忧过多',
  },
  gad7TroubleRelaxing: {
    label: '很难放松下来',
  },
  gad7Restlessness: {
    label: '烦躁不安，坐立不宁',
  },
  gad7Irritability: {
    label: '变得容易烦恼或易怒',
  },
  gad7FearSomethingAwful: {
    label: '感到好像有可怕的事要发生',
  },
};

export const gad7AssessmentStepOneFields = [
  'gad7Nervous',
  'gad7UncontrollableWorry',
  'gad7ExcessiveWorry',
] as const satisfies readonly Gad7AssessmentFieldKey[];

export const gad7AssessmentStepTwoFields = [
  'gad7TroubleRelaxing',
  'gad7Restlessness',
] as const satisfies readonly Gad7AssessmentFieldKey[];

export const gad7AssessmentStepThreeFields = [
  'gad7Irritability',
  'gad7FearSomethingAwful',
] as const satisfies readonly Gad7AssessmentFieldKey[];

export const gad7AssessmentFields = [
  ...gad7AssessmentStepOneFields,
  ...gad7AssessmentStepTwoFields,
  ...gad7AssessmentStepThreeFields,
] as const satisfies readonly Gad7AssessmentFieldKey[];

export const gad7AssessmentResultCopy: Record<
  Gad7AssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: Gad7AssessmentResultTone;
  }
> = {
  minimal: {
    levelLabel: '无/极轻微焦虑',
    summary:
      '您本次 GAD-7 评分为 {{score}} 分，提示目前无或仅有极轻度焦虑症状。您当前整体焦虑水平较低。若偶尔出现担心、紧张或放松困难，通常可通过调整作息、减少持续性压力刺激、增加运动与放松练习来改善。',
    advice: '日常心理维护即可。',
    tone: 'green',
  },
  mild: {
    levelLabel: '轻度焦虑',
    summary:
      '您本次 GAD-7 评分为 {{score}} 分，提示目前存在轻度焦虑症状。您近期可能较容易紧张、担心较多，或在放松、睡眠方面感到一些困难。建议优先梳理最近的压力源，减少反复内耗，增加休息和节律化活动。',
    advice: '建议优先梳理压力源，增加休息和节律化活动。',
    tone: 'pink',
  },
  moderate: {
    levelLabel: '中度焦虑',
    summary:
      '您本次 GAD-7 评分为 {{score}} 分，提示目前存在中度焦虑症状。焦虑状态可能已经对您的效率、休息或情绪稳定性造成影响。建议尽快关注近期是否存在持续担忧、身体紧绷、坐立不安或睡眠受损，并考虑寻求心理咨询或专业医疗帮助。',
    advice: '建议尽快关注持续担忧与身心紧绷，并考虑寻求心理咨询或专业评估。',
    tone: 'orange',
  },
  severe: {
    levelLabel: '重度焦虑',
    summary:
      '您本次 GAD-7 评分为 {{score}} 分，提示目前存在重度焦虑症状。这通常意味着您近期的紧张、担忧和身心不适已经较为明显。建议尽快寻求专业支持，避免长期高压状态继续累积，影响睡眠、工作、人际和躯体健康。',
    advice: '建议尽快寻求专业支持，并尽快安排精神科或心理科评估。',
    tone: 'orange',
  },
};

export const gad7AssessmentPersonalizedFeedbackCopy: Record<
  Gad7AssessmentFieldKey,
  string
> = {
  gad7Nervous:
    '您近期整体处于较紧绷的状态。建议每天留出固定的减压时间，比如散步、伸展、呼吸放松或短时冥想，让身体先慢下来。',
  gad7UncontrollableWorry:
    '您的担心感可能已经不太容易靠意志压住。建议不要只反复“劝自己别想”，而是尝试把担心写下来，区分哪些能处理、哪些暂时无法处理，减少无休止内耗。',
  gad7ExcessiveWorry:
    '您近期可能存在泛化担忧，也就是很多事情都容易引发不安。建议先聚焦最核心的两三件事，避免让大脑长时间处于“全线警戒”的状态。',
  gad7TroubleRelaxing:
    '您的身体和思维可能一直处在“开机”状态。建议增加可执行的放松动作，比如热水澡、拉伸、腹式呼吸、睡前听舒缓音频，而不是仅仅要求自己“别紧张”。',
  gad7Restlessness:
    '您近期可能出现明显的烦躁和静不下来。建议减少连续高压任务时长，增加短休息和身体活动。如果这种状态频繁影响工作学习，建议进一步评估。',
  gad7Irritability:
    '您近期的易怒和敏感可能与长期焦虑积累有关。建议优先关注睡眠、压力暴露和恢复时间，而不是只把它理解成“脾气变差”。',
  gad7FearSomethingAwful:
    '您近期可能存在较强的预期性焦虑。建议留意自己是否常常在还没发生的事情上反复演练最坏结果。若这种担忧已经明显影响生活，建议寻求专业帮助。',
};
