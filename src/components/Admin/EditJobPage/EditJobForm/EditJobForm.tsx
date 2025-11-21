/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";
import JobDetailsForm from "../../../Guardian/HireTutorForm/JobDetailsForm";
import LocationForm from "../../../Guardian/HireTutorForm/LocationForm";
import StudentInfoForm from "../../../Guardian/HireTutorForm/StudentInfoForm";
import Button from "../../../Reusable/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useGetSingleJobByIdQuery, useUpdateJobMutation } from "../../../../redux/Features/Job/jobApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import toast from "react-hot-toast";

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

const EditJobForm = ({jobId} : {jobId: string}) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [updateJob, {isLoading}] = useUpdateJobMutation();
  const {data} = useGetSingleJobByIdQuery(jobId);
  const methods = useForm<FormValues>({ mode: "onBlur" });
  const { handleSubmit } = methods;
  const navigate = useNavigate();

  const onSubmit = async(data: FormValues) => {
    try {
      const payload = {
        ...data,
      };
      const response = await updateJob({id:jobId, data:payload}).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success("Job updated successfully!");
        if (user?.role === "admin") navigate("/dashboard/admin/posted-jobs");
        else if (user?.role === "guardian")
          navigate("/dashboard/guardian/posted-jobs");
        else navigate("/dashboard/staff/posted-jobs");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Submission failed. Please try again.");
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
        <JobDetailsForm defaultValues={data?.data || {}} />
        <StudentInfoForm defaultValues={data?.data || {}} />
        <LocationForm defaultValues={data?.data || {}} />

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
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditJobForm;
