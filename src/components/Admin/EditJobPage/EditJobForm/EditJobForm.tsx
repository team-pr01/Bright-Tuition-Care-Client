import { FormProvider, useForm } from "react-hook-form";
import JobDetailsForm from "../../../Guardian/HireTutorForm/JobDetailsForm";
import LocationForm from "../../../Guardian/HireTutorForm/LocationForm";
import StudentInfoForm from "../../../Guardian/HireTutorForm/StudentInfoForm";
import Button from "../../../Reusable/Button/Button";
import { Link } from "react-router-dom";

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

const EditJobForm = () => {
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Form Data", data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
        <JobDetailsForm />
        <StudentInfoForm />
        <LocationForm />

        <div className="flex items-center justify-end gap-5">
          <Link to={"/"}>
            <Button
              label="Cancel"
              variant="tertiary"
              className="text-sm py-2 lg:py-2"
            />
          </Link>
          <Button
            label="Update Details"
            variant="quaternary"
            className="text-sm py-2 lg:py-2"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditJobForm;
