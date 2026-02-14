"use client";
import { useEffect, useState } from "react";

export function Countdown() {
  const target = new Date("2026-03-20T09:00:00-03:00").getTime();
  const [diff, setDiff] = useState(target - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const blocks = [
    { value: days, label: "DÍAS" },
    { value: hours, label: "HORAS" },
    { value: mins, label: "MIN" },
    { value: secs, label: "SEG" },
  ];

  return (
    <div className="w-full border-y-[3px] border-dorado px-6 py-5 sm:px-10 sm:py-6">
      <p className="mb-4 text-center font-sans text-xs font-bold tracking-[0.3em] text-dorado">FALTAN</p>
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
        {blocks.map((b, i) => (
          <div key={b.label} className="flex flex-row items-center gap-3 sm:gap-4">
            <div className="text-center">
              <span className="block font-mono text-2xl font-bold text-dorado sm:text-3xl md:text-5xl">
                {String(b.value).padStart(2, "0")}
              </span>
              <span className="text-[11px] tracking-widest text-foreground/50 sm:text-xs">{b.label}</span>
            </div>
            {i < blocks.length - 1 && (
              <span className="font-mono text-lg text-dorado/40 sm:text-2xl md:text-4xl">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
