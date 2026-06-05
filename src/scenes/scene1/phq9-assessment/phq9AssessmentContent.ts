export type Phq9AssessmentStepId = 1 | 2 | 3;

export type Phq9AssessmentFieldKey =
  | 'phq9LittleInterest'
  | 'phq9LowMood'
  | 'phq9SleepProblem'
  | 'phq9Fatigue'
  | 'phq9AppetiteChange'
  | 'phq9Worthlessness'
  | 'phq9Concentration'
  | 'phq9PsychomotorChange'
  | 'phq9SelfHarmThought';

export type Phq9AssessmentOption = {
  value: string;
  label: string;
};

export type Phq9AssessmentFieldCopy = {
  label: string;
};

export type Phq9AssessmentResultLevel =
  | 'minimal'
  | 'mild'
  | 'moderate'
  | 'moderately-severe'
  | 'severe';

export type Phq9AssessmentResultTone = 'green' | 'pink' | 'orange';

export const phq9AssessmentTitle = 'PHQ-9 抑郁评估';
export const phq9AssessmentIntro =
  '请回顾过去两周，选择每种情况出现的频率。';
export const phq9AssessmentQuestionnaireTitle = 'PHQ-9 抑郁评估';
export const phq9AssessmentResultTitle = '你的 PHQ-9 抑郁评估已完成';
export const phq9AssessmentDisclaimer =
  '本量表用于情绪状态筛查，不能替代临床诊断。若您近期已明显影响睡眠、进食、学习、工作或社交，建议尽快寻求专业帮助。';

export const phq9AssessmentOptions: Phq9AssessmentOption[] = [
  { value: '0', label: '完全不会' },
  { value: '1', label: '好几天' },
  { value: '2', label: '一半以上的日子' },
  { value: '3', label: '几乎每天' },
];

export const phq9AssessmentStepCopy: Record<
  Phq9AssessmentStepId,
  { title: string; subtitle: string }
> = {
  1: {
    title: '情绪与兴趣',
    subtitle: '先看过去两周里，情绪、兴趣和睡眠是否已经开始出现变化。',
  },
  2: {
    title: '精力与自我评价',
    subtitle: '继续确认精力、食欲和自我感受是否正在影响你的日常状态。',
  },
  3: {
    title: '专注与风险信号',
    subtitle: '最后补充专注、身心节律和高风险想法相关的变化。',
  },
};

export const phq9AssessmentFieldCopyMap: Record<
  Phq9AssessmentFieldKey,
  Phq9AssessmentFieldCopy
> = {
  phq9LittleInterest: {
    label: '做事时提不起劲或没有兴趣',
  },
  phq9LowMood: {
    label: '感到心情低落、沮丧或绝望',
  },
  phq9SleepProblem: {
    label: '入睡困难、睡不安稳或睡眠过多',
  },
  phq9Fatigue: {
    label: '感觉疲倦或没有活力',
  },
  phq9AppetiteChange: {
    label: '食欲不振或吃太多',
  },
  phq9Worthlessness: {
    label: '觉得自己很糟——或觉得自己很失败，或让自己或家人失望',
  },
  phq9Concentration: {
    label: '对事物专注有困难，例如阅读报纸或看电视时',
  },
  phq9PsychomotorChange: {
    label:
      '动作或说话速度缓慢到别人已经察觉？或刚好相反——烦躁或坐立不安、动来动去的情况更胜于平常',
  },
  phq9SelfHarmThought: {
    label: '有不如死掉或用某种方式伤害自己的念头',
  },
};

export const phq9AssessmentStepOneFields = [
  'phq9LittleInterest',
  'phq9LowMood',
  'phq9SleepProblem',
] as const satisfies readonly Phq9AssessmentFieldKey[];

export const phq9AssessmentStepTwoFields = [
  'phq9Fatigue',
  'phq9AppetiteChange',
  'phq9Worthlessness',
] as const satisfies readonly Phq9AssessmentFieldKey[];

export const phq9AssessmentStepThreeFields = [
  'phq9Concentration',
  'phq9PsychomotorChange',
  'phq9SelfHarmThought',
] as const satisfies readonly Phq9AssessmentFieldKey[];

export const phq9AssessmentFields = [
  ...phq9AssessmentStepOneFields,
  ...phq9AssessmentStepTwoFields,
  ...phq9AssessmentStepThreeFields,
] as const satisfies readonly Phq9AssessmentFieldKey[];

export const phq9AssessmentResultCopy: Record<
  Phq9AssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: Phq9AssessmentResultTone;
  }
