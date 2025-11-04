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
import { useNavigate } from "react-router-dom";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";

interface FormValues {
  // Job Details
  tuitionType: string[];
  salary: string;
  tutoringDays: string[];
  tutoringTime: string;
  category: string[];
  subjects: string[];
  otherRequirements: string;

  // Tutor Preference
  preferedTutorGender: string[];
  tutorGender: string[];

  // Student Info
  name: string;
  studentGender: string[];
  class: string[];
  noOfStudents: string;
  city: string[];
  area: string[];
  address: string;
}

const steps = ["Job Details", "Tutor Preferences", "Student Info", "Preview"];

const HireTutorForm = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const navigate = useNavigate();
  const [postJob, { isLoading: isPostingJob }] = usePostJobMutation();
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { handleSubmit } = methods;

  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const payload = {
        ...data,
        postedBy: user?._id,
        postedByModel: user?.role === "admin" ? "User" : "Guardian",
      };
      const response = await postJob(payload).unwrap();
      if (response?.success) {
        toast.success("Job posted successfully!");
        if (user?.role === "admin") navigate("/dashboard/admin/posted-jobs");
        else if (user?.role === "guardian")
          navigate("/dashboard/guardian/posted-jobs");
        else navigate("/dashboard/staff/posted-jobs");
      };
    } catch (err: any) {
      toast.error(err?.data?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-10 transition-all duration-500 ease-in-out relative"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          >
            {/* Percentage inside blue area */}
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 0 && <JobDetailsForm />}
        {currentStep === 1 && <StudentInfoForm />}
        {currentStep === 2 && <LocationForm />}
        {currentStep === 3 && <Preview />}

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
            >
              Previous
            </button>
          )}

          {currentStep === 2 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer flex items-center gap-2"
            >
              Show Preview
              <img src={ICONS.eyeWhite} alt="eye-icon" className="size-4" />
            </button>
          ) : currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer flex items-center gap-2"
            >
              Next
              <img
                src={ICONS.rightArrow}
                alt="right-arrow"
                className="size-4"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer"
              disabled={isPostingJob}
            >
              {isPostingJob ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default HireTutorForm;
