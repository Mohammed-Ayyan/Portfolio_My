import { forwardRef, useCallback, useEffect, useRef } from "react";

/**
 * Magnetic button with a generous cursor pull + sweep fill.
 */
const MagneticButton = forwardRef(function MagneticButton(
  {
    children,
    className = "",
    onClick,
    as: Component = "button",
    type = "button",
    variant = "outline",
    strength = 38,
    radius = 190,
    ...props
  },
  ref
) {
  const btnRef = useRef(null);
  const frameRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      btnRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return undefined;

    const move = (e) => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        const magneticRadius = Math.max(radius, rect.width * 0.9);

        if (distance > magneticRadius) {
          el.style.setProperty("--magnetic-x", "0px");
          el.style.setProperty("--magnetic-y", "0px");
          el.style.setProperty("--magnetic-scale", "1");
          return;
        }

        const pull = 1 - distance / magneticRadius;
        const directionX = distance ? dx / distance : 0;
        const directionY = distance ? dy / distance : 0;
        const lift = 1 + pull * 0.045;

        el.style.setProperty("--magnetic-x", `${directionX * strength * pull}px`);
        el.style.setProperty("--magnetic-y", `${directionY * strength * pull}px`);
        el.style.setProperty("--magnetic-scale", lift.toFixed(3));
      });
    };

    const reset = () => {
      el.style.setProperty("--magnetic-x", "0px");
      el.style.setProperty("--magnetic-y", "0px");
      el.style.setProperty("--magnetic-scale", "1");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", reset);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [radius, strength]);

  return (
    <Component
      ref={setRefs}
      {...(Component === "button" ? { type } : {})}
      onClick={onClick}
      data-cursor="hover"
      className={`btn-magnetic ${variant === "solid" ? "solid" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
});

export default MagneticButton;
