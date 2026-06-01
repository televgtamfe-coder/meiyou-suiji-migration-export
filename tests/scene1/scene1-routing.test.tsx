import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { perimenopauseSymptomIconMap } from '../../src/scenes/scene1/perimenopauseSymptomIcons';
import {
  perimenopauseSymptomItemCount,
  perimenopauseSymptomSections,
} from '../../src/scenes/scene1/perimenopauseSymptomSections';

describe('scene1 routing', () => {
  it('navigates from the prototype analysis notice to the record detail page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '是' }));
    await user.click(screen.getByRole('button', { name: '查看分析' }));

    expect(screen.getByRole('heading', { level: 1, name: '记录详情' })).toBeInTheDocument();
    expect(screen.getAllByText('经期记录已同步到周期分析').length).toBeGreaterThan(0);
  });

  it('shows the perimenopause symptom panel and exits back to the normal scene1 page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene1-perimenopause-route-shell')).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: '开启您的围绝经期健康评估' })).not.toBeInTheDocument();
    expect(screen.getByTestId('scene1-perimenopause-mode-exit-button')).toBeInTheDocument();
    expect(screen.queryByText('最近的月经周期有什么变化')).not.toBeInTheDocument();
    expect(screen.queryByText('（记录数据读取，无记录数据填写）')).not.toBeInTheDocument();
    expect(screen.getByText('症状')).toBeInTheDocument();
    expect(screen.getAllByTestId('scene1-perimenopause-symptom-section')).toHaveLength(
      perimenopauseSymptomSections.length,
    );
    expect(screen.getAllByTestId('scene1-perimenopause-kmi-item')).toHaveLength(perimenopauseSymptomItemCount);
    expect(screen.getAllByTestId('scene1-perimenopause-kmi-icon')).toHaveLength(perimenopauseSymptomItemCount);

    for (const section of perimenopauseSymptomSections) {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    }

    expect(screen.getByText('脑雾')).toBeInTheDocument();
    expect(screen.getByText('阴道灼热')).toBeInTheDocument();
    expect(screen.getByText('胃口变化')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '退出围绝经期' }));

    expect(screen.getByTestId('scene-route-shell')).toBeInTheDocument();
    expect(screen.queryByTestId('scene1-perimenopause-route-shell')).not.toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: '开启您的围绝经期健康评估' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    expect(screen.getByRole('button', { name: '进入围绝经期模式' })).toBeInTheDocument();
  });

  it('lets the user enter perimenopause mode directly from the normal scene1 calendar page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '进入围绝经期模式' }));

    expect(screen.getByTestId('scene1-perimenopause-route-shell')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '退出围绝经期' })).toBeInTheDocument();
  });
  it('uses distinct replacement assets for the repeated-looking KMI symptoms', () => {
    expect(perimenopauseSymptomIconMap.kmiHotFlashes).toContain('hot-flashes');
    expect(perimenopauseSymptomIconMap.kmiMelancholia).toContain('melancholia-alt');
    expect(perimenopauseSymptomIconMap.kmiVertigo).toContain('vertigo-alt');
    expect(perimenopauseSymptomIconMap.kmiPalpitations).toContain('palpitations-alt');

    expect(perimenopauseSymptomIconMap.kmiMelancholia).not.toBe(perimenopauseSymptomIconMap.kmiHotFlashes);
    expect(perimenopauseSymptomIconMap.kmiVertigo).not.toBe(perimenopauseSymptomIconMap.kmiHotFlashes);
    expect(perimenopauseSymptomIconMap.kmiPalpitations).not.toBe(perimenopauseSymptomIconMap.kmiHotFlashes);
  });

  it('adds field-specific sizing hooks for insomnia and nervousness icons', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>
    );

    const insomniaIcon = container.querySelector('[data-kmi-field="kmiInsomnia"]');
    const nervousnessIcon = container.querySelector('[data-kmi-field="kmiNervousness"]');

    expect(insomniaIcon).not.toBeNull();
    expect(nervousnessIcon).not.toBeNull();
    expect(insomniaIcon).toHaveClass(
      'scene1-perimenopause-kmi-icon-kmiInsomnia'
    );
    expect(nervousnessIcon).toHaveClass(
      'scene1-perimenopause-kmi-icon-kmiNervousness'
    );
  });

  it('lays out perimenopause symptoms in grouped sections', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('scene1-perimenopause-symptom-grid')).toHaveLength(
      perimenopauseSymptomSections.length,
    );
    expect(screen.getAllByTestId('scene1-perimenopause-symptom-section')).toHaveLength(
      perimenopauseSymptomSections.length,
    );
    expect(screen.getAllByTestId('scene1-perimenopause-kmi-item')).toHaveLength(
      perimenopauseSymptomItemCount,
    );
    expect(screen.queryByTestId('scene1-perimenopause-kmi-placeholder')).not.toBeInTheDocument();
  });
});
