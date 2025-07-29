import { useState } from "react";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { motion, AnimatePresence } from "framer-motion";

const JobCard = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const jobDetails = [
    { icon: ICONS.salary, title: "Salary", value: "5000" },
    { icon: ICONS.subject, title: "Subject", value: "All" },
    {
      icon: ICONS.tutoringDays,
      title: "Tutoring Days",
      value: "3 Days / Week",
    },
    { icon: ICONS.preferredTutor, title: "Prefer Tutor", value: "Female" },
    { icon: ICONS.tuitionType, title: "Tuition Type", value: "Home Tutoring" },
    { icon: ICONS.location, title: "Location", value: "Mohammodpur" },
  ];

  const jobDetail2 = [
    { icon: ICONS.salary, title: "Salary", value: "5000" },
    { icon: ICONS.subject, title: "Subject", value: "All" },
    {
      icon: ICONS.tutoringDays,
      title: "Tutoring Days",
      value: "3 Days / Week",
    },
    { icon: ICONS.preferredTutor, title: "Prefer Tutor", value: "Female" },
    { icon: ICONS.tuitionType, title: "Tuition Type", value: "Home Tutoring" },
    { icon: ICONS.location, title: "Location", value: "Mohammodpur" },
    { icon: ICONS.numberOfStudents, title: "Number Of Student", value: "2" },
    { icon: ICONS.preferedClass, title: "Class", value: "10" },
    { icon: ICONS.category, title: "Category", value: "Bangla Media" },
    // { icon: ICONS.time, title: "Tutoring Time", value: "6:00 - 7:00 PM" },
  ];

  return (
    <>
      {/* Smooth Overlay & Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowDrawer(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 w-full z-50 bg-white rounded-b-xl shadow-lg max-h-[80vh] overflow-y-auto p-5 md:p-10"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="bg-white border-0 md:border md:border-neutral-55 rounded-xl lg:rounded-3xl p-0 md:p-8 xl:p-12 max-w-[895px] mx-auto font-Nunito relative">
                  <h1 className="text-neutral-10 text-lg md:text-2xl lg:text-3xl font-bold leading-6 text-start md:text-center grid-cols-2">
                    Advanced Mathematics Tutor
                  </h1>
                   <button className="text-neutral-10 hidden md:flex items-center gap-2 leading-[24px] w-fit font-semibold transition-all duration-300 text-sm md:text-base absolute top-5 md:top-8 xl:top-12  right-5 md:right-8 xl:right-12">
                    <img src={ICONS.share} alt="" className="size-4" />
                    <p className="hidden md:block">Share</p>
                  </button>

                {/* Date and job id */}
                  <div className="flex flex-wrap items-center justify-start md:justify-center gap-5 mt-5">
                  <div className="flex items-center gap-[10px]">
                    <img src={ICONS.jobId} alt="Job ID" className="size-5" />
                    <p className="text-neutral-10 text-sm md:text-base leading-6">
                      Job Id#12345
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={ICONS.postedDate}
                      alt="Posted Date"
                      className="size-5"
                    />
                    <p className="text-neutral-10 text-sm md:text-base leading-6">
                      Jan 15, 2024
                    </p>
                  </div>
                   <button className="text-neutral-10 md:hidden flex items-center gap-2 leading-[24px] w-fit font-semibold transition-all duration-300 text-sm md:text-base">
                    <img src={ICONS.share} alt="" className="size-4" />
                    Share
                  </button>
                </div>

                <img
                  src={ICONS.jobCategoryDummyIcon}
                  alt="Category Icon"
                  className="size-20 md:size-[100px] lg:size-[130px] mx-auto mt-11"
                />

               <div className="flex flex-col gap-6 items-start lg:items-center justify-center">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full lg:max-w-[70%] mx-0 lg:mx-auto mt-11">
                  {jobDetail2.map((details, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <img src={details.icon} alt="" className="size-5" />
                      <div>
                        <p className="text-neutral-45 text-sm">
                          {details.title}
                        </p>
                        <p className="text-neutral-10 font-medium">
                          {details.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                      <img src={ICONS.time} alt="" className="size-5" />
                      <div>
                        <p className="text-neutral-45 text-sm">
                          Tutoring Time
                        </p>
                        <p className="text-neutral-10 font-medium">
                          6:00 - 7:00 PM
                        </p>
                      </div>
                    </div>
               </div>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="absolute top-[13px] md:top-4 right-3 md:right-6 text-neutral-45 text-2xl font-bold cursor-pointer"
              >
                ×
              </button>

              <div className="mt-6 flex justify-center gap-5">
                <Button
                  label="Direction"
                  variant="secondary"
                  iconBg="#0D99FF"
                  className="border border-neutral-55"
                />
                <Button
                  label="Apply Now"
                  variant="primary"
                  iconBg="#0D99FF"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Job Card */}
      <div className="px-3 py-5 md:px-5 md:py-10 border border-primary-30 bg-white shadow-job-card rounded-xl font-Nunito transform transition-transform duration-300 hover:-translate-y-2 z-20 relative">
        <h1 className="text-neutral-10 text-lg md:text-xl font-bold leading-6">
          Advanced Mathematics Tutor
        </h1>

        <div className="flex items-center gap-5 mt-3">
          <div className="flex items-center gap-[10px]">
            <img src={ICONS.jobId} alt="Job ID" className="size-5" />
            <p className="text-neutral-10 text-sm md:text-base leading-6">
              Job Id#12345
            </p>
          </div>
          <div className="flex items-center gap-[10px]">
            <img src={ICONS.postedDate} alt="Posted Date" className="size-5" />
            <p className="text-neutral-10 text-sm md:text-base leading-6">
              January 15, 2024
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-9 md:mt-12">
          <div className="grid grid-cols-2 gap-8">
            {jobDetails.map((details, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={details.icon} alt="" className="size-5" />
                <div>
                  <p className="text-neutral-45 text-sm leading-normal">
                    {details.title}
                  </p>
                  <p className="text-neutral-10 font-medium leading-6 mt-1">
                    {details.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <img
            src={ICONS.jobCategoryDummyIcon}
            alt="Category Icon"
            className="size-20 md:size-[90px]"
          />
        </div>

        <div className="flex gap-4 mt-12 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDrawer(true)}
              className="bg-white hover:bg-primary-10/10 text-neutral-10 border border-primary-10 flex items-center gap-1 xl:gap-4 leading-[24px] w-fit rounded-lg font-semibold transition-all duration-300 py-2 lg:py-3 px-3 xl:px-6 text-sm md:text-base cursor-pointer"
            >
              <img src={ICONS.jobDetails} alt="" className="size-5" />
              <p className="hidden md:block">Details</p>
            </button>
            <button className="bg-white hover:bg-primary-10/10 text-neutral-10 border border-primary-10 flex items-center gap-1 xl:gap-4 leading-[24px] w-fit rounded-lg font-semibold transition-all duration-300 py-2 lg:py-3 px-3 xl:px-6 text-sm md:text-base cursor-pointer">
              <img src={ICONS.share} alt="" className="size-5" />
              <p className="hidden md:block">Share</p>
            </button>
          </div>
          <Button
            label="Apply Now"
            variant="primary"
            icon={ICONS.topRightArrowWhite}
            iconBg="#0D99FF"
          />
        </div>
      </div>
    </>
  );
};

export default JobCard;
