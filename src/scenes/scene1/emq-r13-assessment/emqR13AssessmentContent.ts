export type EmqR13AssessmentStepId = 1 | 2 | 3;

export type EmqR13AssessmentFieldKey =
  | 'emqR13CheckDone'
  | 'emqR13TimeOrder'
  | 'emqR13ToldByOthers'
  | 'emqR13TipOfTongue'
  | 'emqR13ForgetPlanned'
  | 'emqR13ForgetDetails'
  | 'emqR13ForgetPassingInfo'
  | 'emqR13ForgetJustSaid'
  | 'emqR13LoseStoryline'
  | 'emqR13MixDetails'
  | 'emqR13RepeatSelf'
  | 'emqR13RereadWithoutRealizing'
  | 'emqR13MisplaceItems';

export type EmqR13AssessmentOption = {
  value: string;
  label: string;
};

export type EmqR13AssessmentFieldCopy = {
  label: string;
};

export type EmqR13AssessmentResultLevel = 'clear' | 'watch' | 'track' | 'evaluate';
export type EmqR13AssessmentResultTone = 'green' | 'pink' | 'orange';

export const emqR13AssessmentTitle = 'EMQ-R13 记忆评估';
export const emqR13AssessmentQuestionnaireTitle = 'EMQ-R13 记忆评估';
export const emqR13AssessmentIntro =
  '请回想最近一段时间在日常生活中的记忆和注意情况，选择每种问题出现的频率。';
export const emqR13AssessmentResultTitle = '你的 EMQ-R13 记忆评估已完成';
export const emqR13AssessmentDisclaimer =
  '本量表用于主观记忆与注意困难筛查，不能替代神经系统、精神心理或更年期相关的正式诊断。若近期已明显影响工作、学习、沟通或日常生活，建议进一步评估。';

export const emqR13AssessmentOptions: EmqR13AssessmentOption[] = [
  { value: '0', label: '从不' },
  { value: '1', label: '少于每周一次' },
  { value: '2', label: '大约每周1次' },
  { value: '3', label: '大约每天1次' },
  { value: '4', label: '每天数次' },
];

export const emqR13AssessmentStepCopy: Record<
  EmqR13AssessmentStepId,
  { title: string; subtitle: string }
> = {
  1: {
    title: '记忆提取',
    subtitle: '先看最近这段时间里，回想事情、线索和安排时是否更容易卡住。',
  },
  2: {
    title: '注意追踪',
    subtitle: '继续确认在对话、阅读或持续跟随信息时，是否更容易分神或丢失线索。',
  },
  3: {
    title: '日常遗漏',
    subtitle: '最后补充最近在重复确认、重读内容或放错物品上的实际情况。',
  },
};

export const emqR13AssessmentFieldCopyMap: Record<
  EmqR13AssessmentFieldKey,
  EmqR13AssessmentFieldCopy
> = {
  emqR13CheckDone: { label: '做过的事，需要反复确认自己是否真的完成了' },
  emqR13TimeOrder: { label: '回想事情发生的时间顺序时容易混乱' },
  emqR13ToldByOthers: { label: '别人提过的内容，之后会想不起来' },
  emqR13TipOfTongue: { label: '明明知道却一时想不起词或名字' },
  emqR13ForgetPlanned: { label: '原本打算要做的事，转头就忘了' },
  emqR13ForgetDetails: { label: '刚接触过的细节或信息很快忘掉' },
  emqR13ForgetPassingInfo: { label: '别人顺口提到的信息，很难在之后记住' },
  emqR13ForgetJustSaid: { label: '刚说过或刚听到的话，很快就接不上' },
  emqR13LoseStoryline: { label: '看一段内容时，容易丢掉前后的线索' },
  emqR13MixDetails: { label: '会把不同事情的细节混在一起' },
  emqR13RepeatSelf: { label: '不太确定自己是否重复说过同样的话' },
  emqR13RereadWithoutRealizing: { label: '读内容时会不自觉反复看同一段' },
  emqR13MisplaceItems: { label: '日常会把东西随手放错，之后要找很久' },
};

