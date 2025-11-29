/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import JobDetailsForm from "./JobDetailsForm";
import StudentInfoForm from "./StudentInfoForm";
import LocationForm from "./LocationForm";
import { ICONS } from "../../../assets";
import Preview from "./Preview";
import toast from "react-hot-toast";
import { usePostJobMutation } from "../../../redux/Features/Job/jobApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import SuccessMessage from "./SuccessMessage";

interface FormValues {
  // Job Details
  tuitionType: string[];
  salary: string;
  tutoringDays: string[];
  tutoringTime: string;
  category: string[];
  subjects: string[];
  guardianName: string;
  guardianPhoneNumber: string;
  otherRequirements: string;

  // Tutor Preference
  preferedTutorGender: string[];
  tutorGender: string[];

  // Student Info
  name: string;
  studentGender: string[];
  class: string[];
  noOfStudents: string;
  studentsInstituteName?: string;
  city: string[];
  area: string[];
  address: string;
}

const steps = [
  "Job Details",
  "Tutor Preferences",
  "Student Info",
  "Preview",
  "Thank You",
];

const HireTutorForm = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [postJob, { isLoading: isPostingJob }] = usePostJobMutation();
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { handleSubmit } = methods;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const onSubmit = async (data: FormValues) => {
    if (currentStep !== 3) return;
    try {
      const payload = {
        ...data,
        postedBy: user?._id,
        postedByModel: user?.role === "admin" ? "User" : "Guardian",
      };
      const response = await postJob(payload).unwrap();
      if (response?.success) {
        toast.success("Job posted successfully!");
        setCurrentStep(4); // Move to thank you step
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6 mt-5">
        {/* Heading */}
        {currentStep !== 4 && (
          <div className="flex flex-col items-center justify-center  mb-9">
            <h1 className="font-bold text-xl text-neutral-10">Hire a Tutor</h1>
            <p className="text-sm mt-[6px] text-neutral-10">
              Find expert tutors easily for personalized learning and academic
              success.
            </p>
          </div>
        )}
        {/* Progress Bar - Hide on thank you step */}
        {currentStep !== 4 && (
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-primary-10 transition-all duration-500 ease-in-out relative"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            >
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
          </div>
        )}

        <div className="mt-10"></div>

        {/* Step Content */}
        {currentStep === 0 && <JobDetailsForm user={user} />}
        {currentStep === 1 && <StudentInfoForm />}
        {currentStep === 2 && <LocationForm />}
        {currentStep === 3 && <Preview />}
        {currentStep === 4 && <SuccessMessage />}

        {/* Navigation - Hide on thank you step */}
        {currentStep !== 4 && (
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-300 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500/50"
              disabled={currentStep === 0}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer flex items-center gap-2"
              >
                {currentStep === 2 ? (
                  <>
                    Show Preview
                    <img
                      src={ICONS.eyeWhite}
                      alt="eye-icon"
                      className="size-4"
                    />
                  </>
                ) : (
                  <>
                    Next
                    <img
                      src={ICONS.rightArrow}
                      alt="right-arrow"
                      className="size-4"
                    />
                  </>
                )}
              </button>
            ) : (
              currentStep === 3 && (
                <button
                  type="button"
                  onClick={() => handleSubmit(onSubmit)()}
                  className="px-4 py-2 bg-primary-10 disabled:bg-primary-10/50 disabled:cursor-not-allowed text-white rounded cursor-pointer"
                  disabled={isPostingJob}
                >
                  {isPostingJob ? "Submitting..." : "Submit"}
                </button>
              )
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default HireTutorForm;
