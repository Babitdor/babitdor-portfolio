'use client';

import { useToast } from '@/lib/toast';

/** Transient status line, styled like a terminal notification. */
export default function CopyToast() {
  const toast = useToast();

  if (!toast) return null;

  return (
    <div className="tuiToast" role="status" aria-live="polite" key={toast.id}>
      <span className="tuiToast__sigil" aria-hidden="true">
        &gt;
      </span>
      {toast.message}
    </div>
  );
}
