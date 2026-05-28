import { forwardRef, useRef } from "react";

/**
 * Magnetic button with subtle pull toward cursor + sweep fill.
 */
const MagneticButton = forwardRef(function MagneticButton(
  {
    children,
    className = "",
    onClick,
    as: Component = "button",
    type = "button",
    variant = "outline",
    strength = 18,
    ...props
  },
  ref
) {
  const localRef = useRef(null);
  const btnRef = ref || localRef;

  const handleMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${(x / rect.width) * strength}px, ${
      (y / rect.height) * strength
    }px, 0)`;
  };

  const handleLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <Component
      ref={btnRef}
      {...(Component === "button" ? { type } : {})}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="hover"
      className={`btn-magnetic ${variant === "solid" ? "solid" : ""} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Component>
  );
});

export default MagneticButton;
