import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SceneControls } from '../../dev/SceneControls';
import {
  Scene1AssessmentState,
  answerAssessmentField,
  closeAssessmentFlow,
  createAssessmentState,
  createAssessmentStateWithoutEntry,
  dismissEntryModal,
  exitAssessmentFlow,
  openAssessmentFlow,
} from './assessmentState';
import { AssessmentFieldKey } from './assessmentSteps';
import { PerimenopauseAssessmentShell } from './components/PerimenopauseAssessmentShell';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { PerimenopauseEntryModal } from './components/PerimenopauseEntryModal';
import { PeriodDropletIcon } from './components/PeriodDropletIcon';
import { FloatingAnalysisNotice } from './components/FloatingAnalysisNotice';
import { StatusBar } from './components/StatusBar';
import { getKmiScoreSummary, pickCompletedKmiAnswers } from './kmiScoring';
import { writeScene1KmiScore } from './kmiScoreStorage';
import { kmiRules } from './kmiRules';
import { perimenopauseSymptomIconMap } from './perimenopauseSymptomIcons';
import { calendarDays, calendarWeekdays, legendItems, quickRecordItems, scene1Modes } from './scene1Data';
import { confirmPeriodStart, createScene1State, selectScene1Mode } from './scene1State';

type Scene1PageProps = {
  routeVariant?: 'default' | 'perimenopause';
};

type QuickRecordItem = (typeof quickRecordItems)[number];

const PERIMENOPAUSE_MODE_TITLE = '围绝经期模式';

const CALENDAR_MONTH_LABEL = '4月';

function chunkKmiRows<T>(items: T[], columnCount = 4): Array<Array<T | null>> {
  const rows: Array<Array<T | null>> = [];

  for (let cursor = 0; cursor < items.length; cursor += columnCount) {
    const row = items.slice(cursor, cursor + columnCount) as Array<T | null>;

    while (row.length < columnCount) {
      row.push(null);
    }

    rows.push(row);
  }

  return rows;
}

