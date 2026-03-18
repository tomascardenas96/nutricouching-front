import { useEffect, useRef, useState } from "react";

export function useHeaderScroll() {
  const [isStuck, setIsStuck] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const headerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const wasStuckRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 100;

      // rerender-use-ref-transient-values: toggle class directly on DOM node
      headerRef.current?.classList.toggle("header--scrolled", shouldStick);

      if (shouldStick) {
        clearTimeout(exitTimerRef.current);
        setIsExiting(false);
        setIsStuck(true);
        wasStuckRef.current = true;
      } else if (wasStuckRef.current) {
        setIsExiting(true);
        exitTimerRef.current = setTimeout(() => {
          setIsStuck(false);
          setIsExiting(false);
          wasStuckRef.current = false;
        }, 280);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(exitTimerRef.current);
    };
  }, []);

  return { isStuck, isExiting, headerRef };
}
