import { kmiFieldOrder, kmiRuleMap, kmiRules, type KmiFieldKey } from './kmiRules';

export type KmiAnswerMap = Partial<Record<KmiFieldKey, string>>;

export type KmiScoreBand = 'normal' | 'mild' | 'moderate' | 'severe';

export type KmiScoreDetail = {
  field: KmiFieldKey;
  label: string;
  severity: number;
  weight: number;
  score: number;
};

export function calculateKmiScore(answers: KmiAnswerMap): number {
  return getKmiScoreDetails(answers).reduce((sum, item) => sum + item.score, 0);
}

export function getKmiScoreDetails(answers: KmiAnswerMap): KmiScoreDetail[] {
  return kmiRules.map((rule) => {
    const severity = normalizeSeverity(answers[rule.field]);

    return {
      field: rule.field,
      label: rule.label,
      severity,
      weight: rule.weight,
      score: severity * rule.weight,
    };
  });
}

export function interpretKmiScore(total: number): { band: KmiScoreBand; label: string } {
  if (total <= 6) {
    return { band: 'normal', label: '正常' };
  }

  if (total <= 15) {
    return { band: 'mild', label: '轻度综合征' };
  }

  if (total <= 30) {
    return { band: 'moderate', label: '中度综合征' };
  }

  return { band: 'severe', label: '重度综合征' };
}

export function pickCompletedKmiAnswers<T extends Record<string, string>>(answers: T): Record<KmiFieldKey, string> {
  return Object.fromEntries(kmiFieldOrder.map((field) => [field, answers[field] ?? '0'])) as Record<
    KmiFieldKey,
    string
  >;
}

export function getKmiScoreSummary(answers: KmiAnswerMap) {
  const details = getKmiScoreDetails(answers);
  const total = details.reduce((sum, item) => sum + item.score, 0);

  return {
    total,
    max: 63,
    details,
    interpretation: interpretKmiScore(total),
  };
}

function normalizeSeverity(value: string | undefined): number {
  const parsed = Number(value ?? '0');

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.min(3, Math.max(0, parsed));
}

export function getKmiWeight(field: KmiFieldKey): number {
  return kmiRuleMap[field].weight;
}
