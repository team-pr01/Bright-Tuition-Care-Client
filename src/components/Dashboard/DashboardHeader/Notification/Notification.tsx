/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "../../../../assets";
const Notification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      y: -15,
      x: 15,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      x: 0,
      transformOrigin: "top right",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="relative " ref={notificationRef}>
      <button
        onClick={() => setIsNotificationOpen((prev) => !prev)}
        className="relative cursor-pointer mt-1"
      >
        <img
          src={ICONS.notification}
          alt="notification-icon"
          className="size-7"
        />
        <div className="bg-gradient-to-r from-rose-400 to-red-500 size-4 rounded-full flex items-center justify-center text-xs text-white absolute -top-1 -right-[2px]">
          1
        </div>
      </button>

      <div style={{ perspective: "1000px" }} className="z-[999]">
        <AnimatePresence>
          {isNotificationOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-full -right-10 md:right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Notifications
                </h3>
                <ul>
                  <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-semibold text-gray-700">
                      You have a new message
                    </p>
                    <p className="text-sm text-gray-500">
                      from: Jane Doe - 5m ago
                    </p>
                  </li>
                  <li className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer">
                    <p className="font-semibold text-gray-700">
                      Upcoming Session Reminder
                    </p>
                    <p className="text-sm text-gray-500">
                      with: John Smith - Today at 4:00 PM
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notification;
