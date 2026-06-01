import { perimenopauseSymptomIconMap } from './perimenopauseSymptomIcons';
import type { PerimenopauseSymptomItem, PerimenopauseSymptomItemId } from './perimenopauseSymptomSections';

const symptomPackIconNames = [
  'ill_icon_bdyc',
  'ill_icon_bianmi_new',
  'ill_icon_fmwzd',
  'ill_icon_fmwzd1',
  'ill_icon_fmwzd2',
  'ill_icon_fmwzd3',
  'ill_icon_fmwzd4',
  'ill_icon_fmwzd5',
  'ill_icon_fuzhong',
  'ill_icon_gjsc',
  'ill_icon_gjtt',
  'ill_icon_gmzz',
  'ill_icon_gmzz0',
  'ill_icon_niaopin',
  'ill_icon_pdsc1',
  'ill_icon_pdsc2',
  'ill_icon_pdsc3',
  'ill_icon_pfsy',
  'ill_icon_pftxc',
  'ill_icon_rfxc',
  'ill_icon_rtjl',
  'ill_icon_rtsy',
  'ill_icon_rttt',
  'ill_icon_rtyy',
  'ill_icon_stfl',
  'ill_icon_stfl0',
  'ill_icon_stst',
  'ill_icon_stst0',
  'ill_icon_stst1',
  'ill_icon_swst',
  'ill_icon_sybz',
  'ill_icon_tbcj',
  'ill_icon_tbcj0',
  'ill_icon_tlmg',
  'ill_icon_xhbl',
  'ill_icon_ywzq',
  'ill_icon_ywzq0',
  'ill_icon_ywzq1',
  'ill_icon_ywzq2',
  'ill_icon_ywzq3',
  'ill_icon_zgtt',
  'ill_icon_zgtt0',
] as const;

type SymptomPackIconName = (typeof symptomPackIconNames)[number];

type SymptomIconRule = {
  matcher: RegExp;
  iconNames: readonly SymptomPackIconName[];
};

const symptomPackIconModules = import.meta.glob('../../assets/perimenopause-symptom-icons/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function getPackIconSrc(name: SymptomPackIconName): string {
  const iconSrc = symptomPackIconModules[`../../assets/perimenopause-symptom-icons/${name}.png`];

  if (!iconSrc) {
    throw new Error(`Missing perimenopause symptom icon asset: ${name}.png`);
  }

  return iconSrc;
}

const symptomPackIconMap: Record<SymptomPackIconName, string> = Object.fromEntries(
  symptomPackIconNames.map((name) => [name, getPackIconSrc(name)]),
) as Record<SymptomPackIconName, string>;

const explicitSymptomIconNameByItemId: Partial<Record<PerimenopauseSymptomItemId, SymptomPackIconName>> = {
  kmiHotFlashes: 'ill_icon_ywzq2',
  'symptom-sweating': 'ill_icon_pdsc1',
  'symptom-night-sweats': 'ill_icon_fuzhong',
  kmiHeadache: 'ill_icon_stst0',
  kmiFatigue: 'ill_icon_stfl',
  kmiVertigo: 'ill_icon_tlmg',
  kmiPalpitations: 'ill_icon_ywzq0',
  'symptom-joint-pain': 'ill_icon_gjtt',
  'symptom-muscle-ache': 'ill_icon_swst',
  'symptom-urinary-urgency': 'ill_icon_gmzz',
  'symptom-urinary-frequency': 'ill_icon_niaopin',
  'symptom-urinary-infection': 'ill_icon_gmzz0',
  'symptom-vaginal-dryness-body': 'ill_icon_stfl',
  'symptom-libido-decline': 'ill_icon_ywzq',
  'symptom-vaginal-looseness': 'ill_icon_stfl0',
  'symptom-painful-sex': 'ill_icon_ywzq3',
  'symptom-sex-discomfort': 'ill_icon_ywzq1',
  'symptom-orgasm-difficulty': 'ill_icon_ywzq3',
  'symptom-sex-avoidance': 'ill_icon_ywzq0',
  'symptom-vaginal-dryness-sex': 'ill_icon_stfl',
  'symptom-vaginal-itching': 'ill_icon_pfsy',
  'symptom-vaginal-burning': 'ill_icon_pdsc2',
  'symptom-abnormal-discharge': 'ill_icon_bdyc',
  'symptom-abdominal-fat': 'ill_icon_rfxc',
  'symptom-shape-change': 'ill_icon_rfxc',
  'symptom-skin-worse': 'ill_icon_pftxc',
  'symptom-dry-skin': 'ill_icon_pftxc',
  'symptom-skin-loose': 'ill_icon_pftxc',
  'symptom-hair-loss': 'ill_icon_pftxc',
  'symptom-bone-pain': 'ill_icon_gjsc',
  'symptom-breast-pain': 'ill_icon_rttt',
  'symptom-digestion': 'ill_icon_xhbl',
  'symptom-appetite-change': 'ill_icon_sybz',
};

