import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 ui', () => {
  it('renders the calendar-first scene1 chrome', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7acb\u5373\u8bc4\u4f30' }));

    expect(screen.getByTestId('scene1-calendar-month-button')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-weekdays')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-legend')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-list')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-love-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-symptom-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-mood-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-discharge-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-temp-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-weight-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-diary-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-habit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-perimenopause-mode-entry-button')).toBeInTheDocument();
  });

  it('renders a text-only analysis entry in the record top bar', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));

    const analysisEntry = screen.getByRole('button', { name: '\u5206\u6790' });

    expect(analysisEntry).toHaveTextContent(/^\u5206\u6790$/);
  });

  it('renders the exit button on the perimenopause route', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-perimenopause-mode-exit-button')).toBeInTheDocument();
  });

  it('toggles the perimenopause symptom panel from expanded to collapsed and back', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-perimenopause-symptom-panel')).toBeInTheDocument();
    expect(screen.getByText('\u7761\u7720\u95ee\u9898')).toBeInTheDocument();
    expect(screen.getByText('\u8111\u96fe')).toBeInTheDocument();
    expect(screen.getByText('\u80c3\u53e3\u53d8\u5316')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '\u5df2\u5c55\u5f00' }));
    expect(screen.queryByTestId('scene1-perimenopause-symptom-panel')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '\u5c55\u5f00\u75c7\u72b6' }));
    expect(screen.getByTestId('scene1-perimenopause-symptom-panel')).toBeInTheDocument();
  });

  it('shows a green check on a perimenopause symptom after tapping it', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const hotFlashesToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHotFlashes');

    expect(within(hotFlashesToggle).queryByTestId('scene1-perimenopause-kmi-check')).not.toBeInTheDocument();

    await user.click(hotFlashesToggle);

    expect(within(hotFlashesToggle).getByTestId('scene1-perimenopause-kmi-check')).toBeInTheDocument();
  });

  it('renders different icon assets for symptoms that share one KMI field', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const hotFlashesToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHotFlashes');
    const sweatingToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-symptom-sweating');
    const hotFlashesIcon = hotFlashesToggle.querySelector('img');
    const sweatingIcon = sweatingToggle.querySelector('img');

    expect(hotFlashesIcon).not.toBeNull();
    expect(sweatingIcon).not.toBeNull();
    expect(hotFlashesIcon?.getAttribute('src')).not.toBe(sweatingIcon?.getAttribute('src'));
  });

  it('renders the symptom action bar at the bottom of the perimenopause panel', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const panel = screen.getByTestId('scene1-perimenopause-symptom-panel');
    const actionBar = within(panel).getByTestId('scene1-perimenopause-symptom-action-bar');

    expect(actionBar).toBeInTheDocument();
    expect(within(actionBar).getByRole('button', { name: '取消' })).toBeInTheDocument();
    expect(within(actionBar).queryByText('症状')).not.toBeInTheDocument();
    expect(within(actionBar).getByRole('button', { name: '确定' })).toBeInTheDocument();
  });

  it('opens a compact tip modal after confirming symptom selection', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '确定' }));

    expect(screen.getByTestId('scene1-perimenopause-tip-modal')).toBeInTheDocument();
    expect(screen.getByText('坚持记录14天 掌握你的身体变化')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '关闭提示' })).toBeInTheDocument();
  });

  it('auto closes the tip modal after 2 seconds', async () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={['/scene1-perimenopause']}>
          <AppRouter />
        </MemoryRouter>,
      );

      act(() => {
        screen.getByRole('button', { name: '\u786e\u5b9a' }).click();
      });

      expect(screen.getByTestId('scene1-perimenopause-tip-modal')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(screen.queryByTestId('scene1-perimenopause-tip-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('scene1-perimenopause-symptom-panel')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders the parenting page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-parenting']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-parenting-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-profile-panel')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-quick-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-family-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-record-section')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-record-list')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-mode-switch')).toBeInTheDocument();
  });

  it('renders the prep page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-prep']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-prep-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-chance-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-record-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-tools-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-ad-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-article-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-checkin-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-knowledge-pill')).toBeInTheDocument();
  });

  it('renders the pregnancy page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-pregnancy']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-main-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-quick-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-changes-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-services-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-article-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-checkin-card')).toBeInTheDocument();
  });

  it('navigates to the parenting page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));
    await user.click(screen.getByRole('button', { name: '\u80b2\u513f' }));

    expect(screen.getByTestId('scene1-parenting-shell')).toBeInTheDocument();
  });

  it('navigates to the pregnancy page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '怀孕' }));

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
  });

  it('navigates to the prep page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));
    await user.click(screen.getByRole('button', { name: '\u5907\u5b55' }));

    expect(screen.getByTestId('scene1-prep-shell')).toBeInTheDocument();
  });
});
