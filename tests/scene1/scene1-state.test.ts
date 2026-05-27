import { describe, expect, it } from 'vitest';
import { confirmPeriodStart, createScene1State, dismissAnalysisNotice } from '../../src/scenes/scene1/scene1State';

describe('scene1 state', () => {
  it('starts on the calendar tab with analysis notice hidden', () => {
    const state = createScene1State();
    expect(state.activeTab).toBe('cal');
    expect(state.showAnalysisNotice).toBe(false);
    expect(state.periodConfirmed).toBe(false);
  });

  it('shows analysis notice after period start is confirmed', () => {
    const state = createScene1State();
    const next = confirmPeriodStart(state);
    expect(next.periodConfirmed).toBe(true);
    expect(next.showAnalysisNotice).toBe(true);
  });

  it('can dismiss the analysis notice without clearing the period flag', () => {
    const state = confirmPeriodStart(createScene1State());
    const next = dismissAnalysisNotice(state);
    expect(next.periodConfirmed).toBe(true);
    expect(next.showAnalysisNotice).toBe(false);
  });
});
