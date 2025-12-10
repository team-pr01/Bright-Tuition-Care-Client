/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { FaArrowRight } from "react-icons/fa";

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const titleVariants: any = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const cardVariants: any = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8,
      },
    },
    hover: {
      y: -15,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const floatingIconVariants: any = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    {
      title: "Verified & Experienced Tutors",
      icon: ICONS.verified,
      description:
        "Every tutor’s profile, academic background, and experience are carefully verified — ensuring guardians and students get the most reliable and skilled tutors.",
    },
    {
      title: "Secure and Trustworthy",
      icon: ICONS.secure,
      description:
        "Secure and transparent managing of all documents and transactions, fostering confidence for both guardians and tutors.",
    },
    {
      title: "Fast & Reliable Service",
      icon: ICONS.fastAndReliable,
      description:
        "Get matched with the right tutor in the shortest time. Tutors also receive instant tuition offers and responsive support.",
    },
    {
      title: "Customized Tuition Matching",
      icon: ICONS.customizedTuition,
      description:
        "Tuition is perfectly aligned with the student’s subject, schedule, and budget - ensuring a balanced and effective learning experience.",
    },
    {
      title: "Efficient & Affordable Services",
      icon: ICONS.efficient,
      description:
        "Expert guidance that ensures optimal learning outcomes at a reasonable cost.",
    },
    {
      title: "Progress Monitoring & Support",
      icon: ICONS.customerSupport,
      description:
        "Bright Tuition Care ensures continuous progress tracking and 24/7 support, assisting both guardians and tutors effectively.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 overflow-hidden font-Nunito rounded-t-[50px]"
    >
      <Container>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2
              variants={titleVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-10 to-blue-200">
                Us?
              </span>
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
            >
              We don't just teach - we transform learning experiences. Our
              innovative approach combines cutting-edge technology with proven
              educational methodologies to deliver
              <span className="text-primary-10 font-semibold">
                {" "}
                exceptional results
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative group"
              >
                {/* Background Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Main Card */}
                <div
                  className={`relative bg-gray-200 bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 p-8 h-full transform-gpu hover:border-opacity-40 transition-all duration-300`}
                >
                  {/* Icon Container */}
                  <motion.div
                    variants={floatingIconVariants}
                    animate="float"
                    className={`mb-6 flex items-center justify-center`}
                  >
                    <img src={feature.icon} alt="" className="size-20" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-primary-50 mt-3 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-30 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center mt-16 px-4"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="/hire-a-tutor"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 md:px-12 md:py-4 rounded-2xl font-semibold text-base md:text-lg shadow-2xl transition-all duration-300 relative overflow-hidden group w-full sm:w-auto text-center"
              >
                Find Right Tutor Today
                <motion.span
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center"
                >
                  <FaArrowRight className="text-lg" />
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
