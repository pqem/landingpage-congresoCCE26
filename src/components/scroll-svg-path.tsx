"use client";

import { useRef, useEffect, useCallback } from "react";

interface ScrollSVGPathProps {
  d: string;
  pathLength: number;
  stroke?: string;
  strokeWidth?: number;
  viewBox?: string;
  scrollRange?: [number, number];
  className?: string;
  svgClassName?: string;
  preserveAspectRatio?: string;
}

export default function ScrollSVGPath({
  d,
  pathLength,
  stroke = "var(--color-dorado)",
  strokeWidth = 1270,
  viewBox = "0 0 18718 28729.7",
  scrollRange = [0.25, 0.6],
  className = "",
  svgClassName = "",
  preserveAspectRatio = "xMinYMin meet",
}: ScrollSVGPathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rafId = useRef<number>(0);
  const ticking = useRef(false);

  const updatePath = useCallback(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const totalTravel = windowHeight + rect.height;
    const traveled = windowHeight - rect.top;
    const rawProgress = traveled / totalTravel;

    const [rangeStart, rangeEnd] = scrollRange;
    const rangeDelta = rangeEnd - rangeStart;
    const progress = Math.min(1, Math.max(0, (rawProgress - rangeStart) / rangeDelta));

    const offset = pathLength * (1 - progress);
    path.setAttribute("stroke-dashoffset", String(offset));

    ticking.current = false;
  }, [pathLength, scrollRange]);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      rafId.current = requestAnimationFrame(updatePath);
    }
  }, [updatePath]);

  useEffect(() => {
    updatePath();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, updatePath]);

  return (
    <div ref={containerRef} className={className}>
      <svg
        viewBox={viewBox}
        fill="none"
        preserveAspectRatio={preserveAspectRatio}
        className={svgClassName}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit={22.9256}
          fill="none"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
          style={{ willChange: "stroke-dashoffset" }}
        />
      </svg>
    </div>
  );
}
