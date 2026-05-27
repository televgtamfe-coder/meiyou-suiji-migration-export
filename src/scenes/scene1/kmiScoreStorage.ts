export const SCENE1_KMI_SCORE_STORAGE_KEY = 'scene1:kmi-score';
export const DEFAULT_SCENE1_KMI_SCORE = 6;

export function readScene1KmiScore(): number {
  if (typeof window === 'undefined') {
    return DEFAULT_SCENE1_KMI_SCORE;
  }

  const rawValue = window.localStorage.getItem(SCENE1_KMI_SCORE_STORAGE_KEY);

  if (rawValue === null) {
    return DEFAULT_SCENE1_KMI_SCORE;
  }

  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return DEFAULT_SCENE1_KMI_SCORE;
  }

  return Math.round(parsed);
}

export function writeScene1KmiScore(score: number) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(SCENE1_KMI_SCORE_STORAGE_KEY, String(Math.max(0, Math.round(score))));
}
