export type BoneAssessmentStepId = 1 | 2 | 3 | 4 | 5;

export type BoneAssessmentFieldKey =
  | 'age'
  | 'heightCm'
  | 'weightKg'
  | 'boneParentOsteoporosisOrFragilityFracture'
  | 'boneParentHunchback'
  | 'boneAdultFragilityFracture'
  | 'boneFrequentFallsOrFear'
  | 'boneHeightLossOver3cm'
  | 'boneSteroidOver3Months'
  | 'boneRheumatoidArthritis'
  | 'boneSecondaryDisease'
  | 'boneHeavyAlcohol'
  | 'boneSmokingHistory'
  | 'boneExerciseUnder30Min'
  | 'boneNoDairyAndNoCalcium'
  | 'boneOutdoorUnder10MinAndNoVitaminD'
  | 'boneMenopauseBefore45'
  | 'boneAmenorrheaOver12Months'
  | 'boneOvaryRemovalBefore50WithoutHrt'
  | 'vdSunExposureUnder20Min'
  | 'vdStrictSunProtection'
  | 'vdMostlyIndoor'
  | 'vdDietLack'
  | 'vdDigestiveAbsorptionIssue'
  | 'vdDarkSkin'
  | 'vdBoneMuscleDiscomfort'
  | 'vdLegCramp'
  | 'vdFatigueMoodAnxiety'
  | 'vdBrittleNails';

export type BoneAssessmentOption = {
  value: string;
  label: string;
  description?: string;
};

export type BoneAssessmentFieldCopy = {
  label: string;
  description?: string;
};

export const boneAssessmentYesNoOptions: BoneAssessmentOption[] = [
  { value: 'yes', label: '是' },
  { value: 'no', label: '否' },
];

export const boneAssessmentProfileFields = ['age', 'heightCm', 'weightKg'] as const;

