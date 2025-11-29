import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const ToastMessage = ({title,subTitle}) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-lg border border-primary-10 w-[340px]">
      {/* Animated Tick */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-green-500 text-3xl mt-1"
      >
        <FaCheckCircle />
      </motion.div>

      {/* Text */}
      <div>
        <h3 className="font-semibold text-base text-neutral-900">
          {title}
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default ToastMessage;