export const emqR13AssessmentStepOneFields = [
  'emqR13CheckDone',
  'emqR13TimeOrder',
  'emqR13ToldByOthers',
  'emqR13TipOfTongue',
  'emqR13ForgetPlanned',
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13AssessmentStepTwoFields = [
  'emqR13ForgetDetails',
  'emqR13ForgetPassingInfo',
  'emqR13ForgetJustSaid',
  'emqR13LoseStoryline',
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13AssessmentStepThreeFields = [
  'emqR13MixDetails',
  'emqR13RepeatSelf',
  'emqR13RereadWithoutRealizing',
  'emqR13MisplaceItems',
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13AssessmentFields = [
  ...emqR13AssessmentStepOneFields,
  ...emqR13AssessmentStepTwoFields,
  ...emqR13AssessmentStepThreeFields,
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13RetrievalFields = [
  'emqR13CheckDone',
  'emqR13TimeOrder',
  'emqR13ToldByOthers',
  'emqR13TipOfTongue',
  'emqR13ForgetPlanned',
  'emqR13ForgetDetails',
  'emqR13ForgetPassingInfo',
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13AttentionalTrackingFields = [
  'emqR13ForgetJustSaid',
  'emqR13LoseStoryline',
  'emqR13MixDetails',
  'emqR13RepeatSelf',
] as const satisfies readonly EmqR13AssessmentFieldKey[];

export const emqR13AssessmentResultCopy: Record<
  EmqR13AssessmentResultLevel,
  {
    levelLabel: string;
    summary: string;
    advice: string;
    tone: EmqR13AssessmentResultTone;
  }
> = {
  clear: {
    levelLabel: '当前未见明显困扰',
    summary:
      '你本次 EMQ-R13 总分为 {{score}} 分，当前主观记忆和注意困扰整体不明显，日常状态总体稳定。',
    advice: '继续保持规律作息和日常记录，关注压力、睡眠和脑力负荷变化即可。',
    tone: 'green',
  },
  watch: {
    levelLabel: '轻度关注',
    summary:
      '你本次 EMQ-R13 总分为 {{score}} 分，提示近期已经出现一定程度的主观记忆或注意困扰，建议开始留意变化趋势。',
    advice: '建议优先关注近期睡眠、情绪、压力与多任务负荷，持续观察近几周是否继续加重。',
    tone: 'pink',
  },
  track: {
    levelLabel: '建议持续跟踪',
    summary:
      '你本次 EMQ-R13 总分为 {{score}} 分，提示近期记忆提取或注意追踪方面已有较明确困扰，适合继续跟踪记录。',
    advice: '建议结合睡眠、情绪和月经阶段做连续记录，观察是否在高压、疲劳或围绝经相关阶段更明显。',
    tone: 'orange',
  },
  evaluate: {
    levelLabel: '建议进一步评估',
    summary:
      '你本次 EMQ-R13 总分为 {{score}} 分，提示近期主观记忆与注意困扰较明显，已经值得进一步评估。',
    advice: '若近阶段已明显影响工作、沟通或生活安排，建议尽快寻求专业评估与支持。',
    tone: 'orange',
  },
};

export const emqR13AssessmentPersonalizedFeedbackCopy: Record<EmqR13AssessmentFieldKey, string> = {
  emqR13CheckDone: '你最近可能更容易对做过的事情反复确认，提示执行后的记忆留痕感在变弱。',
  emqR13TimeOrder: '你最近对事件先后顺序的把握可能变得不够稳定，容易在回想时发生错位。',
  emqR13ToldByOthers: '你最近对他人提到的信息保留度下降，提示外部输入后的提取效率在波动。',
  emqR13TipOfTongue: '你最近可能更常出现“就在嘴边却想不起来”的感觉，属于常见的提取卡顿表现。',
  emqR13ForgetPlanned: '你最近对原计划事项的保持感下降，更适合借助提醒和清单减轻脑内负担。',
  emqR13ForgetDetails: '你最近对刚接触细节的保持时间偏短，提示短时记忆承接可能受到了影响。',
  emqR13ForgetPassingInfo: '你最近对随口信息的保存较弱，建议减少同时接收过多零散信息。',
  emqR13ForgetJustSaid: '你最近在刚说过或刚听到的内容上更容易断线，提示注意追踪负荷偏高。',
  emqR13LoseStoryline: '你最近在追随较长内容时更容易丢掉上下文，说明持续注意的稳定性有所下降。',
  emqR13MixDetails: '你最近容易把不同事情细节混在一起，提示信息整合过程更需要外部辅助。',
  emqR13RepeatSelf: '你最近可能会担心自己是否重复表达，这通常和对即时对话线索的把握下降有关。',
  emqR13RereadWithoutRealizing: '你最近阅读时可能更容易无意识回看，提示注意维持与内容跟踪变得吃力。',
  emqR13MisplaceItems: '你最近随手放物后更难快速回想位置，说明日常记忆负荷已经值得关注。',
};
