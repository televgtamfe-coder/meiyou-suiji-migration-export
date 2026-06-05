import { useNavigate } from 'react-router-dom';

type Scene1PregnancyToolsCardProps = {
  className?: string;
  testId?: string;
};

const pregnancyQuickActions = [
  { key: 'doctor', label: '\u95ee\u533b\u751f' },
  { key: 'food', label: '\u9aa8\u9499\u6d4b\u8bc4' },
  { key: 'checkup', label: '\u8fd0\u52a8\u80fd\u529b\u8bc4\u4f30' },
  { key: 'hcg', label: 'PHQ-9 \u6291\u90c1\u8bc4\u4f30' },
  { key: 'weight', label: 'GAD-7 \u7126\u8651\u8bc4\u4f30' },
] as const;

const pregnancyServiceActions = [
  { key: 'skincare', label: '\u5b55\u5988\u62a4\u80a4' },
  { key: 'nanny', label: '\u6708\u5ac2\u62a5\u4ef7' },
  { key: 'journal', label: '\u5b9d\u5b9d\u8bb0' },
  { key: 'group', label: '\u540c\u57ce\u5b55\u5988\u7fa4' },
  { key: 'action', label: '\u80fd\u4e0d\u80fd\u505a' },
] as const;

type PregnancyActionKey =
  | (typeof pregnancyQuickActions)[number]['key']
  | (typeof pregnancyServiceActions)[number]['key'];

function PregnancyActionIcon({ actionKey }: { actionKey: PregnancyActionKey }) {
  if (actionKey === 'doctor') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14.5 2C7.6 2 2 7.5 2 14.3C2 17.6 3.3 20.7 5.6 22.9C5.3 24.3 4.6 25.6 3.6 26.7C3.4 26.9 3.6 27.2 3.9 27.1C6.4 26.7 8.4 25.8 9.9 24.8C11.3 25.4 12.9 25.8 14.5 25.8C21.4 25.8 27 20.3 27 13.5C27 6.7 21.4 2 14.5 2Z"
          fill="#6AA8FF"
        />
        <path d="M14.5 8.8V18.4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9.7 13.6H19.3" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'food') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.6" y="2.6" width="23.8" height="23.8" rx="8" fill="#FF8C67" />
        <path
          d="M8.8 16.9C8.8 13.8 11.3 11.3 14.4 11.3H20.2C20.8 11.3 21.2 11.8 21 12.4C20.2 15.5 17.4 17.8 14.2 17.8H9.7C9.2 17.8 8.8 17.4 8.8 16.9Z"
          fill="#FFFFFF"
        />
        <path d="M10.7 10.2C12.1 8.7 13.9 7.9 15.9 7.9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13.5 8.1L11.9 6.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'checkup') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="4.7" width="21" height="20" rx="5.4" fill="#AA73F1" />
        <rect x="7.3" y="10.2" width="14.4" height="9.7" rx="2.2" fill="#FFFFFF" />
        <path d="M9.4 7.8V11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19.6 7.8V11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M10.2 15.1L12.4 17.1L17.8 12.2"
          stroke="#AA73F1"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (actionKey === 'hcg') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.4" y="2.4" width="24.2" height="24.2" rx="8" fill="#FF74A3" />
        <circle cx="12.8" cy="12.2" r="5.1" stroke="#FFFFFF" strokeWidth="2.1" />
        <path d="M16.6 16.2L20.6 20.2" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M12.8 10.2V14.3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.7 12.2H14.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'weight') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.5" y="2.5" width="24" height="24" rx="8" fill="#A467F4" />
        <path
          d="M8.1 13.2C8.1 10.2 10.5 7.8 13.5 7.8H15.5C18.5 7.8 20.9 10.2 20.9 13.2V16.3C20.9 17 20.4 17.5 19.7 17.5H9.3C8.6 17.5 8.1 17 8.1 16.3V13.2Z"
          fill="#F8E8FF"
        />
        <path d="M14.5 11.4L17.2 10.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14.5" cy="11.4" r="1.4" fill="#FFFFFF" />
      </svg>
    );
  }

  if (actionKey === 'skincare') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="3.1" y="2.7" width="22.8" height="23.6" rx="8" fill="#FF88BA" />
        <path
          d="M14.6 8.6L15.6 10.8L18 11.1L16.2 12.8L16.6 15.2L14.6 14.2L12.6 15.2L13 12.8L11.2 11.1L13.6 10.8L14.6 8.6Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (actionKey === 'nanny') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.7" y="4.1" width="23.6" height="20.8" rx="8" fill="#FDB462" />
        <path
          d="M8.7 13.5H20.3C20.7 13.5 21 13.8 21 14.2V18.4C21 19.8 19.8 21 18.4 21H10.6C9.2 21 8 19.8 8 18.4V14.2C8 13.8 8.3 13.5 8.7 13.5Z"
          fill="#FFFFFF"
        />
        <path d="M11.6 10.9V13.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.4 10.9V13.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12.4 17.2H16.6" stroke="#FDB462" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'journal') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.8" y="2.8" width="23.4" height="23.4" rx="8" fill="#FF78AE" />
        <path
          d="M8.7 17.9C8.7 14.4 11.5 11.6 15 11.6H18.4V18.2C18.4 18.7 18 19.1 17.5 19.1H10C9.3 19.1 8.7 18.5 8.7 17.9Z"
          fill="#FFFFFF"
        />
        <path
          d="M9.8 12.2C10.8 9.9 12.8 8.4 15.3 8.4"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M14.1 8.6L12.6 7.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'group') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.5" y="4" width="24" height="20.8" rx="8" fill="#63E1B6" />
        <circle cx="10.8" cy="12" r="2" fill="#0F6A50" />
        <circle cx="18.3" cy="14.2" r="2" fill="#0F6A50" />
        <path
          d="M7.9 17.9C8.6 16.7 10 16 11.6 16C13.2 16 14.6 16.7 15.3 17.9"
          stroke="#0F6A50"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M15.7 18.2C16.2 17.1 17.3 16.4 18.6 16.4C19.9 16.4 21 17.1 21.5 18.2"
          stroke="#0F6A50"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="scene1-pregnancy-tool-svg"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3.2" y="3.2" width="22.6" height="22.6" rx="8" fill="#FF6E9F" />
      <path
        d="M8.9 17.7L16.9 9.7C17.3 9.3 17.9 9.1 18.4 9.1H19.9C20.4 9.1 20.8 9.5 20.8 10V11.5C20.8 12 20.6 12.6 20.2 13L12.2 21H8.9V17.7Z"
        fill="#FFFFFF"
      />
      <path d="M16.5 10.1L19.8 13.4" stroke="#FF6E9F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PregnancyActionItem({
  actionKey,
  label,
  multilineLabel = false,
  onClick,
}: {
  actionKey: PregnancyActionKey;
  label: string;
  multilineLabel?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="scene1-pregnancy-tool-item" onClick={onClick}>
      <span className="scene1-pregnancy-tool-icon-wrap">
        <PregnancyActionIcon actionKey={actionKey} />
      </span>
      <span
        className={
          multilineLabel
            ? 'scene1-pregnancy-tool-label scene1-pregnancy-tool-label-multiline'
            : 'scene1-pregnancy-tool-label'
        }
      >
        {label}
      </span>
    </button>
  );
}