> = {
  minimal: {
    levelLabel: '无/极少抑郁',
    summary:
      '您本次 PHQ-9 评分为 {{score}} 分，提示目前无或仅有极轻度抑郁症状。整体来看，您当前情绪状态较稳定。若近期偶有情绪波动、睡眠欠佳或疲劳感，通常可先通过规律作息、适度运动和减少持续压力进行调整。若相关状态持续两周以上或逐渐加重，建议再次评估。',
    advice: '日常心理维护即可。',
    tone: 'green',
  },
  mild: {
    levelLabel: '轻度抑郁',
    summary:
      '您本次 PHQ-9 评分为 {{score}} 分，提示目前存在轻度抑郁症状。这通常意味着您近期可能出现了情绪低落、兴趣下降、疲劳或睡眠变化等情况。当前阶段建议优先关注生活节律、睡眠质量和压力来源，并持续观察近 2 周的变化。如症状持续存在或影响学习、工作、人际关系，建议进一步寻求专业支持。',
    advice: '优先关注生活节律、睡眠质量和压力来源。',
    tone: 'pink',
  },
  moderate: {
    levelLabel: '中度抑郁',
    summary:
      '您本次 PHQ-9 评分为 {{score}} 分，提示目前存在中度抑郁症状。这意味着您的情绪和身心状态可能已经对日常生活造成一定影响。建议尽快关注近期的睡眠、精力、兴趣和自我评价变化，并考虑预约心理咨询师或精神科/身心科医生进行进一步评估。',
    advice: '建议尽快关注近期变化，并考虑预约心理咨询或专科评估。',
    tone: 'pink',
  },
  'moderately-severe': {
    levelLabel: '中重度抑郁',
    summary:
      '您本次 PHQ-9 评分为 {{score}} 分，提示目前存在中重度抑郁症状。您的状态可能已经明显影响到工作、学习、生活或社交功能。建议尽快联系专业心理服务或精神专科进行系统评估，不建议仅靠“自己扛过去”。及时干预通常会更有效。',
    advice: '强烈建议专业精神科/心理科就诊。',
    tone: 'orange',
  },
  severe: {
    levelLabel: '重度抑郁',
    summary:
      '您本次 PHQ-9 评分为 {{score}} 分，提示目前存在重度抑郁症状。这意味着您当前可能承受着较明显的情绪痛苦和功能受损。建议尽快寻求心理/精神专科帮助，必要时由专业人员评估是否需要更系统的治疗与支持。若您同时存在自伤、轻生或明显绝望想法，请立即联系身边可信任的人，并尽快就医。',
    advice: '建议尽快寻求心理/精神专科帮助。',
    tone: 'orange',
  },
};

export const phq9AssessmentPersonalizedFeedbackCopy: Record<
  Phq9AssessmentFieldKey,
  string
> = {
  phq9LittleInterest:
    '您近期在“兴趣和动力”方面的变化较明显。建议先从小目标开始恢复日常活动，比如短时间散步、简单家务、与熟悉的人短暂交流，而不是要求自己一下子恢复到以前的状态。',
  phq9LowMood:
    '您近期情绪低落感较明显。建议留意这种情绪是否已持续两周以上，以及是否伴随明显无望感。若持续存在，建议尽快寻求专业评估，不要长期独自承受。',
  phq9SleepProblem:
    '您的睡眠可能已受到情绪影响。建议优先稳定入睡和起床时间，减少深夜长时间刷屏、咖啡因摄入和临睡前过度思考。若长期失眠或早醒，建议结合专业支持处理。',
  phq9Fatigue:
    '您近期的疲劳感较明显。若休息后仍难以恢复，且伴随兴趣下降、效率下降或情绪低落，建议把它视为需要重视的信号，而不是简单归因为“最近太忙”。',
  phq9AppetiteChange:
    '您的食欲或进食状态近期可能发生了变化。建议留意是否出现吃得明显变少或明显增多，并关注体重变化。若持续存在，可结合情绪和作息一起评估。',
  phq9Worthlessness:
    '您近期可能存在较强的自责或自我否定。建议把注意力放回“我正在经历困难”，而不是“我不够好”。若这种想法频繁出现并影响日常状态，建议尽快寻求专业支持。',
  phq9Concentration:
    '您近期的专注力可能受到影响。建议降低短期任务负荷，采用单任务处理、番茄钟、减少信息切换等方式。如果学习或工作功能已经明显下降，建议进一步评估。',
  phq9PsychomotorChange:
    '您近期可能出现了明显的身心迟滞或烦躁不安。若周围人也能觉察到这些变化，说明它可能已超出一般压力反应，建议尽快寻求专业评估。',
  phq9SelfHarmThought:
    '您的回答提示近期可能出现过伤害自己或“不如消失”的念头。这个信号需要被认真对待。建议您尽快联系家人、朋友、心理咨询师或医院精神科/急诊进行支持与评估；若此刻风险强烈或难以控制，请立即寻求现场帮助，不要独自待着。',
};

export const phq9AssessmentHighRiskAlert =
  '您的回答提示近期可能出现过伤害自己或“不如消失”的念头。这个信号需要被认真对待。建议您尽快联系家人、朋友、心理咨询师或医院精神科/急诊进行支持与评估；若此刻风险强烈或难以控制，请立即寻求现场帮助，不要独自待着。';
