import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const ballRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: pos.current.x, y: pos.current.y });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ball = ballRef.current;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!visible) {
        setVisible(true);
        // Fade in ball when mouse moves first time
        gsap.to(ball, { opacity: 1, duration: 1, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Start with ball invisible
    gsap.set(ball, { opacity: 0, scale: 0.8 });

    // GSAP ticker for smooth follow with easing
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      gsap.to(ball, {
        x: pos.current.x - ball.offsetWidth / 2,
        y: pos.current.y - ball.offsetHeight / 2,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(tick);
    };
  }, [visible]);

  return (
    <div
      ref={ballRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#FE7743",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(0, 0)",
        willChange: "transform",
        opacity: 0,
        boxShadow: "0 0 8px rgba(254, 119, 67, 0.7)",
      }}
    />
  );
}
