'use client';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  const size = showWordmark ? 84 : 40;

  return (
    <img
      src="/logo/uisc-logo.svg"
      alt="UP IN SMOKE COLLECTIVE"
      width={size}
      height={size}
      className={`${showWordmark ? 'w-[min(32vw,84px)] md:w-[84px]' : 'w-10'} h-auto ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
}
