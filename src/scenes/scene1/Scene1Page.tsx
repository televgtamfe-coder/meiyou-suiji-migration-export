import { CSSProperties, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SceneControls } from '../../dev/SceneControls';
import {
  Scene1AssessmentState,
  answerAssessmentField,
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
import { resolvePerimenopauseSymptomIcon } from './perimenopauseSymptomItemIcons';
import { writeScene1HealthProfile } from './bone-assessment/boneAssessmentStorage';
import {
  PerimenopauseSymptomItemId,
  perimenopauseSymptomSections,
} from './perimenopauseSymptomSections';
import {
  Scene1MoodOptionId,
  calendarDays,
  calendarWeekdays,
  legendItems,
  quickRecordItems,
  scene1MoodGroups,
  scene1MoodPreviewItems,
  scene1Modes,
} from './scene1Data';
import { confirmPeriodStart, createScene1State, selectScene1Mode } from './scene1State';

type Scene1PageProps = {
  routeVariant?: 'default' | 'perimenopause';
};

type QuickRecordItem = (typeof quickRecordItems)[number];
type RectSnapshot = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type PreparedPerimenopauseDropItem = {
  id: PerimenopauseSymptomItemId;
  src: string;
  startRect: RectSnapshot;
};

type PerimenopauseDropAnimation = PreparedPerimenopauseDropItem & {
  slotIndex: number;
  endRect: RectSnapshot;
};

type PerimenopauseDropSlotItem = {
  id: PerimenopauseSymptomItemId;
  src: string;
};

const CALENDAR_MONTH_LABEL = "4\u6708";
const PERIMENOPAUSE_MAX_DROP_SLOTS = 4;
const PERIMENOPAUSE_DROP_STEP_MS = 450;
const PERIMENOPAUSE_DROP_SETTLE_MS = 600;

function createEmptyPerimenopauseDropSlots(): Array<PerimenopauseDropSlotItem | null> {
  return Array.from({ length: PERIMENOPAUSE_MAX_DROP_SLOTS }, () => null);
}

function snapshotElementRect(element: Element | null): RectSnapshot | null {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();

  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function findPerimenopauseSymptomItem(id: PerimenopauseSymptomItemId) {
  for (const section of perimenopauseSymptomSections) {
    const match = section.items.find((item) => item.id === id);

    if (match) {
      return match;
    }
  }

  return null;
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
                    aria-label={"\u662f"}
                    onClick={onConfirmPeriodStart}
                  >
                    {"\u662f"}
                  </button>
                  <button type="button" className={!periodConfirmed ? 'active' : ''} aria-label={"\u5426"}>
                    {"\u5426"}
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
                <div className="record-badge-group record-badge-group-compact">
                  {item.badges.map((badge) => (
                    <div
                      key={typeof badge === 'string' ? badge : badge.id}
                      className={`record-badge${typeof badge === 'string' ? '' : ' record-badge-compact'}`}
                      data-testid={typeof badge === 'string' ? undefined : `scene1-habit-badge-${badge.id}`}
                    >
                      {typeof badge === 'string' ? (
                        badge
                      ) : (
                        <img
                          src={badge.imageSrc}
                          alt=""
                          aria-hidden="true"
                          className="record-badge-image"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
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

function PerimenopauseTipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeTimer = window.setTimeout(() => {
      onClose();
    }, 2000);

    return () => window.clearTimeout(closeTimer);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="scene1-perimenopause-tip-overlay"
      data-testid="scene1-perimenopause-tip-overlay"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="记录提示"
        className="scene1-perimenopause-tip-modal"
        data-testid="scene1-perimenopause-tip-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="scene1-perimenopause-tip-close"
          aria-label="关闭提示"
          onClick={onClose}
        >
          ×
        </button>
        <p className="scene1-perimenopause-tip-text">
          <span className="scene1-perimenopause-tip-text-raw" aria-hidden="true">
            坚持记录14天 掌握你的身体变化
          </span>
          <span className="scene1-perimenopause-tip-text-line" aria-hidden="true">
            坚持记录14天
          </span>
          <span className="scene1-perimenopause-tip-text-line" aria-hidden="true">
            掌握你的身体变化
          </span>
        </p>
      </div>
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
  const [moodExpanded, setMoodExpanded] = useState(false);
  const [selectedMoodId, setSelectedMoodId] = useState<Scene1MoodOptionId | null>(null);
  const [symptomExpanded, setSymptomExpanded] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState<PerimenopauseSymptomItemId[]>([]);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [pendingDropItems, setPendingDropItems] = useState<PreparedPerimenopauseDropItem[] | null>(null);
  const [queuedDropItems, setQueuedDropItems] = useState<PerimenopauseDropAnimation[]>([]);
  const [activeDropAnimation, setActiveDropAnimation] = useState<PerimenopauseDropAnimation | null>(null);
  const [dropSlotItems, setDropSlotItems] = useState<Array<PerimenopauseDropSlotItem | null>>(
    createEmptyPerimenopauseDropSlots
  );
  const symptomButtonRefs = useRef(new Map<PerimenopauseSymptomItemId, HTMLButtonElement | null>());
  const dropSlotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  function toggleSymptom(id: PerimenopauseSymptomItemId) {
    setSelectedSymptoms((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  }

  function closeTipModal() {
    setTipModalOpen(false);
    setQueuedDropItems([]);
    setActiveDropAnimation(null);
    setDropSlotItems(createEmptyPerimenopauseDropSlots());

    const dropCandidates = selectedSymptoms
      .slice(-PERIMENOPAUSE_MAX_DROP_SLOTS)
      .map((id) => {
        const symptomItem = findPerimenopauseSymptomItem(id);
        const startRect = snapshotElementRect(symptomButtonRefs.current.get(id) ?? null);

        if (!symptomItem || !startRect) {
          return null;
        }

        return {
          id,
          src: resolvePerimenopauseSymptomIcon(symptomItem),
          startRect,
        };
      })
      .filter((item): item is PreparedPerimenopauseDropItem => item !== null);

    setPendingDropItems(dropCandidates.length > 0 ? dropCandidates : null);

    setSymptomExpanded(false);
  }

  useLayoutEffect(() => {
    if (symptomExpanded || !pendingDropItems) {
      return;
    }

    const measuredDropItems = pendingDropItems
      .map((item, index) => {
        const slotIndex = PERIMENOPAUSE_MAX_DROP_SLOTS - 1 - index;
        const endRect = snapshotElementRect(dropSlotRefs.current[slotIndex] ?? null);

        if (!endRect) {
          return null;
        }

        return {
          ...item,
          slotIndex,
          endRect,
        };
      })
      .filter((item): item is PerimenopauseDropAnimation => item !== null);

    if (measuredDropItems.length === 0) {
      setPendingDropItems(null);
      return;
    }

    const [firstAnimation, ...remainingAnimations] = measuredDropItems;

    setActiveDropAnimation(firstAnimation);
    setQueuedDropItems(remainingAnimations);
    setPendingDropItems(null);
  }, [pendingDropItems, symptomExpanded]);

  useEffect(() => {
    if (!activeDropAnimation) {
      return undefined;
    }

    const completeTimer = window.setTimeout(() => {
      setDropSlotItems((prev) => {
        const next = [...prev];
        next[activeDropAnimation.slotIndex] = {
          id: activeDropAnimation.id,
          src: activeDropAnimation.src,
        };
        return next;
      });
      setQueuedDropItems((prevQueue) => {
        if (prevQueue.length === 0) {
          setActiveDropAnimation(null);
          return prevQueue;
        }

        const [nextAnimation, ...remainingQueue] = prevQueue;
        setActiveDropAnimation(nextAnimation);
        return remainingQueue;
      });
    }, PERIMENOPAUSE_DROP_STEP_MS);

    return () => window.clearTimeout(completeTimer);
  }, [activeDropAnimation]);

  const hasFilledDropSlots = dropSlotItems.some(Boolean);

  useEffect(() => {
    if (pendingDropItems || queuedDropItems.length > 0 || activeDropAnimation || !hasFilledDropSlots) {
      return undefined;
    }

    const clearTimer = window.setTimeout(() => {
      setDropSlotItems(createEmptyPerimenopauseDropSlots());
    }, PERIMENOPAUSE_DROP_SETTLE_MS);

    return () => window.clearTimeout(clearTimer);
  }, [activeDropAnimation, hasFilledDropSlots, pendingDropItems, queuedDropItems]);

  const showDropTargets =
    !symptomExpanded &&
    !!(pendingDropItems || queuedDropItems.length > 0 || activeDropAnimation || hasFilledDropSlots);
  const dropAnimationStyle = activeDropAnimation
    ? ({
        left: `${activeDropAnimation.startRect.left + activeDropAnimation.startRect.width / 2}px`,
        top: `${activeDropAnimation.startRect.top + activeDropAnimation.startRect.height / 2}px`,
        ['--scene1-perimenopause-drop-dx' as const]: `${activeDropAnimation.endRect.left + activeDropAnimation.endRect.width / 2 - (activeDropAnimation.startRect.left + activeDropAnimation.startRect.width / 2)}px`,
        ['--scene1-perimenopause-drop-dy' as const]: `${activeDropAnimation.endRect.top + activeDropAnimation.endRect.height / 2 - (activeDropAnimation.startRect.top + activeDropAnimation.startRect.height / 2)}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div className="record-list record-list-perimenopause" data-testid="scene1-record-list">
      {quickRecordItems.map((item) => {
        if (item.id === 'mood') {
          return (
            <RecordRow
              key={item.id}
              item={item}
              periodConfirmed={periodConfirmed}
              onConfirmPeriodStart={onConfirmPeriodStart}
              expanded={moodExpanded}
              rightSlot={
                <div className="scene1-mood-row-controls">
                  <div
                    className="scene1-mood-preview-list scene1-mood-preview-list-compact"
                    data-testid="scene1-mood-preview-list"
                  >
                    {scene1MoodPreviewItems.map((mood) => (
                      <span
                        key={mood.id}
                        className="scene1-mood-preview scene1-mood-preview-image-only"
                        data-testid={`scene1-mood-preview-${mood.id}`}
                        aria-label={mood.label}
                      >
                        <img
                          src={mood.imageSrc}
                          alt=""
                          aria-hidden="true"
                          className="scene1-mood-preview-image"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="scene1-mood-toggle-btn"
                    aria-label={moodExpanded ? '收起心情' : '展开心情'}
                    aria-expanded={moodExpanded}
                    onClick={() => setMoodExpanded((prev) => !prev)}
                  >
                    <span className="record-plus" aria-hidden="true">
                      +
                    </span>
                  </button>
                </div>
              }
            >
              {moodExpanded ? (
                <div className="scene1-mood-panel" data-testid="scene1-mood-panel">
                  {scene1MoodGroups.map((group) => (
                    <section key={group.id} className="scene1-mood-group">
                      <h3 className="scene1-mood-group-title">{group.title}</h3>
                      <div className="scene1-mood-grid">
                        {group.options.map((option) => {
                          const isSelected = selectedMoodId === option.id;

                          return (
                            <button
                              key={option.id}
                              type="button"
                              className={`scene1-mood-option${isSelected ? ' scene1-mood-option-selected' : ''}`}
                              data-testid={`scene1-mood-option-${option.id}`}
                              aria-label={option.label}
                              aria-pressed={isSelected}
                              onClick={() => setSelectedMoodId(option.id)}
                            >
                              <span className="scene1-mood-option-icon-slot">
                                <img
                                  src={option.imageSrc}
                                  alt=""
                                  aria-hidden="true"
                                  className="scene1-mood-option-image"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </span>
                              <span className="scene1-mood-option-label">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              ) : null}
            </RecordRow>
          );
        }

        if (item.id === 'symptom') {
          return (
            <RecordRow
              key={item.id}
              item={item}
              periodConfirmed={periodConfirmed}
              onConfirmPeriodStart={onConfirmPeriodStart}
              expanded={symptomExpanded}
              rightSlot={
                symptomExpanded ? (
                  <button
                    type="button"
                    className="scene1-perimenopause-toggle-btn scene1-perimenopause-open-state"
                    aria-label={"\u5df2\u5c55\u5f00"}
                    onClick={() => setSymptomExpanded(false)}
                  >
                    {"\u5df2\u5c55\u5f00"}
                  </button>
                ) : (
                  <div className="scene1-perimenopause-collapsed-controls">
                    {showDropTargets ? (
                      <div className="scene1-perimenopause-drop-targets" data-testid="scene1-perimenopause-drop-targets">
                        {dropSlotItems.map((slotItem, index) => (
                          <span
                            key={`drop-slot-${index}`}
                            ref={(node) => {
                              dropSlotRefs.current[index] = node;
                            }}
                            className={`scene1-perimenopause-drop-target${slotItem ? ' scene1-perimenopause-drop-target-filled' : ''}`}
                            data-testid={`scene1-perimenopause-drop-target-${index}`}
                            data-drop-id={slotItem?.id ?? ''}
                            aria-hidden="true"
                          >
                            {slotItem ? (
                              <img
                                src={slotItem.src}
                                alt=""
                                aria-hidden="true"
                                className="scene1-perimenopause-drop-target-icon"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className="scene1-perimenopause-toggle-btn"
                      aria-label={"\u5c55\u5f00\u75c7\u72b6"}
                      onClick={() => {
                        setPendingDropItems(null);
                        setQueuedDropItems([]);
                        setActiveDropAnimation(null);
                        setDropSlotItems(createEmptyPerimenopauseDropSlots());
                        setSymptomExpanded(true);
                      }}
                    >
                      <span className="record-plus" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </div>
                )
              }
            >
              {symptomExpanded ? (
                <div className="scene1-perimenopause-symptom-panel" data-testid="scene1-perimenopause-symptom-panel">
                  {perimenopauseSymptomSections.map((section) => (
                    <section
                      key={section.title}
                      className="scene1-perimenopause-symptom-section"
                      data-testid="scene1-perimenopause-symptom-section"
                    >
                      <h3 className="scene1-perimenopause-symptom-section-title">{section.title}</h3>
                      <div
                        className="scene1-perimenopause-symptom-grid"
                        data-testid="scene1-perimenopause-symptom-grid"
                      >
                        {section.items.map((item) => {
                          const isSelected = selectedSymptoms.includes(item.id);

                          return (
                            <div
                              key={item.id}
                              className="scene1-perimenopause-kmi-item-shell"
                              data-testid="scene1-perimenopause-kmi-item"
                            >
                              <button
                                ref={(node) => {
                                  symptomButtonRefs.current.set(item.id, node);
                                }}
                                type="button"
                                data-testid={`scene1-perimenopause-kmi-toggle-${item.id}`}
                                aria-pressed={isSelected}
                                className={`scene1-perimenopause-kmi-item scene1-perimenopause-kmi-item-${item.iconField}${isSelected ? ' scene1-perimenopause-kmi-item-selected' : ''}`}
                                onClick={() => toggleSymptom(item.id)}
                              >
                                {isSelected ? (
                                  <span
                                    className="scene1-perimenopause-kmi-check"
                                    data-testid="scene1-perimenopause-kmi-check"
                                    aria-hidden="true"
                                  >
                                    ✓
                                  </span>
                                ) : null}
                                <div className="scene1-perimenopause-kmi-icon-slot">
                                  <img
                                    src={resolvePerimenopauseSymptomIcon(item)}
                                    alt=""
                                    aria-hidden="true"
                                    data-testid="scene1-perimenopause-kmi-icon"
                                    data-kmi-field={item.iconField}
                                    className={`scene1-perimenopause-kmi-icon scene1-perimenopause-kmi-icon-${item.iconField}`}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                                <span className="scene1-perimenopause-kmi-label">{item.label}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                  <div
                    className="scene1-perimenopause-symptom-action-bar"
                    data-testid="scene1-perimenopause-symptom-action-bar"
                  >
                    <button
                      type="button"
                      className="scene1-perimenopause-symptom-action-btn scene1-perimenopause-symptom-action-btn-cancel"
                      onClick={() => setSymptomExpanded(false)}
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      className="scene1-perimenopause-symptom-action-btn scene1-perimenopause-symptom-action-btn-confirm"
                      onClick={() => setTipModalOpen(true)}
                    >
                      确定
                    </button>
                  </div>
                </div>
              ) : null}
              <PerimenopauseTipModal open={tipModalOpen} onClose={closeTipModal} />
              {activeDropAnimation ? (
                <div
                  className="scene1-perimenopause-drop-layer"
                  data-testid="scene1-perimenopause-drop-layer"
                  aria-hidden="true"
                >
                  <span
                    className="scene1-perimenopause-drop-animation"
                    data-testid="scene1-perimenopause-drop-animation"
                    style={dropAnimationStyle}
                  >
                    <img
                      src={activeDropAnimation.src}
                      alt=""
                      aria-hidden="true"
                      className="scene1-perimenopause-drop-animation-icon"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </div>
              ) : null}
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
    if (field === 'age' || field === 'heightCm' || field === 'weightKg') {
      writeScene1HealthProfile({ [field]: value });
    }

    setAssessmentState((prev) => answerAssessmentField(prev, field, value));
  }

  function handleAssessmentStateChange(nextState: Scene1AssessmentState) {
    if (nextState.completed) {
      const summary = getKmiScoreSummary(pickCompletedKmiAnswers(nextState.answers));
      writeScene1KmiScore(summary.total);
    }

    setAssessmentState(nextState);
  }

  function handleModeSelect(mode: string) {
    if (mode === '备孕') {
      navigate('/scene1-prep');
      return;
    }

    if (mode === '怀孕') {
      navigate('/scene1-pregnancy');
      return;
    }

    if (mode === '育儿') {
      navigate('/scene1-parenting');
      return;
    }

    setState((prev) => selectScene1Mode(prev, mode));
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
              aria-label={CALENDAR_MONTH_LABEL}
            >
              <span className="prototype-month-arrow" aria-hidden="true">
                &#8249;
              </span>
              <span className="calendar-month prototype-month">{CALENDAR_MONTH_LABEL}</span>
            </button>
            <div className="mode-tabs prototype-mode-tabs" role="tablist" aria-label={"\u6a21\u5f0f\u5207\u6362"}>
              {scene1Modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={state.selectedMode === mode ? 'mode-tab prototype-mode-tab active' : 'mode-tab prototype-mode-tab'}
                  onClick={() => handleModeSelect(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="prototype-analysis-entry"
              aria-label={"\u5206\u6790"}
              onClick={() => navigate('/scene1-assessment-result')}
            >
              {"\u5206\u6790"}
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
                          {cell.today ? <span className="today-badge">{"\u4eca\u5929"}</span> : null}
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
              <span className="legend-arrow">{"\u203a"}</span>
            </div>

            <button
              type="button"
              className={`scene1-mode-switch${isPerimenopauseRoute ? ' scene1-mode-switch-exit' : ''}`}
              data-testid={isPerimenopauseRoute ? 'scene1-perimenopause-mode-exit-button' : 'scene1-perimenopause-mode-entry-button'}
              aria-label={isPerimenopauseRoute ? "\u9000\u51fa\u56f4\u7edd\u7ecf\u671f" : "\u8fdb\u5165\u56f4\u7edd\u7ecf\u671f\u6a21\u5f0f"}
              onClick={() => navigate(isPerimenopauseRoute ? '/scene1' : '/scene1-perimenopause')}
            >
              {isPerimenopauseRoute ? "\u9000\u51fa\u56f4\u7edd\u7ecf\u671f" : "\u8fdb\u5165\u56f4\u7edd\u7ecf\u671f\u6a21\u5f0f"}
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
          text={"\u7ed3\u5408\u8fd1\u671f\u8bb0\u5f55\uff0c\u5df2\u4e3a\u4f60\u751f\u6210\u5468\u671f\u72b6\u6001\u5206\u6790"}
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
        onExitToScene1={() => setAssessmentState(createAssessmentStateWithoutEntry())}
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
