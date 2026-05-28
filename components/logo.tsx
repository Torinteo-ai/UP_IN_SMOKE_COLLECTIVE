type LogoProps = {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className = '', showWordmark = true }: LogoProps) {
  const sizeClasses = showWordmark
    ? 'h-16 w-[240px] sm:h-20 sm:w-[300px]'
    : 'h-12 w-[96px] sm:h-14 sm:w-[112px]';

  return (
    <svg
      className={`${sizeClasses} ${className}`.trim()}
      viewBox="0 0 716 240"
      role="img"
      aria-label="UISC UP IN SMOKE COLLECTIVE logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>UISC UP IN SMOKE COLLECTIVE</title>
      <g fill="none" fillRule="evenodd">
        <g fill="#f7f6f1">
          <path d="M44 70c-12 19-18 39-18 60 0 24 7 44 22 59 15 15 35 23 61 23 26 0 46-8 61-23 15-15 22-35 22-59V69h-31v61c0 16-4 28-13 37-9 9-22 14-39 14s-30-5-39-14c-9-9-13-21-13-37 0-20 5-40 15-60H44Z" />
          <path d="M218 70h31v139h-31z" />
          <path d="M353 66c-24 0-44 5-58 16-15 11-22 25-22 42 0 16 6 29 19 38 12 9 30 16 53 21 16 3 28 7 35 12 7 4 11 10 11 18 0 9-5 17-15 23-10 6-24 9-42 9-25 0-48-7-68-22l-15 26c22 17 49 26 82 26 28 0 50-6 66-17 16-12 24-28 24-48 0-17-6-31-19-41-13-10-31-17-56-22-15-3-26-6-33-10-7-4-10-9-10-16 0-8 4-15 13-20 9-5 21-8 37-8 20 0 38 5 54 16l16-25c-19-12-40-18-65-18Z" transform="translate(0 -2) scale(.84 1) translate(60 0)" />
          <path d="M531 67c-25 0-46 7-63 21-17 14-26 32-26 54s9 40 26 54c17 14 38 21 63 21 24 0 45-7 62-20l-16-25c-13 10-28 15-46 15-17 0-31-4-42-13-11-8-16-19-16-32s5-24 16-32c11-8 25-13 42-13 17 0 32 5 45 14l16-25c-17-13-37-19-61-19Z" />
        </g>
        <g fill="#5cab43">
          <path d="M622 58c23 11 34 27 32 48-1 12-8 24-21 34 15 1 27 6 35 15 11 12 13 28 6 45-5 13-15 26-31 40 4-22 2-38-7-48-8-10-20-14-37-13 18-13 26-26 24-39-2-12-12-21-31-27 15-6 24-14 27-24 3-9 0-19-9-31h12Z" />
          <path d="M649 39c26 4 41 16 45 35 4 19-6 37-31 54 7-17 5-31-5-40-10-10-26-15-48-16 19-6 32-13 39-22 4-4 4-8 0-11Z" />
          <path d="M616 137c-13 9-20 20-20 32 0 13 8 22 23 28-14 6-22 16-25 29-3 14 1 30 12 50 23-26 32-49 27-69-3-13-11-23-25-31 14-10 18-23 8-39Z" />
        </g>
        {showWordmark ? (
          <text
            x="28"
            y="232"
            fill="#f7f6f1"
            fontFamily="'Trebuchet MS', 'Avenir Next', Arial, sans-serif"
            fontSize="31"
            fontWeight="400"
            letterSpacing="5.8"
          >
            UP IN SMOKE COLLECTIVE
          </text>
        ) : null}
      </g>
    </svg>
  );
}

export default Logo;
