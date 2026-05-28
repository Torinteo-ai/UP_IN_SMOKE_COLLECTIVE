'use client';

import { useState } from 'react';

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  const size = showWordmark ? 84 : 40;
  const [src, setSrc] = useState('/logo/uisc-logo.svg');

  return (
    <img
      src={src}
      alt="UP IN SMOKE COLLECTIVE"
      width={size}
      height={size}
      className={`${showWordmark ? 'w-[min(32vw,84px)] md:w-[84px]' : 'w-10'} h-auto ${className}`.trim()}
      loading="eager"
      decoding="async"
      onError={() => {
        if (src !== '/uisc-logo.svg') setSrc('/uisc-logo.svg');
      }}
    />
  );
}