const symptomIconRules: SymptomIconRule[] = [
  {
    matcher: /(潮热|出汗|盗汗|怕冷|怕热)/,
    iconNames: ['ill_icon_ywzq2', 'ill_icon_pdsc1', 'ill_icon_fuzhong'],
  },
  {
    matcher: /(睡眠|入睡|多梦|易醒|早醒|反复醒来|晨起疲惫|睡眠恐惧|记忆力|注意力|脑雾|头晕|头痛|效率|疲劳|恢复)/,
    iconNames: ['ill_icon_stst0', 'ill_icon_stst1', 'ill_icon_tlmg', 'ill_icon_stst', 'ill_icon_stfl'],
  },
  {
    matcher: /(麻木|蚁走感)/,
    iconNames: ['ill_icon_stst', 'ill_icon_stst1', 'ill_icon_tlmg'],
  },
  {
    matcher: /(心悸|血压|胸闷|心绞痛)/,
    iconNames: ['ill_icon_ywzq0', 'ill_icon_ywzq3'],
  },
  {
    matcher: /(关节|肌肉|骨痛|刺痛|酸痛)/,
    iconNames: ['ill_icon_gjtt', 'ill_icon_gjsc', 'ill_icon_tbcj', 'ill_icon_tbcj0', 'ill_icon_swst'],
  },
  {
    matcher: /(尿路|尿急|尿频|漏尿|尿失禁|盆底|感染)/,
    iconNames: ['ill_icon_niaopin', 'ill_icon_gmzz', 'ill_icon_gmzz0'],
  },
  {
    matcher: /(阴道|性欲|性生活|性不适|性高潮|回避)/,
    iconNames: ['ill_icon_ywzq', 'ill_icon_ywzq1', 'ill_icon_ywzq3', 'ill_icon_stfl', 'ill_icon_stfl0'],
  },
  {
    matcher: /(分泌物)/,
    iconNames: ['ill_icon_bdyc', 'ill_icon_fmwzd', 'ill_icon_fmwzd2', 'ill_icon_fmwzd3', 'ill_icon_fmwzd4', 'ill_icon_fmwzd5'],
  },
  {
    matcher: /(皮肤|瘙痒|灼热|松弛)/,
    iconNames: ['ill_icon_pfsy', 'ill_icon_pftxc', 'ill_icon_pdsc2', 'ill_icon_pdsc3'],
  },
  {
    matcher: /(乳房)/,
    iconNames: ['ill_icon_rttt', 'ill_icon_rtjl', 'ill_icon_rtsy', 'ill_icon_rtyy'],
  },
  {
    matcher: /(消化|胃口|食欲|便秘)/,
    iconNames: ['ill_icon_xhbl', 'ill_icon_sybz', 'ill_icon_bianmi_new'],
  },
  {
    matcher: /(腹部|赘肉|体型|浮肿)/,
    iconNames: ['ill_icon_rfxc', 'ill_icon_fuzhong', 'ill_icon_pdsc3'],
  },
];

const fallbackSymptomIconNames: readonly SymptomPackIconName[] = [
  'ill_icon_stst',
  'ill_icon_stst0',
  'ill_icon_stst1',
  'ill_icon_stfl',
  'ill_icon_tlmg',
  'ill_icon_gjtt',
  'ill_icon_gjsc',
  'ill_icon_niaopin',
  'ill_icon_ywzq',
  'ill_icon_ywzq0',
  'ill_icon_ywzq1',
  'ill_icon_ywzq2',
  'ill_icon_ywzq3',
  'ill_icon_pfsy',
  'ill_icon_pftxc',
  'ill_icon_rfxc',
  'ill_icon_xhbl',
  'ill_icon_sybz',
  'ill_icon_fuzhong',
  'ill_icon_bdyc',
  'ill_icon_tbcj',
  'ill_icon_tbcj0',
];

function hashSymptomId(value: string): number {
  return Array.from(value).reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);
}

function pickIconName(itemId: string, iconNames: readonly SymptomPackIconName[]): SymptomPackIconName {
  return iconNames[hashSymptomId(itemId) % iconNames.length];
}

export function resolvePerimenopauseSymptomIcon(item: PerimenopauseSymptomItem): string {
  const explicitIconName = explicitSymptomIconNameByItemId[item.id];

  if (explicitIconName) {
    return symptomPackIconMap[explicitIconName];
  }

  const matchedRule = symptomIconRules.find((rule) => rule.matcher.test(item.label));

  if (matchedRule) {
    return symptomPackIconMap[pickIconName(item.id, matchedRule.iconNames)];
  }

  const fallbackIconName = pickIconName(item.id, fallbackSymptomIconNames);

  return symptomPackIconMap[fallbackIconName] ?? perimenopauseSymptomIconMap[item.iconField];
}
