/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import JobCard from "./JobCard";
import type { TJobs } from "../../../types/job.types";

const Jobs = ({
  allJobs,
  isLoading,
}: {
  allJobs: TJobs[];
  isLoading: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {allJobs?.map((job: TJobs, index: number) => (
        <AnimatedJobCard key={index}>
          <JobCard variant="tutorJobCard" />
        </AnimatedJobCard>
      ))}
    </div>
  );
};

const AnimatedJobCard = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const variants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default Jobs;
