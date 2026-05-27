type PeriodDropletIconProps = {
  testId?: string;
  gradientId: string;
  highlightId: string;
  className?: string;
};

export function PeriodDropletIcon({
  testId,
  gradientId,
  highlightId,
  className,
}: PeriodDropletIconProps) {
  return (
    <svg
      data-testid={testId}
      className={className}
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="10" x2="10" y1="2" y2="22.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFB4CF" />
          <stop offset="0.5" stopColor="#FF7BAC" />
          <stop offset="1" stopColor="#FF4D88" />
        </linearGradient>
        <linearGradient id={highlightId} x1="6.2" x2="11.6" y1="6.4" y2="11.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <path
        d="M10.02 23.1C15.03 23.1 18.82 19.12 18.82 14.13C18.82 9.14 14.9 4.98 11.95 2.19C11.48 1.75 10.89 1.12 10.02 1.12C9.15 1.12 8.56 1.75 8.09 2.19C5.15 4.98 1.22 9.12 1.22 14.13C1.22 19.14 5.01 23.1 10.02 23.1Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M6.2 7.68C6.83 6.69 7.86 5.53 8.74 4.68C9.02 4.41 9.32 4.15 9.76 4.15C10.42 4.15 10.68 4.57 10.37 5.08C9.81 6 8.91 7.08 8.38 8.12C7.95 8.97 7.83 9.69 7.8 10.5C7.78 11.04 7.44 11.37 6.96 11.37C6.04 11.37 5.67 8.52 6.2 7.68Z"
        fill={`url(#${highlightId})`}
      />
      <ellipse cx="12.9" cy="18.9" rx="3.9" ry="1.8" fill="#D83F77" fillOpacity="0.2" />
    </svg>
  );
}