export const boneAssessmentBoneRiskStepAFields = [
  'boneParentOsteoporosisOrFragilityFracture',
  'boneParentHunchback',
  'boneAdultFragilityFracture',
  'boneFrequentFallsOrFear',
  'boneHeightLossOver3cm',
  'boneSteroidOver3Months',
  'boneRheumatoidArthritis',
  'boneSecondaryDisease',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentBoneRiskStepBFields = [
  'boneHeavyAlcohol',
  'boneSmokingHistory',
  'boneExerciseUnder30Min',
  'boneNoDairyAndNoCalcium',
  'boneOutdoorUnder10MinAndNoVitaminD',
  'boneMenopauseBefore45',
  'boneAmenorrheaOver12Months',
  'boneOvaryRemovalBefore50WithoutHrt',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentVitaminDRiskStepAFields = [
  'vdSunExposureUnder20Min',
  'vdStrictSunProtection',
  'vdMostlyIndoor',
  'vdDietLack',
  'vdDigestiveAbsorptionIssue',
  'vdDarkSkin',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentVitaminDRiskStepBFields = [
  'vdBoneMuscleDiscomfort',
  'vdLegCramp',
  'vdFatigueMoodAnxiety',
  'vdBrittleNails',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentIofPositiveFields = [
  ...boneAssessmentBoneRiskStepAFields,
  ...boneAssessmentBoneRiskStepBFields,
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentVitaminDPositiveFields = [
  ...boneAssessmentVitaminDRiskStepAFields,
  ...boneAssessmentVitaminDRiskStepBFields,
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentIofKeyAlertFields = [
  'boneAdultFragilityFracture',
  'boneParentOsteoporosisOrFragilityFracture',
  'boneHeightLossOver3cm',
  'boneMenopauseBefore45',
  'boneSteroidOver3Months',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentVitaminDEscalationFields = [
  'vdBoneMuscleDiscomfort',
  'vdLegCramp',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentVitaminDImprovementPriority = [
  'vdBoneMuscleDiscomfort',
  'vdLegCramp',
  'vdDigestiveAbsorptionIssue',
  'vdSunExposureUnder20Min',
  'vdStrictSunProtection',
  'vdMostlyIndoor',
  'vdDietLack',
  'vdDarkSkin',
  'vdFatigueMoodAnxiety',
  'vdBrittleNails',
] as const satisfies readonly BoneAssessmentFieldKey[];

export const boneAssessmentStepCopy: Record<
  BoneAssessmentStepId,
  { title: string; subtitle: string }
> = {
  1: {
    title: '基础资料',
    subtitle: '先补充基础资料，用于自动计算 OSTA 指数与 BMI 风险。',
  },
  2: {
    title: '骨质疏松风险 A',
    subtitle: '先看看个人和家族相关的骨健康风险信号。',
  },
  3: {
    title: '骨质疏松风险 B',
    subtitle: '继续补充生活方式与绝经相关风险因素。',
  },
  4: {
    title: '维生素D风险 A',
    subtitle: '这一页主要了解日晒、饮食和吸收相关情况。',
  },
  5: {
    title: '维生素D风险 B',
    subtitle: '补充近期身体感受后，我们会生成本次风险结果。',
  },
};

export const boneAssessmentFieldCopyMap: Record<BoneAssessmentFieldKey, BoneAssessmentFieldCopy> = {
  age: {
    label: '年龄',
    description: '用于计算 OSTA 指数，并辅助判断年龄相关风险。',
  },
  heightCm: {
    label: '身高',
    description: '会与体重一起计算 BMI，用于风险判断。',
  },
  weightKg: {
    label: '体重',
    description: '会与年龄一起计算 OSTA 指数。',
  },
  boneParentOsteoporosisOrFragilityFracture: {
    label: '父母是否曾被诊断骨质疏松或发生过脆性骨折？',
  },
  boneParentHunchback: {
    label: '父母是否有明显驼背？',
  },
  boneAdultFragilityFracture: {
    label: '成年后是否因轻微碰撞或跌倒就发生过骨折？',
  },
  boneFrequentFallsOrFear: {
    label: '是否经常跌倒，或明显担心自己会跌倒？',
  },
  boneHeightLossOver3cm: {
    label: '身高是否比年轻时减少超过 3cm？',
  },
  boneSteroidOver3Months: {
    label: '是否连续使用激素类药物超过 3 个月？',
  },
  boneRheumatoidArthritis: {
    label: '是否被诊断过类风湿关节炎？',
  },
  boneSecondaryDisease: {
    label: '是否有会影响骨代谢的慢性疾病？',
  },
  boneHeavyAlcohol: {
    label: '是否经常大量饮酒？',
  },
  boneSmokingHistory: {
    label: '是否长期吸烟，或曾长期吸烟？',
  },
  boneExerciseUnder30Min: {
    label: '日常活动是否经常少于 30 分钟？',
  },
  boneNoDairyAndNoCalcium: {
    label: '是否很少吃奶制品且未额外补钙？',
  },
  boneOutdoorUnder10MinAndNoVitaminD: {
    label: '是否日常户外少于 10 分钟且未补充维生素D？',
  },
  boneMenopauseBefore45: {
    label: '是否在 45 岁前绝经或长期停经？',
  },
  boneAmenorrheaOver12Months: {
    label: '是否曾连续 12 个月以上不来月经（非怀孕/哺乳）？',
  },
  boneOvaryRemovalBefore50WithoutHrt: {
    label: '是否 50 岁前切除卵巢且未接受激素替代治疗？',
  },
  vdSunExposureUnder20Min: {
    label: '平均每天日晒是否少于 20 分钟？',
  },
  vdStrictSunProtection: {
    label: '外出时是否长期严格防晒？',
  },
  vdMostlyIndoor: {
    label: '工作和生活是否大部分时间都在室内？',
  },
  vdDietLack: {
    label: '饮食中是否很少摄入鱼类、蛋黄或强化乳制品？',
  },
  vdDigestiveAbsorptionIssue: {
    label: '是否存在消化吸收问题或相关慢性疾病？',
  },
  vdDarkSkin: {
    label: '是否属于肤色较深、日晒后较难合成维生素D的人群？',
  },
  vdBoneMuscleDiscomfort: {
    label: '近期是否常有骨痛、肌肉酸痛或无力？',
  },
  vdLegCramp: {
    label: '是否经常出现小腿抽筋？',
  },
  vdFatigueMoodAnxiety: {
    label: '是否经常疲乏，或伴随情绪低落、焦虑？',
  },
  vdBrittleNails: {
    label: '指甲是否容易脆、容易断？',
  },
};

export const boneAssessmentKeyAlertCopy: Record<
  (typeof boneAssessmentIofKeyAlertFields)[number],
  string
> = {
  boneAdultFragilityFracture: '成年后曾发生轻微外力骨折',
  boneParentOsteoporosisOrFragilityFracture: '父母有骨质疏松或脆性骨折史',
  boneHeightLossOver3cm: '身高较年轻时下降超过 3cm',
  boneMenopauseBefore45: '45 岁前绝经或长期停经',
  boneSteroidOver3Months: '连续使用激素类药物超过 3 个月',
};

export const boneAssessmentKeyAlertDetailCopy: Record<
  (typeof boneAssessmentIofKeyAlertFields)[number],
  string
> = {
  boneAdultFragilityFracture:
    '这是一项需要优先重视的骨折风险信号，建议尽快就医评估骨密度和骨折风险。骨质疏松常表现为轻微跌倒或碰撞后骨折。',
  boneParentOsteoporosisOrFragilityFracture:
    '家族史提示你可能有更高的骨健康风险，建议把骨密度评估提上日程。中国研究中，父母脆性骨折史与更高风险等级相关。',
  boneHeightLossOver3cm:
    '身高明显变矮可能提示椎体受压或骨量变化，建议尽快做专业评估。这也是中国研究里与更高风险等级相关的重点项目。',
  boneMenopauseBefore45:
    '较早绝经会缩短雌激素对骨骼的保护时间，是围绝经期女性尤其需要关注的风险信号。这也是研究中与更高风险等级相关的重点项目。',
  boneSteroidOver3Months:
    '长期使用糖皮质激素可能影响骨健康，建议与医生确认是否需要更早做骨密度检查或进一步骨折风险评估。',
};

export const boneAssessmentIofBandCopy = {
  '0': {
    title: '当前未见明显骨健康风险信号',
    summary:
      '根据本次问卷，你目前未勾选明显的骨质疏松相关风险因素。这是一个积极信号，但不代表未来没有风险。围绝经期是骨量变化的重要阶段，建议继续保持规律运动、均衡饮食、充足钙和维生素D摄入，并持续关注身高变化和月经/绝经情况。',
    actionLabel: '继续了解骨健康',
    note: '本问卷用于风险筛查，不能替代骨密度检查或医生诊断。',
    tone: 'green',
  },
  '1-2': {
    title: '你已有部分骨质疏松风险因素',
    summary:
      '根据本次问卷，你存在部分骨质疏松相关风险因素。虽然这不等于已经患病，但说明你值得更早开始关注骨健康。建议从现在起重视负重运动、抗阻训练、日常防跌倒，并注意钙、蛋白质和维生素D的摄入。',
    actionLabel: '查看改善建议',
    note: '如果后续新增风险因素，建议尽早咨询医生。',
    tone: 'pink',
  },
  '3-4': {
    title: '你存在较多骨健康风险信号',
    summary:
      '根据本次问卷，你已出现较多骨质疏松相关风险因素。围绝经期女性在激素变化阶段更需要关注骨量流失。建议你尽快与医生讨论，评估是否需要进行骨密度检查或进一步骨折风险评估。',
    actionLabel: '了解下一步检查',
    note: '问卷结果仅提示风险，不代表确诊。',
    tone: 'orange',
  },
  '5+': {
    title: '你属于骨质疏松高关注人群',
    summary:
      '根据本次问卷，你出现了多个骨质疏松相关风险因素，提示未来低骨量、骨质疏松或骨折风险较高。建议尽快到正规医疗机构进行专业评估，并与医生讨论是否需要骨密度检查及后续管理。',
    actionLabel: '尽快安排评估',
    note: '若近期曾因轻微跌倒或轻微碰撞发生骨折，请优先就医。骨质疏松会增加轻微跌倒或碰撞后骨折的风险。',
    tone: 'orange',
  },
} as const;

export const boneAssessmentVitaminDKeyFactorCopy: Partial<Record<BoneAssessmentFieldKey, string>> = {
  vdSunExposureUnder20Min: '平均每天日晒时间偏少',
  vdStrictSunProtection: '长期严格防晒',
  vdMostlyIndoor: '长期以室内生活为主',
  vdDietLack: '饮食中维生素D来源偏少',
  vdDigestiveAbsorptionIssue: '存在消化吸收相关影响因素',
  vdDarkSkin: '维生素D自然合成效率可能偏低',
  vdBoneMuscleDiscomfort: '近期骨痛、肌肉酸痛或无力',
  vdLegCramp: '经常小腿抽筋',
  vdFatigueMoodAnxiety: '疲乏或情绪低落较明显',
  vdBrittleNails: '指甲脆弱易断',
};

export const boneAssessmentVitaminDBmiKeyFactorCopy = 'BMI 超过 28，体重状态可能影响维生素D利用';

export const boneAssessmentVitaminDImprovementCopy: Partial<Record<BoneAssessmentFieldKey, string>> = {
  vdBoneMuscleDiscomfort: '若骨痛或肌肉无力持续出现，建议尽早做 25(OH)D 检测并结合医生建议处理。',
  vdLegCramp: '抽筋反复出现时，建议同步关注维生素D与钙摄入是否充足。',
  vdDigestiveAbsorptionIssue: '若存在吸收问题，后续补充方案更适合与医生一起确认。',
  vdSunExposureUnder20Min: '可在日常作息中增加更稳定的户外日晒时间。',
  vdStrictSunProtection: '在保证防晒习惯的同时，可适度安排短时户外暴露。',
  vdMostlyIndoor: '若长期室内工作，可主动安排白天短时外出活动。',
  vdDietLack: '饮食里可增加鱼类、蛋黄或强化乳制品等来源。',
  vdDarkSkin: '若长期日晒有限，可更关注维生素D补充习惯。',
  vdFatigueMoodAnxiety: '若持续疲乏或情绪波动，建议结合睡眠、运动和营养一起调整。',
  vdBrittleNails: '若长期出现脆甲问题，建议同时关注营养与微量元素摄入。',
};

export const boneAssessmentVitaminDBmiImprovementCopy =
  '建议结合饮食调整和规律运动逐步控制体重，因为体脂偏高可能影响维生素D在体内的利用和分布。';

export const boneAssessmentVitaminDGroupSummaryCopy = {
  lifestyle: '您的风险主要来自日晒不足和饮食摄入不足，属于较典型的生活方式相关风险。',
  baseline: '您的风险除生活方式外，还涉及体重、吸收功能或皮肤特征等基础因素，建议提高筛查和复评频率。',
  symptom: '您已出现一定的身体提示信号，尤其建议结合实验室检测进一步确认，而不仅仅依赖问卷判断。',
  generic: '建议结合已命中的风险因素持续调整生活方式，并按阶段复评。',
} as const;

export const boneAssessmentVitaminDDisclaimer =
  '本问卷用于维生素D缺乏风险筛查，不能替代医学诊断。若存在明显骨痛、肌无力、反复抽筋、慢性腹泻、胆囊/肝胆疾病或长期服药情况，建议优先就医并结合实验室检测判断。';
