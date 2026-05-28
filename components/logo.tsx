import Image from 'next/image';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  const width = showWordmark ? 194 : 40;
  const height = showWordmark ? 34 : 40;

  return (
    <Image
      src="/uisc-logo.svg"
      alt="UP IN SMOKE COLLECTIVE"
      width={width}
      height={height}
      className={`h-auto ${showWordmark ? 'w-[min(52vw,194px)] md:w-[194px]' : 'w-10'} ${className}`.trim()}
      priority
    />
  );
}
