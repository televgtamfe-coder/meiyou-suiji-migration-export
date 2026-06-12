import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_PSQI_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/psqi-assessment/psqiAssessmentStorage';

describe('psqi assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the psqi questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-psqi-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-psqi-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-psqi-assessment-shell')).toBeInTheDocument();
    expect(screen.getAllByText(/PSQI/).length).toBeGreaterThan(0);
  });

  it('renders the psqi result preview route shell', () => {
    window.localStorage.setItem(
      SCENE1_PSQI_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          psqiBedTime: '22:30',
          psqiSleepLatencyMinutes: '70',
          psqiWakeTime: '06:00',
          psqiSleepDurationHours: '4.5',
          psqiSleepDisturbanceFallingAsleep: '3',
          psqiSleepDisturbanceWakeUp: '2',
          psqiSleepDisturbanceBathroom: '2',
          psqiSleepDisturbanceBreathing: '2',
          psqiSleepDisturbanceSnoring: '2',
          psqiSleepDisturbanceCold: '2',
          psqiSleepDisturbanceHot: '2',
          psqiSleepDisturbanceDreams: '2',
          psqiSleepDisturbancePain: '2',
          psqiSleepDisturbanceOther: '2',
          psqiSleepDisturbanceOtherText: '',
          psqiSubjectiveQuality: '3',
          psqiSleepMedication: '2',
          psqiDaytimeSleepiness: '2',
          psqiDaytimeEnthusiasm: '2',
        },
        completedAt: '2026-06-08T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-psqi-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-psqi-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-psqi-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-psqi-assessment-result-component-feedback')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-psqi-assessment-result-component-feedback-sleepLatency')).toBeInTheDocument();
    expect(screen.getAllByText(/PSQI/).length).toBeGreaterThan(0);
  });
});
