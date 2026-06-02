import { describe, expect, it } from 'vitest';
import type { AssessmentAnswers } from '../../src/scenes/scene1/assessmentState';
import { getStageSummary } from '../../src/scenes/scene1/components/AssessmentStepRenderer';

function createAnswers(overrides: Partial<AssessmentAnswers> = {}): AssessmentAnswers {
  return {
    age: '42',
    heightCm: '165',
    weightKg: '58',
    periodPresence: 'yes',
    cycleChange: 'same',
    cycleAbsentDuration: '',
    volumeChange: 'same',
    lastPeriodDate: '',
    lastPeriodQuickOption: 'forgot',
    ovarianFailure: 'no',
    surgeryHistory: 'none',
    hormonalContraception: 'no',
    hormoneReplacementTherapy: 'no',
    kmiHotFlashes: '0',
    kmiParesthesia: '0',
    kmiInsomnia: '0',
    kmiNervousness: '0',
    kmiMelancholia: '0',
    kmiVertigo: '0',
    kmiFatigue: '0',
    kmiJointPain: '0',
    kmiHeadache: '0',
    kmiPalpitations: '0',
    kmiFormication: '0',
    kmiSexualImpact: '0',
    kmiUrinarySymptoms: '0',
    ...overrides,
  };
}

describe('scene1 stage summary decision flow', () => {
  const now = new Date('2026-06-02T00:00:00.000Z');

  it('classifies 45+ users with 12+ months without menses as menopause', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '46',
        cycleChange: 'absent',
        cycleAbsentDuration: '12-plus-months',
      }),
      0,
      now
    );

    expect(summary.title).toBe('绝经期');
  });

  it('classifies 40-44 users with 12+ months without menses as menopause or early menopause', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '42',
        cycleChange: 'absent',
        cycleAbsentDuration: '12-plus-months',
      }),
      0,
      now
    );

    expect(summary.title).toBe('绝经期 / 早发性绝经');
  });

  it('classifies under-40 users with 12+ months without menses as S1 ovarian insufficiency screening', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '38',
        cycleChange: 'absent',
        cycleAbsentDuration: '12-plus-months',
      }),
      0,
      now
    );

    expect(summary.title).toBe('S1（卵巢早衰排查）');
  });

  it('marks 3-11 months without menses under 45 as abnormal amenorrhea with perimenopause management', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '43',
        cycleChange: 'absent',
        cycleAbsentDuration: '7-11-months',
      }),
      0,
      now
    );

    expect(summary.title).toBe('异常闭经');
    expect(summary.summary).toContain('建议就医');
    expect(summary.summary).toContain('临时按进入围绝经期管理');
  });

  it('marks sparse cycles under 40 as abnormal instead of perimenopause', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '39',
        cycleChange: 'longer',
      }),
      0,
      now
    );

    expect(summary.title).toBe('异常月经稀发');
    expect(summary.summary).toContain('建议就医');
  });

  it('treats regular cycles with elevated KMI at 45+ as contradiction pending confirmation', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '46',
        cycleChange: 'same',
      }),
      8,
      now
    );

    expect(summary.title).toBe('进入围绝经期（待确认）');
    expect(summary.summary).toContain('您自报周期规律，但症状评分提示可能存在围绝经期症状');
  });

  it('uses KMI alone when cycle history is completely unsure', () => {
    const summary = getStageSummary(
      createAnswers({
        age: '43',
        cycleChange: 'unsure',
      }),
      8,
      now
    );

    expect(summary.title).toBe('进入围绝经期');
    expect(summary.summary).toContain('记录3个月后可获得精准评估');
  });
});