export function Scene1PregnancyToolsCard({
  className,
  testId = 'scene1-pregnancy-quick-grid',
}: Scene1PregnancyToolsCardProps) {
  const navigate = useNavigate();
  const cardClassName = className
    ? `scene1-pregnancy-tools-card ${className}`
    : 'scene1-pregnancy-tools-card';

  return (
    <section className={cardClassName} data-testid={testId}>
      <div className="scene1-pregnancy-tools-row">
        {pregnancyQuickActions.map((item) => (
          <PregnancyActionItem
            key={item.key}
            actionKey={item.key}
            label={item.label}
            multilineLabel={item.key === 'hcg' || item.key === 'weight'}
            onClick={
              item.key === 'food'
                ? () => navigate('/scene1-bone-assessment')
                : item.key === 'checkup'
                  ? () => navigate('/scene1-exercise-assessment')
                  : item.key === 'hcg'
                    ? () => navigate('/scene1-phq9-assessment')
                    : item.key === 'weight'
                      ? () => navigate('/scene1-gad7-assessment')
                  : undefined
            }
          />
        ))}
      </div>

      <div
        className="scene1-pregnancy-tools-row scene1-pregnancy-tools-row-secondary"
        data-testid="scene1-pregnancy-services-grid"
      >
        {pregnancyServiceActions.map((item) => (
          <PregnancyActionItem
            key={item.key}
            actionKey={item.key}
            label={item.label}
            onClick={item.key === 'action' ? () => navigate('/scene1-exercise-assessment') : undefined}
          />
        ))}
      </div>
    </section>
  );
}
