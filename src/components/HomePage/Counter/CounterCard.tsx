import React, { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface CounterCardProps {
  icon: React.ReactNode;
  value: string; // Example: "250k+", "1200+", "99%"
  label: string;
}

const CounterCard: React.FC<CounterCardProps> = ({ icon, value, label }) => {
  const countRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && countRef.current) {
      const numericValue = parseFloat(value.match(/[\d.]+/)?.[0] || "0");
      const suffix = value.match(/[a-zA-Z+%]+$/)?.[0] || "";

      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          if (countRef.current) {
            countRef.current.textContent = Math.round(latest).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div
      ref={cardRef}
      className="flex flex-row font-Nunito items-center gap-5 text-center min-w-[200px]"
    >
      <img
        src={typeof icon === "string" ? icon : undefined}
        alt={`${label} icon`}
        className="size-[56px]"
      />
      <div className="flex flex-col gap-2 justify-between items-start">
        <p
          ref={countRef}
          className="text-2xl font-semibold text-primary-50 leading-[32px]"
        >
          0
        </p>
        <p className="text-neutral-10 leading-[24px] font-medium">{label}</p>
      </div>
    </div>
  );
};

export default CounterCard;