function MoodSmileIcon() {
  return (
    <svg
      data-testid="scene1-record-mood-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#FFC300" />
      <circle cx="7.5" cy="9" r="1.5" fill="#FFFFFF" />
      <circle cx="16.5" cy="9" r="1.5" fill="#FFFFFF" />
      <path
        d="M7 14.2C8.1 16 9.9 17 12 17C14.1 17 15.9 16 17 14.2"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoveHeartIcon() {
  return (
    <svg
      data-testid="scene1-record-love-icon"
      width="27"
      height="24"
      viewBox="0 0 27 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.5 24C12.2 24 10.91 23.53 9.9 22.59C5.31 18.41 0 14.12 0 8.25C0 3.59 3.66 0 8.42 0C10.22 0 11.96 0.59 13.39 1.69C13.43 1.72 13.47 1.75 13.5 1.78C13.54 1.75 13.58 1.72 13.61 1.69C15.04 0.59 16.78 0 18.58 0C23.34 0 27 3.59 27 8.25C27 14.12 21.69 18.41 17.1 22.59C16.09 23.53 14.8 24 13.5 24Z"
        fill="#FF7FB5"
      />
      <path
        d="M13.5 6.8C11.73 6.8 10.3 8.23 10.3 10C10.3 11.23 10.99 12.3 12 12.84V15.35C12 16.18 12.67 16.85 13.5 16.85C14.33 16.85 15 16.18 15 15.35V12.84C16.01 12.3 16.7 11.23 16.7 10C16.7 8.23 15.27 6.8 13.5 6.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function SymptomFolderIcon() {
  return (
    <svg
      data-testid="scene1-record-symptom-icon"
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.4 6.25C3.4 4.45 4.86 3 6.66 3H11.48C12.31 3 13.1 3.32 13.69 3.9L14.92 5.12C15.3 5.5 15.82 5.72 16.36 5.72H21.35C23.34 5.72 24.95 7.33 24.95 9.32V17.35C24.95 19.34 23.34 20.95 21.35 20.95H6.65C4.86 20.95 3.4 19.5 3.4 17.7V6.25Z"
        fill="#55B8F7"
      />
      <path
        d="M3.85 7.5H24.5V17.1C24.5 19.03 22.93 20.6 21 20.6H7.35C5.42 20.6 3.85 19.03 3.85 17.1V7.5Z"
        fill="#7ED0FF"
      />
      <circle cx="13.95" cy="14.1" r="4.45" fill="#DDF4FF" />
      <path d="M13.95 11.85V16.35" stroke="#6CB7E8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11.7 14.1H16.2" stroke="#6CB7E8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DischargeIcon() {
  return (
    <svg
      data-testid="scene1-record-discharge-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene1-discharge-gradient" x1="4" x2="20" y1="4" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C98BFF" />
          <stop offset="1" stopColor="#8D4DFF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#scene1-discharge-gradient)" />
      <path
        d="M7.7 7.2H16.3C16.7 7.2 16.96 7.63 16.77 7.98L13.58 13.7C13.45 13.92 13.38 14.16 13.38 14.41V16.68C13.38 16.93 13.23 17.15 13 17.25L11.46 17.92C11.06 18.09 10.62 17.79 10.62 17.35V14.41C10.62 14.16 10.55 13.92 10.42 13.7L7.23 7.98C7.04 7.63 7.3 7.2 7.7 7.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function WeightScaleIcon() {
  return (
    <svg
      data-testid="scene1-record-weight-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene1-weight-gradient" x1="4" x2="20" y1="4" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C78CFF" />
          <stop offset="1" stopColor="#8F52FF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#scene1-weight-gradient)" />
      <path
        d="M7 10.6C7 8.2 8.95 6.25 11.35 6.25H12.65C15.05 6.25 17 8.2 17 10.6V12.15C17 12.67 16.58 13.1 16.05 13.1H7.95C7.42 13.1 7 12.67 7 12.15V10.6Z"
        fill="#F8D9FF"
      />
      <path d="M12 9.4L14.15 8.55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="9.4" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

function DiaryCardIcon() {
  return (
    <svg
      data-testid="scene1-record-diary-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#F4BC00" />
      <rect x="14.6" y="4.6" width="4" height="5.8" rx="1.4" fill="#FFF0A6" />
      <rect x="5.5" y="14.1" width="10.5" height="2" rx="1" fill="#FFF7C8" />
      <rect x="5.5" y="17.7" width="12.6" height="2" rx="1" fill="#FFF7C8" />
    </svg>
  );
}

function HabitFolderIcon() {
  return (
    <svg
      data-testid="scene1-record-habit-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 6.3C3.2 4.48 4.68 3 6.5 3H10.05C10.84 3 11.6 3.31 12.16 3.86L13.1 4.8C13.48 5.18 13.99 5.4 14.52 5.4H18.15C19.97 5.4 21.45 6.88 21.45 8.7V17.5C21.45 19.32 19.97 20.8 18.15 20.8H6.5C4.68 20.8 3.2 19.32 3.2 17.5V6.3Z"
        fill="#66CCFF"
      />
      <path
        d="M3.7 7.4H20.95V17.15C20.95 18.95 19.49 20.4 17.7 20.4H6.95C5.16 20.4 3.7 18.95 3.7 17.15V7.4Z"
        fill="#8DDCFF"
      />
      <path
        d="M12 16.95C11.32 16.95 10.64 16.7 10.12 16.2C7.86 14.14 5.25 12.02 5.25 9.12C5.25 6.82 7.05 5.05 9.39 5.05C10.28 5.05 11.13 5.34 11.84 5.88L12 6.01L12.16 5.88C12.87 5.34 13.72 5.05 14.61 5.05C16.95 5.05 18.75 6.82 18.75 9.12C18.75 12.02 16.14 14.14 13.88 16.2C13.36 16.7 12.68 16.95 12 16.95Z"
        fill="#E6F7FF"
      />
    </svg>
  );
}

function TempThermometerIcon() {
  return (
    <svg
      data-testid="scene1-record-temp-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="scene1-temp-gradient" x1="0" x2="24" y1="0" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C38DFF" />
          <stop offset="1" stopColor="#8F57FF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="4" fill="url(#scene1-temp-gradient)" />
      <path
        d="M9.6 5.2a2 2 0 0 1 4 0v7.08a3.9 3.9 0 1 1-4 0V5.2Z"
        fill="#FFFFFF"
      />
      <rect x="10.9" y="6.2" width="1.4" height="8.3" rx="0.7" fill="#C38DFF" />
      <circle cx="11.6" cy="15.6" r="1.8" fill="#C38DFF" />
      <rect x="16.7" y="7.2" width="3.2" height="1.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.9" />
      <rect x="16.7" y="10.2" width="2.4" height="1.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  );
}

function RecordRow({
  item,
  periodConfirmed,
  onConfirmPeriodStart,
  rightSlot,
  children,
  expanded = false,
}: {
  item: QuickRecordItem;
  periodConfirmed: boolean;
  onConfirmPeriodStart: () => void;
  rightSlot?: ReactNode;
  children?: ReactNode;
  expanded?: boolean;
}) {
  return (
      <div
        data-testid={`scene1-record-row-${item.id}`}
        className={`record-list-row-shell${expanded ? ' record-list-row-shell-expanded' : ''}`}
      >
        <div className={`record-list-row record-list-row-${item.id}${expanded ? ' record-list-row-expanded' : ''}`}>
        <div
          data-testid={item.id === 'period' ? 'scene1-record-period-icon-shell' : undefined}
          className={`record-list-icon record-list-icon-${item.id}`}
        >
          {item.id === 'period' ? (
            <PeriodDropletIcon
              testId="scene1-record-period-icon"
              gradientId="scene1-record-period-gradient"
              highlightId="scene1-record-period-highlight"
            />
          ) : null}
          {item.id === 'love' ? <LoveHeartIcon /> : null}
          {item.id === 'symptom' ? <SymptomFolderIcon /> : null}
          {item.id === 'mood' ? <MoodSmileIcon /> : null}
          {item.id === 'discharge' ? <DischargeIcon /> : null}
          {item.id === 'weight' ? <WeightScaleIcon /> : null}
          {item.id === 'diary' ? <DiaryCardIcon /> : null}
          {item.id === 'habit' ? <HabitFolderIcon /> : null}
          {item.id === 'temp' ? <TempThermometerIcon /> : null}
          {item.id !== 'period' &&
          item.id !== 'mood' &&
          item.id !== 'love' &&
          item.id !== 'symptom' &&
          item.id !== 'discharge' &&
          item.id !== 'weight' &&
          item.id !== 'diary' &&
          item.id !== 'habit' &&
          item.id !== 'temp'
            ? item.icon
            : null}
        </div>
        <div className="record-list-label">{item.label}</div>
        <div className="record-list-right">
          {rightSlot ?? (
            <>
              {item.kind === 'toggle' ? (
                <div className="record-toggle">
                  <button
                    type="button"
                    className={periodConfirmed ? 'active' : ''}
                    aria-label="是"
                    onClick={onConfirmPeriodStart}
                  >
                    是
                  </button>
                  <button type="button" className={!periodConfirmed ? 'active' : ''} aria-label="否">
                    否
                  </button>
                </div>
              ) : null}
              {item.kind === 'plus' ? <div className="record-plus">+</div> : null}
              {item.kind === 'moods' ? (
                <>
                  <div className="record-moods">
                    {item.moods.map((mood) => (
                      <div key={mood} className="record-mood">
                        {mood}
                      </div>
                    ))}
                  </div>
                  <div className="record-plus">+</div>
                </>
              ) : null}
              {item.kind === 'text' ? <div className="record-text-suffix">{item.trailingText}</div> : null}
              {item.kind === 'badges' ? (
                <div className="record-badge-group">
                  {item.badges.map((badge) => (
                    <div key={badge} className="record-badge">
                      {badge}
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function PerimenopauseRecordList({
  periodConfirmed,
  onConfirmPeriodStart,
}: {
  periodConfirmed: boolean;
  onConfirmPeriodStart: () => void;
}) {
  const kmiRows = chunkKmiRows(kmiRules);

  return (
    <div className="record-list record-list-perimenopause" data-testid="scene1-record-list">
      <div className="scene1-perimenopause-intro">
        <h2>{PERIMENOPAUSE_MODE_TITLE}</h2>
      </div>

      {quickRecordItems.map((item) => {
        if (item.id === 'symptom') {
          return (
            <RecordRow
              key={item.id}
              item={item}
              periodConfirmed={periodConfirmed}
              onConfirmPeriodStart={onConfirmPeriodStart}
              expanded
              rightSlot={<span className="scene1-perimenopause-open-state">已展开</span>}
            >
              <div className="scene1-perimenopause-symptom-panel">
                {kmiRows.map((row, rowIndex) => (
                  <div
                    key={`scene1-perimenopause-row-${rowIndex}`}
                    data-testid="scene1-perimenopause-grid-row"
                    className="scene1-perimenopause-grid-row"
                  >
                    {row.map((rule, columnIndex) => {
                      if (!rule) {
                        return (
                          <div
                            key={`scene1-perimenopause-placeholder-${rowIndex}-${columnIndex}`}
                            data-testid="scene1-perimenopause-kmi-placeholder"
                            className="scene1-perimenopause-kmi-item scene1-perimenopause-kmi-item-placeholder"
                            aria-hidden="true"
                          />
                        );
                      }

                      return (
                        <div
                          key={rule.field}
                          data-testid="scene1-perimenopause-kmi-item"
                          className={`scene1-perimenopause-kmi-item scene1-perimenopause-kmi-item-${rule.field}`}
                        >
                          <div className="scene1-perimenopause-kmi-icon-slot">
                            <img
                              src={perimenopauseSymptomIconMap[rule.field]}
                              alt=""
                              aria-hidden="true"
                              data-testid="scene1-perimenopause-kmi-icon"
                              data-kmi-field={rule.field}
                              className={`scene1-perimenopause-kmi-icon scene1-perimenopause-kmi-icon-${rule.field}`}
                            />
                          </div>
                          <span className="scene1-perimenopause-kmi-label">{rule.label}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </RecordRow>
          );
        }

        return (
          <RecordRow
            key={item.id}
            item={item}
            periodConfirmed={periodConfirmed}
            onConfirmPeriodStart={onConfirmPeriodStart}
          />
        );
      })}
    </div>
  );
}

export function Scene1Page({ routeVariant = 'default' }: Scene1PageProps) {
  const navigate = useNavigate();
  const [state, setState] = useState(createScene1State);
  const [assessmentState, setAssessmentState] = useState(() =>
    routeVariant === 'perimenopause' ? createAssessmentStateWithoutEntry() : createAssessmentState()
  );
  const overlayActive = assessmentState.entryModalOpen || assessmentState.assessmentOpen;
  const isPerimenopauseRoute = routeVariant === 'perimenopause';

  function handleAssessmentAnswer(field: AssessmentFieldKey, value: string) {
    setAssessmentState((prev) => answerAssessmentField(prev, field, value));
  }

  function handleAssessmentStateChange(nextState: Scene1AssessmentState) {
    if (nextState.completed) {
      const summary = getKmiScoreSummary(pickCompletedKmiAnswers(nextState.answers));
      writeScene1KmiScore(summary.total);
    }

    setAssessmentState(nextState);
  }

  return (
    <div data-testid={isPerimenopauseRoute ? 'scene1-perimenopause-route-shell' : 'scene-route-shell'} className="scene1-calendar-page">
      <StatusBar />

      <div className={overlayActive ? 'scene1-base-layer scene1-base-layer-hidden' : 'scene1-base-layer'} aria-hidden={overlayActive}>
        <div className="calendar-shell">
          <div className="calendar-topbar prototype-topbar">
            <button
              type="button"
              data-testid="scene1-calendar-month-button"
              className="prototype-month-button"
              aria-label={`${CALENDAR_MONTH_LABEL} 月份`}
            >
              <span className="prototype-month-arrow" aria-hidden="true">
                &#8249;
              </span>
              <span className="calendar-month prototype-month">{CALENDAR_MONTH_LABEL}</span>
            </button>
            <div className="mode-tabs prototype-mode-tabs" role="tablist" aria-label="模式切换">
              {scene1Modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={state.selectedMode === mode ? 'mode-tab prototype-mode-tab active' : 'mode-tab prototype-mode-tab'}
                  onClick={() => setState((prev) => selectScene1Mode(prev, mode))}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button type="button" className="prototype-analysis-entry" aria-label="分析">
              <span className="analysis-entry-icon">⌁</span>
              <span>分析</span>
            </button>
          </div>

          <div className="scene1-calendar-stage">
            <div data-testid="scene1-calendar-card" className="prototype-calendar-card">
              <div data-testid="scene1-calendar-weekdays" className="prototype-weekdays">
                {calendarWeekdays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              {calendarDays.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="calendar-week-row">
                  {row.map((cell, cellIndex) => {
                    if (!cell) {
                      return (
                        <div key={`empty-${rowIndex}-${cellIndex}`} className="calendar-day empty">
                          <div className="prototype-day-num" />
                        </div>
                      );
                    }

                    const classes = ['calendar-day', cell.cls, cell.today ? 'today' : ''].filter(Boolean).join(' ');

                    return (
                      <div key={`${rowIndex}-${cell.n}`} className={classes}>
                        <div className="prototype-day-num">
                          {cell.n}
                          {cell.today ? <span className="today-badge">今天</span> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div data-testid="scene1-calendar-legend" className="prototype-legend">
              {legendItems.map((item) => (
                <span key={item.label} className="prototype-legend-item">
                  <span className={item.swatchClass} />
                  {item.label}
                </span>
              ))}
              <span className="legend-arrow">›</span>
            </div>

            <button
              type="button"
              className={`scene1-mode-switch${isPerimenopauseRoute ? ' scene1-mode-switch-exit' : ''}`}
              aria-label={isPerimenopauseRoute ? '退出围绝经期' : '进入围绝经期模式'}
              onClick={() => navigate(isPerimenopauseRoute ? '/scene1' : '/scene1-perimenopause')}
            >
              {isPerimenopauseRoute ? '退出围绝经期' : '进入围绝经期模式'}
            </button>
          </div>

          {isPerimenopauseRoute ? (
            <PerimenopauseRecordList
              periodConfirmed={state.periodConfirmed}
              onConfirmPeriodStart={() => setState((prev) => confirmPeriodStart(prev))}
            />
          ) : (
            <div className="record-list" data-testid="scene1-record-list">
              {quickRecordItems.map((item) => (
                <RecordRow
                  key={item.id}
                  item={item}
                  periodConfirmed={state.periodConfirmed}
                  onConfirmPeriodStart={() => setState((prev) => confirmPeriodStart(prev))}
                />
              ))}
            </div>
          )}
        </div>

        <FloatingAnalysisNotice
          show={state.showAnalysisNotice}
          text="结合近期记录，已为你生成周期状态分析"
          onOpen={() => navigate('/record')}
        />

        <Scene1BottomTabBar activeTab="record" />

        <SceneControls onShowAnalysis={() => setState((prev) => ({ ...prev, showAnalysisNotice: true }))} />
      </div>

      <PerimenopauseEntryModal
        open={assessmentState.entryModalOpen}
        onStart={() => setAssessmentState((prev) => openAssessmentFlow(prev))}
        onDismiss={() => setAssessmentState((prev) => dismissEntryModal(prev))}
      />

      <PerimenopauseAssessmentShell
        state={assessmentState}
        onAnswer={handleAssessmentAnswer}
        onClose={() => setAssessmentState(closeAssessmentFlow())}
        onReturnToScene1={() => setAssessmentState((prev) => exitAssessmentFlow(prev))}
        onEnterPerimenopauseMode={() => {
          setAssessmentState((prev) => exitAssessmentFlow(prev));
          navigate('/scene1-perimenopause');
        }}
        onNext={handleAssessmentStateChange}
        onPrevious={handleAssessmentStateChange}
      />
    </div>
  );
}
