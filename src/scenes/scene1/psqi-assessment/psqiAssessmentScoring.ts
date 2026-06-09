import {
  PsqiAssessmentResultLevel,
  PsqiAssessmentResultTone,
  psqiAssessmentDisclaimer,
  psqiAssessmentResultCopy,
  psqiAssessmentResultTitle,
} from './psqiAssessmentContent';
import { PsqiAssessmentAnswers, createEmptyPsqiAssessmentAnswers } from './psqiAssessmentState';

export type PsqiAssessmentComponentScores = {
  subjectiveQuality: number;
  sleepLatency: number;
  sleepDuration: number;
  sleepEfficiency: number;
  sleepDisturbance: number;
  sleepMedication: number;
  daytimeDysfunction: number;
};

export type PsqiAssessmentResultSummary = {
  title: string;
  score: number;
  level: PsqiAssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  hasPoorSleep: boolean;
  componentScores: PsqiAssessmentComponentScores;
  dominantModules: string[];
  personalizedNotes: string[];
  tone: PsqiAssessmentResultTone;
};

const disturbanceFields = [
  'psqiSleepDisturbanceWakeUp',
  'psqiSleepDisturbanceBathroom',
  'psqiSleepDisturbanceBreathing',
  'psqiSleepDisturbanceSnoring',
  'psqiSleepDisturbanceCold',
  'psqiSleepDisturbanceHot',
  'psqiSleepDisturbanceDreams',
  'psqiSleepDisturbancePain',
  'psqiSleepDisturbanceOther',
] as const;

function getNumberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getTimeInMinutes(value: string) {
  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return 0;
  }

  return hour * 60 + minute;
}

function getBedTimeHours(answers: PsqiAssessmentAnswers) {
  const bedTimeMinutes = getTimeInMinutes(answers.psqiBedTime);
  const wakeTimeMinutes = getTimeInMinutes(answers.psqiWakeTime);
  const adjustedWakeTimeMinutes =
    wakeTimeMinutes <= bedTimeMinutes ? wakeTimeMinutes + 24 * 60 : wakeTimeMinutes;

  const durationMinutes = adjustedWakeTimeMinutes - bedTimeMinutes;
  return durationMinutes > 0 ? durationMinutes / 60 : 0;
}

function getSubjectiveQualityScore(answers: PsqiAssessmentAnswers) {
  return getNumberValue(answers.psqiSubjectiveQuality);
}

function getSleepLatencyScore(answers: PsqiAssessmentAnswers) {
  const latencyMinutes = getNumberValue(answers.psqiSleepLatencyMinutes);
  const latencyScore =
    latencyMinutes <= 15 ? 0 : latencyMinutes <= 30 ? 1 : latencyMinutes <= 60 ? 2 : 3;
  const fallingAsleepScore = getNumberValue(answers.psqiSleepDisturbanceFallingAsleep);
  const combinedScore = latencyScore + fallingAsleepScore;

  if (combinedScore === 0) {
    return 0;
  }

  if (combinedScore <= 2) {
    return 1;
  }

  if (combinedScore <= 4) {
    return 2;
  }

  return 3;
}

function getSleepDurationScore(answers: PsqiAssessmentAnswers) {
  const sleepHours = getNumberValue(answers.psqiSleepDurationHours);

  if (sleepHours > 7) {
    return 0;
  }

  if (sleepHours >= 6) {
    return 1;
  }

  if (sleepHours >= 5) {
    return 2;
  }

  return 3;
}

function getSleepEfficiencyScore(answers: PsqiAssessmentAnswers) {
  const actualSleepHours = getNumberValue(answers.psqiSleepDurationHours);
  const bedTimeHours = getBedTimeHours(answers);
  const efficiency = bedTimeHours > 0 ? (actualSleepHours / bedTimeHours) * 100 : 0;

  if (efficiency > 85) {
    return 0;
  }

  if (efficiency >= 75) {
    return 1;
  }

  if (efficiency >= 65) {
    return 2;
  }

  return 3;
}

function getSleepDisturbanceScore(answers: PsqiAssessmentAnswers) {
  const total = disturbanceFields.reduce(
    (sum, field) => sum + getNumberValue(answers[field]),
    0,
  );

  if (total === 0) {
    return 0;
  }

  if (total <= 9) {
    return 1;
  }

  if (total <= 18) {
    return 2;
  }

  return 3;
}

function getSleepMedicationScore(answers: PsqiAssessmentAnswers) {
  return getNumberValue(answers.psqiSleepMedication);
}

