import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import JobDetailsForm from "./JobDetailsForm";
import StudentInfoForm from "./StudentInfoForm";
import LocationForm from "./LocationForm";

interface FormValues {
  // Job Details
  title: string;
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

const steps = ["Job Details", "Tutor Preferences", "Student Info"];

const HireTutorForm = () => {
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { handleSubmit } = methods;

  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = (data: FormValues) => {
    console.log("Form Data", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
         {/* Progress Bar */}
    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary-10 transition-all duration-500 ease-in-out"
        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
      />
    </div>
        {/* Step Content */}
        {currentStep === 0 && <JobDetailsForm />}
        {currentStep === 2 && <StudentInfoForm />}
        {currentStep === 1 && <LocationForm />}

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
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-primary-10 text-white rounded cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default HireTutorForm;
