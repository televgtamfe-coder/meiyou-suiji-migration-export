import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/assessmentResultStorage';

describe('assessment result routes', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('redirects the main assessment result route back to scene1 when no latest completed result exists', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-assessment-result-route-shell')).not.toBeInTheDocument();
  });

  it('renders the main assessment result route from the stored latest completed result', () => {
    window.localStorage.setItem(
      SCENE1_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          age: '46',
          heightCm: '160',
          weightKg: '55',
          periodPresence: 'yes',
          cycleChange: 'shorter',
          cycleAbsentDuration: '',
          volumeChange: 'same',
          lastPeriodDate: '2026-05-01',
          lastPeriodQuickOption: '',
          ovarianFailure: 'no',
          surgeryHistory: 'none',
          hormonalContraception: 'no',
          hormoneReplacementTherapy: 'no',
          kmiHotFlashes: '1',
          kmiParesthesia: '0',
          kmiInsomnia: '1',
          kmiNervousness: '1',
          kmiMelancholia: '0',
          kmiVertigo: '0',
          kmiFatigue: '0',
          kmiJointPain: '0',
          kmiHeadache: '0',
          kmiPalpitations: '0',
          kmiFormication: '0',
          kmiSexualImpact: '0',
          kmiUrinarySymptoms: '0',
        },
        completedAt: '2026-06-08T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-summary-card')).toBeInTheDocument();
  });

  it('redirects the bone assessment result route to its questionnaire when no latest result exists', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-bone-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-bone-assessment-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-bone-assessment-result-route-shell')).not.toBeInTheDocument();
  });

  it('redirects the exercise assessment result route to its questionnaire when no latest result exists', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-exercise-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-exercise-assessment-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-exercise-assessment-result-route-shell')).not.toBeInTheDocument();
  });

  it('redirects the phq9 assessment result route to its questionnaire when no latest result exists', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-phq9-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-phq9-assessment-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-phq9-assessment-result-route-shell')).not.toBeInTheDocument();
  });

  it('redirects the gad7 assessment result route to its questionnaire when no latest result exists', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-gad7-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-gad7-assessment-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-gad7-assessment-result-route-shell')).not.toBeInTheDocument();
  });
});
