import { describe, expect, it } from 'vitest';
import {
  createBoneAssessmentAnswers,
  getBoneAssessmentResultSummary,
} from '../../src/scenes/scene1/bone-assessment/boneAssessmentScoring';

describe('bone assessment scoring', () => {
  it('returns md-aligned iof copy for zero positives', () => {
    const summary = getBoneAssessmentResultSummary(
      createBoneAssessmentAnswers({
        age: '38',
        heightCm: '160',
        weightKg: '54',
      }),
    );

    expect(summary.iof.positiveCount).toBe(0);
    expect(summary.mainResult.label).toBe('当前未见明显骨健康风险信号');
    expect(summary.mainResult.summary).toContain('未勾选明显的骨质疏松相关风险因素');
    expect(summary.mainResult.actionLabel).toBe('继续了解骨健康');
    expect(summary.mainResult.note).toContain('不能替代骨密度检查或医生诊断');
  });

  it('returns a partial-risk main result when OSTA is medium and IOF has only a few positives', () => {
    const summary = getBoneAssessmentResultSummary(
      createBoneAssessmentAnswers({
        age: '56',
        heightCm: '160',
        weightKg: '49',
        boneSmokingHistory: 'yes',
      }),
    );

    expect(summary.osta.index).toBe(-1.4);
    expect(summary.osta.level).toBe('medium');
    expect(summary.iof.positiveCount).toBe(2);
    expect(summary.mainResult.label).toBe('已有部分风险因素');
    expect(summary.mainResult.actionLabel).toBe('查看改善建议');
    expect(summary.mainResult.note).toContain('新增风险因素');
  });

  it('upgrades the main result when a key IOF alert item is hit', () => {
    const summary = getBoneAssessmentResultSummary(
      createBoneAssessmentAnswers({
        age: '46',
        heightCm: '160',
        weightKg: '56',
        boneAdultFragilityFracture: 'yes',
      }),
    );

    expect(summary.iof.keyAlerts).toContain('成年后曾发生轻微外力骨折');
    expect(summary.mainResult.label).toBe('建议尽快做专业评估');
    expect(summary.iof.keyAlertDetails).toContain(
      '这是一项需要优先重视的骨折风险信号，建议尽快就医评估骨密度和骨折风险。骨质疏松常表现为轻微跌倒或碰撞后骨折。',
    );
    expect(summary.mainResult.actionLabel).toBe('尽快安排评估');
  });

  it('upgrades vitamin D risk to high when symptom escalation items are selected', () => {
    const summary = getBoneAssessmentResultSummary(
      createBoneAssessmentAnswers({
        age: '35',
        heightCm: '162',
        weightKg: '52',
        vdBoneMuscleDiscomfort: 'yes',
      }),
    );

    expect(summary.vitaminD.positiveCount).toBe(1);
    expect(summary.vitaminD.level).toBe('high');
    expect(summary.vitaminD.keyFactors).toContain('近期骨痛、肌肉酸痛或无力');
    expect(summary.vitaminD.summary).toContain('共有 1 项回答“是”');
    expect(summary.vitaminD.detail).toContain('较高的维生素D缺乏可能');
    expect(summary.vitaminD.highlightedFactors).toContain('近期骨痛、肌肉酸痛或无力');
    expect(summary.vitaminD.disclaimer).toContain('不能替代医学诊断');
  });

  it('includes bmi driven vitamin d factor copy, grouped summary, and all matched tips', () => {
    const summary = getBoneAssessmentResultSummary(
      createBoneAssessmentAnswers({
        age: '44',
        heightCm: '160',
        weightKg: '76',
        vdSunExposureUnder20Min: 'yes',
        vdStrictSunProtection: 'yes',
        vdMostlyIndoor: 'yes',
        vdDietLack: 'yes',
      }),
    );

    expect(summary.vitaminD.positiveCount).toBe(5);
    expect(summary.vitaminD.level).toBe('medium');
    expect(summary.vitaminD.keyFactors).toContain('BMI 超过 28，体重状态可能影响维生素D利用');
    expect(summary.vitaminD.groupSummary).toContain('日晒不足和饮食摄入不足');
    expect(summary.vitaminD.improvementTips).toHaveLength(5);
    expect(summary.vitaminD.improvementTips).toContain(
      '建议结合饮食调整和规律运动逐步控制体重，因为体脂偏高可能影响维生素D在体内的利用和分布。',
    );
  });
});
