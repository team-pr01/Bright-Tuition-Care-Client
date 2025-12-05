/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { ICONS } from "../../../assets";

const NoticeBoard = ({ notices } : any) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // swipe left
        setCurrent((prev) => (prev + 1) % notices?.length);
      } else {
        // swipe right
        setCurrent((prev) => (prev === 0 ? notices?.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-10 to-cyan-500 border border-primary-40/10 rounded-xl md:rounded-2xl p-[2px] md:p-4 flex items-center gap-6 font-Nunito overflow-hidden">
      <img
        src={ICONS.notice}
        alt=""
        className="hidden lg:block size-24 flex-shrink-0"
      />

      <div className="bg-white shadow p-2 md:p-4 rounded-lg md:rounded-2xl w-full relative">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img src={ICONS.notice2} alt="" className="size-9 block lg:hidden" />
          <div className="rounded md:rounded-lg bg-gradient-to-r from-cyan-500 to-primary-10 text-white p-[6px] md:p-2 w-fit text-[10px] md:text-xs">
            Notice Board
          </div>
        </div>

        {/* ✅ Text Slider (Swipable) */}
        <div
          className="relative mt-2 h-[70px] md:h-[80px] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${notices?.length * 100}%`,
              transform: `translateX(-${current * (100 / notices?.length)}%)`,
            }}
          >
            {notices?.map((notice:any, index:number) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-1"
                style={{ width: `${100 / notices?.length}%` }}
              >
                <p className="text-neutral-10 text-base xl:text-xl font-bold">
                  {notice?.title}
                </p>
                <p className="text-neutral-20 text-xs lg:text-sm leading-6 mt-1">
                  {notice?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Dots */}
        <div className="flex justify-center mt-3 space-x-2">
          {notices?.map((_:any, i:number) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer w-2.5 h-2.5 rounded-full transition-all ${
                current === i
                  ? "bg-cyan-500 scale-110"
                  : "bg-primary-40 hover:bg-cyan-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
