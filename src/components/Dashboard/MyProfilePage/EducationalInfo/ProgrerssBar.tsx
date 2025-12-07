import React from "react";

interface ProgressItem {
  label: string;
  isFilled: boolean;
  showLabel?: boolean;
}

interface ProgressBarsProps {
  bars: ProgressItem[];
}

const ProgressBars: React.FC<ProgressBarsProps> = ({ bars }) => {
  return (
    <div className="w-full flex flex-row gap-4">
      {bars.map((bar, index) => (
        <div key={index} className="flex-1 min-w-0">
          {bar.showLabel !== false && (
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                {bar.label}
              </span>
              <span className="hidden md:block text-[10px] sm:text-xs text-gray-500">
                {bar.isFilled ? "Completed" : "Incomplete"}
              </span>
            </div>
          )}

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                bar.isFilled ? "bg-primary-10" : "bg-gray-400"
              }`}
              style={{ width: bar.isFilled ? "100%" : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBars;
