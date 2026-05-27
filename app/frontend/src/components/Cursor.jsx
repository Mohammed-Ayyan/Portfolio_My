import { useEffect, useRef, useState } from "react";

/**
 * Custom magnetic cursor.
 * - Tiny dot follows pointer exactly
 * - Outer ring lags and expands on interactive elements
 * - Contextual label appears when [data-cursor-label] is hovered
 *
 * Interactive triggers: any element with `data-cursor="hover"`, anchors, and buttons.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, calc(-50% + 48px))`;
      }
    };

    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    window.addEventListener("mousemove", move, { passive: true });

    const handleOver = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor='hover'], [data-cursor-label]"
      );
      if (target) {
        setHovered(true);
        const l = target.getAttribute("data-cursor-label");
        if (l) setLabel(l);
        else setLabel("");
      }
    };
    const handleOut = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor='hover'], [data-cursor-label]"
      );
      if (target) {
        setHovered(false);
        setLabel("");
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" data-testid="cursor-dot" />
      <div
        ref={ringRef}
        className="cursor-ring"
        data-state={hovered ? "hover" : "idle"}
        data-testid="cursor-ring"
      />
      <div
        ref={labelRef}
        className="cursor-label"
        data-visible={label ? "true" : "false"}
        data-testid="cursor-label"
      >
        {label}
      </div>
    </>
  );
}
