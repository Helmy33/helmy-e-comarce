
import React from "react";

export default function Dots({ count = 2, active = 0, onChange = () => {} }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-label={`Slide ${i + 1}`}
          aria-current={active === i}
          className={
            "h-2 rounded-full transition-all duration-300 " +
            (active === i ? "w-8 bg-gray-400" : "w-4 bg-gray-300 hover:bg-gray-400")
          }
        />
      ))}
    </div>
  );
}