import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_EMQ_R13_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/emq-r13-assessment/emqR13AssessmentStorage';

describe('emq-r13 assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the emq-r13 questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-emq-r13-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-emq-r13-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-emq-r13-assessment-shell')).toBeInTheDocument();
    expect(screen.getByText('EMQ-R13 记忆评估')).toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeDisabled();
  });

  it('renders the emq-r13 result preview route shell with subscale feedback', () => {
    window.localStorage.setItem(
      SCENE1_EMQ_R13_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          emqR13CheckDone: '2',
          emqR13TimeOrder: '2',
          emqR13ToldByOthers: '2',
          emqR13TipOfTongue: '2',
          emqR13ForgetPlanned: '2',
          emqR13ForgetDetails: '2',
          emqR13ForgetPassingInfo: '1',
          emqR13ForgetJustSaid: '2',
          emqR13LoseStoryline: '2',
          emqR13MixDetails: '2',
          emqR13RepeatSelf: '1',
          emqR13RereadWithoutRealizing: '0',
          emqR13MisplaceItems: '0',
        },
        completedAt: '2026-06-16T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-emq-r13-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-emq-r13-assessment-result-route-shell')).toBeInTheDocument();
    const resultCard = screen.getByTestId('scene1-emq-r13-assessment-result-main-card');

    expect(resultCard).toBeInTheDocument();
    expect(screen.getByText('建议持续跟踪')).toBeInTheDocument();
    expect(within(resultCard).getByText(/^EMQ-R13 总分 /)).toBeInTheDocument();
    expect(within(resultCard).getByText('记忆提取')).toBeInTheDocument();
    expect(within(resultCard).getByText('注意追踪')).toBeInTheDocument();
  });
});
