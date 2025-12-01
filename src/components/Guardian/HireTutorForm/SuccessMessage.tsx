import { motion } from "framer-motion";
import { FaCheckCircle, FaPhone } from "react-icons/fa";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
const SuccessMessage = ({ user }: { user: TLoggedInUser }) => {
  return (
    <div className="text-center py-8 px-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex justify-center mb-6"
      >
        <FaCheckCircle className="text-6xl md:text-7xl text-green-500" />
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Submitted Successfully!
      </h2>
      {user?.role === "guardian" && (
        <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Thank you for submitting your tutor request. One of our executives
          will contact you within 24 hours to verify your requirements and
          publish it on our job board.
        </p>
      )}

      {user?.role === "guardian" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaPhone className="text-primary-10 text-xl" />
            <span className="text-lg font-semibold text-primary-10">
              Need Immediate Assistance?
            </span>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4 text-center">
            Having any problem with payment or urgent requirement?
          </p>
          <div className="flex flex-col">
            <a
              href="tel:01720000000"
              className="inline-flex items-center gap-2 bg-primary-10 hover:bg-primary-10/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 w-fit mx-auto"
            >
              <FaPhone className="text-sm" />
              Call Us: 01720000000
            </a>

            <a
              href={"/dashboard/guardian/home"}
              className="text-primary-50 underline mt-4"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      )}

      {user?.role === "admin" && (
        <a
          href={
            user?.role === "admin"
              ? "/dashboard/admin/all-jobs/all"
              : "/dashboard/guardian/home"
          }
          className="text-primary-50 underline mt-4"
        >
          {user?.role === "admin" ? "See All Jobs" : "Go to Dashboard"}
        </a>
      )}
    </div>
  );
};

export default SuccessMessage;
