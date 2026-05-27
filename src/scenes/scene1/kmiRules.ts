export const kmiFieldOrder = [
  'kmiHotFlashes',
  'kmiParesthesia',
  'kmiInsomnia',
  'kmiNervousness',
  'kmiMelancholia',
  'kmiVertigo',
  'kmiFatigue',
  'kmiJointPain',
  'kmiHeadache',
  'kmiPalpitations',
  'kmiFormication',
  'kmiSexualImpact',
  'kmiUrinarySymptoms',
] as const;

export type KmiFieldKey = (typeof kmiFieldOrder)[number];

export type KmiOption = {
  value: '0' | '1' | '2' | '3';
  label: string;
  description: string;
};

export type KmiRule = {
  field: KmiFieldKey;
  label: string;
  weight: number;
  options: KmiOption[];
};

export const kmiRules: KmiRule[] = [
  {
    field: 'kmiHotFlashes',
    label: '潮热出汗',
    weight: 4,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '<3次/日' },
      { value: '2', label: '中度', description: '3-9次/日' },
      { value: '3', label: '重度', description: '>=10次/日' },
    ],
  },
  {
    field: 'kmiParesthesia',
    label: '感觉异常（麻木、刺痛）',
    weight: 2,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔出现' },
      { value: '2', label: '中度', description: '经常出现，有不适感' },
      { value: '3', label: '重度', description: '持续存在且影响生活' },
    ],
  },
  {
    field: 'kmiInsomnia',
    label: '失眠（入睡困难、多梦、易醒）',
    weight: 2,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔睡不好' },
      { value: '2', label: '中度', description: '经常失眠' },
      {
        value: '3',
        label: '重度',
        description: '长期失眠且影响白天功能或者必须服用安眠药',
      },
    ],
  },
  {
    field: 'kmiNervousness',
    label: '易激动（烦躁、易怒）',
    weight: 2,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔烦躁' },
      {
        value: '2',
        label: '中度',
        description: '经常情绪波动且其他人可以察觉',
      },
      {
        value: '3',
        label: '重度',
        description: '明显影响家庭和工作关系且不能自控',
      },
    ],
  },
  {
    field: 'kmiMelancholia',
    label: '抑郁（情绪低落、消极）',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔情绪低落' },
      { value: '2', label: '中度', description: '经常情绪低落但能自控' },
      {
        value: '3',
        label: '重度',
        description: '失去生活信心且影响日常',
      },
    ],
  },
  {
    field: 'kmiVertigo',
    label: '眩晕',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔发生' },
      { value: '2', label: '中度', description: '经常，不影响生活' },
      { value: '3', label: '重度', description: '影响生活与工作' },
    ],
  },
  {
    field: 'kmiFatigue',
    label: '疲乏（乏力、易疲劳）',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '活动后疲乏' },
      { value: '2', label: '中度', description: '经常感到' },
      { value: '3', label: '重度', description: '持续疲劳且日常活动受限' },
    ],
  },
  {
    field: 'kmiJointPain',
    label: '骨关节、肌肉痛',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '轻微酸痛' },
      { value: '2', label: '中度', description: '经常疼痛但不影响功能' },
      { value: '3', label: '重度', description: '功能障碍' },
    ],
  },
  {
    field: 'kmiHeadache',
    label: '头痛',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔发生' },
      { value: '2', label: '中度', description: '经常出现但能忍受' },
      {
        value: '3',
        label: '重度',
        description: '疼痛无法忍受或者持续发生，已经需治疗',
      },
    ],
  },
  {
    field: 'kmiPalpitations',
    label: '心悸（心慌、胸闷）',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔心慌' },
      { value: '2', label: '中度', description: '经常心慌但不影响生活' },
      { value: '3', label: '重度', description: '经常心慌胸闷且需治疗' },
    ],
  },
  {
    field: 'kmiFormication',
    label: '皮肤蚁走感',
    weight: 1,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔出现' },
      { value: '2', label: '中度', description: '经常出现，有不适感' },
      { value: '3', label: '重度', description: '持续存在且影响生活' },
    ],
  },
  {
    field: 'kmiSexualImpact',
    label: '性生活状况（阴道干燥、痛）',
    weight: 2,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔出现' },
      { value: '2', label: '中度', description: '经常出现但能忍受' },
      { value: '3', label: '重度', description: '持续出现已经影响生活' },
    ],
  },
  {
    field: 'kmiUrinarySymptoms',
    label: '尿路症状（尿频、尿急）',
    weight: 2,
    options: [
      { value: '0', label: '无症状', description: '无明显不适' },
      { value: '1', label: '轻度', description: '偶尔发生' },
      { value: '2', label: '中度', description: '经常出现但不影响生活' },
      {
        value: '3',
        label: '重度',
        description: '持续出现且已经影响生活与工作',
      },
    ],
  },
];

export const kmiRuleMap = Object.fromEntries(
  kmiRules.map((rule) => [rule.field, rule])
) as Record<KmiFieldKey, KmiRule>;
