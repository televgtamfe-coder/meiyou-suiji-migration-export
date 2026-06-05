import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_GAD7_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/gad7-assessment/gad7AssessmentStorage';

describe('gad7 assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the gad7 questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-gad7-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-gad7-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-gad7-assessment-shell')).toBeInTheDocument();
    expect(screen.getByText('GAD-7 焦虑评估')).toBeInTheDocument();
    expect(screen.getByText('请回顾过去两周，选择每种情况出现的频率。')).toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 3')).toBeInTheDocument();
    expect(screen.getByText('感觉紧张、焦虑或急切')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeDisabled();
  });

  it('renders the gad7 result preview route shell with personalized feedback', () => {
    window.localStorage.setItem(
      SCENE1_GAD7_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          gad7Nervous: '2',
          gad7UncontrollableWorry: '2',
          gad7ExcessiveWorry: '2',
          gad7TroubleRelaxing: '2',
          gad7Restlessness: '1',
          gad7Irritability: '0',
          gad7FearSomethingAwful: '0',
        },
        completedAt: '2026-06-05T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-gad7-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-gad7-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-gad7-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getByText('你的 GAD-7 焦虑评估已完成')).toBeInTheDocument();
    expect(screen.getByText('轻度焦虑')).toBeInTheDocument();
    expect(screen.getByText(/整体处于较紧绷的状态/)).toBeInTheDocument();
    expect(screen.getByText(/不太容易靠意志压住/)).toBeInTheDocument();
    expect(screen.getByText(/开机/)).toBeInTheDocument();
  });
});
