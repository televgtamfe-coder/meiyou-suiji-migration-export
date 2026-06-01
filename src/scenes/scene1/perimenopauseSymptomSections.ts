import type { KmiFieldKey } from './kmiRules';

export type PerimenopauseSymptomItemId = string;

export type PerimenopauseSymptomItem = {
  id: PerimenopauseSymptomItemId;
  label: string;
  iconField: KmiFieldKey;
};

export type PerimenopauseSymptomSection = {
  title: string;
  items: PerimenopauseSymptomItem[];
};

function makeItem(id: PerimenopauseSymptomItemId, label: string, iconField: KmiFieldKey): PerimenopauseSymptomItem {
  return { id, label, iconField };
}

export const perimenopauseSymptomSections: PerimenopauseSymptomSection[] = [
  {
    title: '身体症状',
    items: [
      makeItem('kmiHotFlashes', '潮热', 'kmiHotFlashes'),
      makeItem('symptom-sweating', '出汗', 'kmiHotFlashes'),
      makeItem('kmiHeadache', '头痛', 'kmiHeadache'),
      makeItem('kmiPalpitations', '心悸', 'kmiPalpitations'),
      makeItem('symptom-joint-pain', '关节疼痛', 'kmiJointPain'),
      makeItem('symptom-muscle-ache', '肌肉酸痛', 'kmiJointPain'),
      makeItem('symptom-sleep-disorder', '睡眠障碍', 'kmiInsomnia'),
      makeItem('kmiFatigue', '疲劳乏力', 'kmiFatigue'),
      makeItem('kmiVertigo', '头晕', 'kmiVertigo'),
      makeItem('symptom-night-sweats', '夜间盗汗', 'kmiHotFlashes'),
      makeItem('symptom-sleep-onset', '入睡困难', 'kmiInsomnia'),
      makeItem('symptom-vaginal-dryness-body', '阴道干涩', 'kmiSexualImpact'),
      makeItem('symptom-libido-decline', '性欲下降', 'kmiSexualImpact'),
      makeItem('symptom-urinary-urgency', '尿急', 'kmiUrinarySymptoms'),
      makeItem('symptom-urinary-frequency', '尿频', 'kmiUrinarySymptoms'),
      makeItem('symptom-urinary-infection', '尿路感染', 'kmiUrinarySymptoms'),
    ],
  },
  {
    title: '睡眠问题',
    items: [
      makeItem('symptom-dreaming', '多梦', 'kmiInsomnia'),
      makeItem('symptom-easy-wake', '易醒', 'kmiInsomnia'),
      makeItem('symptom-light-sleep', '睡眠浅', 'kmiInsomnia'),
      makeItem('symptom-early-wake', '早醒', 'kmiInsomnia'),
      makeItem('symptom-repeated-wake', '反复醒来', 'kmiInsomnia'),
      makeItem('symptom-tired-morning', '晨起疲惫', 'kmiFatigue'),
      makeItem('symptom-sleep-anxiety', '睡眠恐惧', 'kmiNervousness'),
    ],
  },
  {
    title: '脑功能',
    items: [
      makeItem('symptom-memory-decline', '记忆力下降', 'kmiNervousness'),
      makeItem('symptom-attention-decline', '注意力下降', 'kmiNervousness'),
      makeItem('symptom-brain-fog', '脑雾', 'kmiVertigo'),
      makeItem('symptom-efficiency-decline', '效率下降', 'kmiFatigue'),
    ],
  },
  {
    title: '泌尿系统',
    items: [
      makeItem('symptom-urinary-discomfort', '尿路不适', 'kmiUrinarySymptoms'),
      makeItem('symptom-leakage', '漏尿', 'kmiUrinarySymptoms'),
      makeItem('symptom-incontinence', '尿失禁', 'kmiUrinarySymptoms'),
      makeItem('symptom-pelvic-floor', '盆底肌松弛', 'kmiUrinarySymptoms'),
    ],
  },
  {
    title: '阴道与性健康',
    items: [
      makeItem('symptom-vaginal-looseness', '阴道松弛感', 'kmiSexualImpact'),
      makeItem('symptom-painful-sex', '性生活疼痛', 'kmiSexualImpact'),
      makeItem('symptom-sex-discomfort', '性不适', 'kmiSexualImpact'),
      makeItem('symptom-orgasm-difficulty', '性高潮困难', 'kmiSexualImpact'),
      makeItem('symptom-sex-avoidance', '性生活回避', 'kmiSexualImpact'),
      makeItem('symptom-vaginal-dryness-sex', '阴道干涩', 'kmiSexualImpact'),
      makeItem('symptom-vaginal-itching', '阴道瘙痒', 'kmiSexualImpact'),
      makeItem('symptom-vaginal-burning', '阴道灼热', 'kmiSexualImpact'),
      makeItem('symptom-abnormal-discharge', '异常分泌物', 'kmiSexualImpact'),
    ],
  },
  {
    title: '皮肤与外貌',
    items: [
      makeItem('symptom-abdominal-fat', '腹部长赘肉', 'kmiFatigue'),
      makeItem('symptom-shape-change', '体型改变', 'kmiFatigue'),
      makeItem('symptom-skin-worse', '皮肤变差', 'kmiFormication'),
      makeItem('symptom-dry-skin', '皮肤干燥', 'kmiFormication'),
      makeItem('symptom-skin-loose', '皮肤松弛', 'kmiFormication'),
      makeItem('symptom-hair-loss', '脱发', 'kmiFatigue'),
    ],
  },
  {
    title: '身体与感受',
    items: [
      makeItem('kmiFormication', '皮肤蚁走感', 'kmiFormication'),
      makeItem('symptom-skin-abnormal', '皮肤异常', 'kmiFormication'),
      makeItem('kmiParesthesia', '麻木', 'kmiParesthesia'),
      makeItem('symptom-stabbing-pain', '刺痛', 'kmiParesthesia'),
      makeItem('symptom-bone-pain', '骨痛', 'kmiJointPain'),
      makeItem('symptom-feel-cold', '怕冷', 'kmiHotFlashes'),
      makeItem('symptom-feel-hot', '怕热', 'kmiHotFlashes'),
    ],
  },
  {
    title: '其他',
    items: [
      makeItem('symptom-breast-pain', '乳房胀痛', 'kmiJointPain'),
      makeItem('symptom-blood-pressure-wave', '血压波动感', 'kmiPalpitations'),
      makeItem('symptom-recovery-slow', '运动恢复差', 'kmiFatigue'),
      makeItem('symptom-repeat-infection', '反复感染', 'kmiUrinarySymptoms'),
      makeItem('symptom-chest-tightness', '胸闷', 'kmiPalpitations'),
      makeItem('symptom-pseudo-angina', '假性心绞痛', 'kmiPalpitations'),
      makeItem('symptom-digestion', '消化问题', 'kmiFatigue'),
      makeItem('symptom-appetite-change', '胃口变化', 'kmiFatigue'),
    ],
  },
];

export const perimenopauseSymptomItemCount = perimenopauseSymptomSections.reduce(
  (total, section) => total + section.items.length,
  0,
);
