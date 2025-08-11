/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../../../assets";
import { BiHelpCircle, BiLogOut } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { LuUser } from "react-icons/lu";

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main dropdown animation
  const dropdownVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotateY: -20,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transformOrigin: "top right",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.07,
      },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  // List item animation
  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Picture Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-9 rounded-full bg-primary-10 flex items-center justify-center p-[2px] shadow-md cursor-pointer focus:outline-none"
      >
        <div className="p-[2px] bg-white rounded-full w-full h-full">
          <img
            src={IMAGES.dummyAvatar}
            className="w-full h-full object-cover rounded-full"
            alt="User Avatar"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div style={{ perspective: "1000px" }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl z-20"
            >
              {/* User Info Header */}
              <motion.div
                variants={itemVariants}
                className="px-4 py-3 border-b border-neutral-20/10 flex items-center gap-3"
              >
                <img
                  src={IMAGES.dummyAvatar}
                  className="size-10 object-cover rounded-full"
                  alt="Kasper Carlsen"
                />
                <div>
                  <p className="font-semibold text-neutral-90">
                    Kasper Carlsen
                  </p>
                  <p className="text-sm text-neutral-45">Product Designer</p>
                </div>
              </motion.div>

              {/* Menu Links */}
              <motion.ul className="py-2">
                <motion.li
                  variants={itemVariants}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-45/10 transition duration-500"
                >
                  <LuUser size={18} /> View Profile
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-45/10 transition duration-500"
                >
                  <BiHelpCircle size={18} /> Help Center
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-45/10 transition duration-500"
                >
                  <CiSettings size={18} /> Account Settings
                </motion.li>
              </motion.ul>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="h-px bg-neutral-20/20"
              ></motion.div>

              <div>
                <motion.ul className="py-2">
                  <motion.li
                    variants={itemVariants}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-red-50/70 text-red-500"
                  >
                    <BiLogOut size={18} /> Log Out
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
