import { describe, expect, it } from 'vitest';
import {
  calculateKmiScore,
  interpretKmiScore,
} from '../../src/scenes/scene1/kmiScoring';

describe('scene1 KMI scoring', () => {
  it('totals 63 when all 13 KMI answers are set to 3', () => {
    expect(
      calculateKmiScore({
        kmiHotFlashes: '3',
        kmiParesthesia: '3',
        kmiInsomnia: '3',
        kmiNervousness: '3',
        kmiMelancholia: '3',
        kmiVertigo: '3',
        kmiFatigue: '3',
        kmiJointPain: '3',
        kmiHeadache: '3',
        kmiPalpitations: '3',
        kmiFormication: '3',
        kmiSexualImpact: '3',
        kmiUrinarySymptoms: '3',
      })
    ).toBe(63);
  });

  it('maps score bands at the requested thresholds', () => {
    expect(interpretKmiScore(6).band).toBe('normal');
    expect(interpretKmiScore(7).band).toBe('mild');
    expect(interpretKmiScore(16).band).toBe('moderate');
    expect(interpretKmiScore(31).band).toBe('severe');
  });
});