function getDaytimeDysfunctionScore(answers: PsqiAssessmentAnswers) {
  const total =
    getNumberValue(answers.psqiDaytimeSleepiness) + getNumberValue(answers.psqiDaytimeEnthusiasm);

  if (total === 0) {
    return 0;
  }

  if (total <= 2) {
    return 1;
  }

  if (total <= 4) {
    return 2;
  }

  return 3;
}

function getLevel(score: number): PsqiAssessmentResultLevel {
  if (score <= 5) {
    return 'good';
  }

  if (score <= 7) {
    return 'early-warning';
  }

  if (score <= 12) {
    return 'moderate-burden';
  }

  return 'high-burden';
}

function getDominantModules(componentScores: PsqiAssessmentComponentScores) {
  const modules: string[] = [];

  if (componentScores.subjectiveQuality + componentScores.sleepLatency >= 4) {
    modules.push('主观睡眠感受差：你的主要问题集中在“睡得不舒服、入睡不顺”。');
  }

  if (componentScores.sleepDuration + componentScores.sleepEfficiency >= 4) {
    modules.push('睡眠效率低：你可能在床时间不短，但真正睡着的时间不够。');
  }

  if (
    componentScores.sleepDisturbance +
      componentScores.sleepMedication +
      componentScores.daytimeDysfunction >=
    4
  ) {
    modules.push('日间受损明显：夜里睡不好已经开始影响白天状态和生活质量。');
  }

  return modules;
}

function getPersonalizedNotes(componentScores: PsqiAssessmentComponentScores) {
  const notes: string[] = [];

  if (
    componentScores.sleepLatency >= 2 &&
    componentScores.daytimeDysfunction >= 2
  ) {
    notes.push('你的睡眠问题已经从“晚上难睡”延伸到“白天难恢复”，建议优先处理。');
  }

  if (
    componentScores.sleepDuration >= 2 &&
    componentScores.sleepEfficiency >= 2
  ) {
    notes.push('你的核心问题更像“睡眠不足型”，建议重点改善有效睡眠时间。');
  }

  if (
    componentScores.subjectiveQuality >= 2 &&
    componentScores.sleepDisturbance >= 2
  ) {
    notes.push('你不仅觉得睡得差，而且夜里也容易被打断，这种模式更容易持续影响生活质量。');
  }

  if (componentScores.sleepMedication >= 2) {
    notes.push('建议关注助眠药物的使用频率和依赖风险，必要时在医生指导下调整。');
  }

  return notes;
}

export function createPsqiAssessmentAnswers(
  overrides: Partial<PsqiAssessmentAnswers> = {},
) {
  return createEmptyPsqiAssessmentAnswers({
    psqiBedTime: '23:00',
    psqiSleepLatencyMinutes: '10',
    psqiWakeTime: '07:00',
    psqiSleepDurationHours: '7.5',
    psqiSleepDisturbanceFallingAsleep: '0',
    psqiSleepDisturbanceWakeUp: '0',
    psqiSleepDisturbanceBathroom: '0',
    psqiSleepDisturbanceBreathing: '0',
    psqiSleepDisturbanceSnoring: '0',
    psqiSleepDisturbanceCold: '0',
    psqiSleepDisturbanceHot: '0',
    psqiSleepDisturbanceDreams: '0',
    psqiSleepDisturbancePain: '0',
    psqiSleepDisturbanceOther: '0',
    psqiSleepDisturbanceOtherText: '',
    psqiSubjectiveQuality: '0',
    psqiSleepMedication: '0',
    psqiDaytimeSleepiness: '0',
    psqiDaytimeEnthusiasm: '0',
    ...overrides,
  });
}

export function getPsqiAssessmentResultSummary(
  answers: PsqiAssessmentAnswers,
): PsqiAssessmentResultSummary {
  const componentScores: PsqiAssessmentComponentScores = {
    subjectiveQuality: getSubjectiveQualityScore(answers),
    sleepLatency: getSleepLatencyScore(answers),
    sleepDuration: getSleepDurationScore(answers),
    sleepEfficiency: getSleepEfficiencyScore(answers),
    sleepDisturbance: getSleepDisturbanceScore(answers),
    sleepMedication: getSleepMedicationScore(answers),
    daytimeDysfunction: getDaytimeDysfunctionScore(answers),
  };
  const score = Object.values(componentScores).reduce((sum, item) => sum + item, 0);
  const level = getLevel(score);
  const copy = psqiAssessmentResultCopy[level];

  return {
    title: psqiAssessmentResultTitle,
    score,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary.replace('{{score}}', String(score)),
    advice: copy.advice,
    disclaimer: psqiAssessmentDisclaimer,
    hasPoorSleep: score > 5,
    componentScores,
    dominantModules: getDominantModules(componentScores),
    personalizedNotes: getPersonalizedNotes(componentScores),
    tone: copy.tone,
  };
}
