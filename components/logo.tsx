type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <svg
        viewBox="0 0 72 72"
        role="img"
        aria-label="UP IN SMOKE COLLECTIVE mark"
        className="h-10 w-10 shrink-0"
      >
        <defs>
          <linearGradient id="smokeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6dfcf" />
            <stop offset="55%" stopColor="#8b9678" />
            <stop offset="100%" stopColor="#5f6753" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="68" height="68" rx="20" fill="#121212" stroke="#2b2d28" />
        <path
          d="M16 46c8-12 30-5 39-17-3 10-12 13-21 14-5 1-10 1-18 3Z"
          fill="url(#smokeGrad)"
          opacity="0.78"
        />
        <path
          d="M18 34c6-9 16-8 23-14 0 5-4 9-8 11-6 4-10 2-15 3Z"
          fill="url(#smokeGrad)"
          opacity="0.62"
        />
        <path d="M22 51h28" stroke="#d9d2c4" strokeLinecap="round" opacity="0.6" />
      </svg>

      {showWordmark && (
        <svg viewBox="0 0 320 44" role="img" aria-label="UP IN SMOKE COLLECTIVE" className="h-9 w-auto">
          <text x="0" y="18" fill="#e8dfcc" fontSize="16" fontWeight="600" letterSpacing="4.5">
            UP IN SMOKE
          </text>
          <text x="1" y="36" fill="#97a287" fontSize="10" fontWeight="500" letterSpacing="3.8">
            COLLECTIVE
          </text>
        </svg>
      )}
    </div>
  );
}
