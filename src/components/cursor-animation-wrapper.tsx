'use client';

import React from 'react';
import CursorAnimation from './cursor-animation';
import ClientOnly from './client-only';

export default function CursorAnimationWrapper() {
  return (
    <ClientOnly>
      <CursorAnimation />
    </ClientOnly>
  );
}
