import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_PHQ9_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/phq9-assessment/phq9AssessmentStorage';

describe('phq9 assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the phq9 questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-phq9-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-phq9-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-phq9-assessment-shell')).toBeInTheDocument();
    expect(screen.getByText('PHQ-9 抑郁评估')).toBeInTheDocument();
    expect(screen.getByText('请回顾过去两周，选择每种情况出现的频率。')).toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 3')).toBeInTheDocument();
    expect(screen.getByText('做事时提不起劲或没有兴趣')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeDisabled();
  });

  it('renders the phq9 result preview route shell with personalized feedback and risk alert', () => {
    window.localStorage.setItem(
      SCENE1_PHQ9_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          phq9LittleInterest: '2',
          phq9LowMood: '2',
          phq9SleepProblem: '2',
          phq9Fatigue: '2',
          phq9AppetiteChange: '1',
          phq9Worthlessness: '1',
          phq9Concentration: '0',
          phq9PsychomotorChange: '0',
          phq9SelfHarmThought: '1',
        },
        completedAt: '2026-06-05T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-phq9-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-phq9-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-phq9-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getByText('你的 PHQ-9 抑郁评估已完成')).toBeInTheDocument();
    expect(screen.getByText('中度抑郁')).toBeInTheDocument();
    expect(screen.getByText(/伤害自己或“不如消失”的念头/)).toBeInTheDocument();
    expect(screen.getByText(/兴趣和动力/)).toBeInTheDocument();
    expect(screen.getByText(/您的睡眠可能已受到情绪影响/)).toBeInTheDocument();
  });
});
