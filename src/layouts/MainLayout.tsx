import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const MainLayout = () => {
  const location = useLocation();
  const phoneNumber = "+8801610785588";

  return (
    <div className="relative">
      <Navbar />
      <Outlet />

      {location?.pathname !== "/job-board" && <Footer />}

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <FaWhatsapp size={28} />
      </motion.a>
    </div>
  );
};

export default MainLayout;
