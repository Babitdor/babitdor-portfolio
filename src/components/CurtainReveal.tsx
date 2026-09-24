'use client';

/**
 * The reveal curtain.
 *
 * Two fabric halves that part from the centre once the boot log finishes,
 * letting the site through. Driven entirely by CSS keyframes: there is no
 * per-frame work here, and nothing to clean up beyond unmounting the element.
 *
 * Decorative only, so it is `aria-hidden`. It is skipped under
 * `prefers-reduced-motion` twice over - `BootSequence` never mounts it, and the
 * stylesheet hides it as a backstop for the `?boot=1` force path.
 */
export default function CurtainReveal() {
  return (
    <div className="tuiCurtain" aria-hidden="true">
      <div className="tuiCurtain__half tuiCurtain__half--left">
        <span className="tuiCurtain__edge" />
      </div>
      <div className="tuiCurtain__half tuiCurtain__half--right">
        <span className="tuiCurtain__edge" />
      </div>
      <span className="tuiCurtain__seam" />
    </div>
  );
}
