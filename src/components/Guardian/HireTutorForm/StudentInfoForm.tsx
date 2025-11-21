/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import TextInput from "../../Reusable/TextInput/TextInput";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";
import Textarea from "../../Reusable/TextArea/TextArea";
import { useEffect } from "react";
import type { TJobs } from "../../../types/job.types";

const StudentInfoForm = ({defaultValues} : { defaultValues?: TJobs }) => {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext<any>();
  useEffect(() => {
    if (defaultValues) {
      setValue("studentGender", defaultValues.studentGender || "");
      setValue("preferredTutorGender", defaultValues.preferredTutorGender || "");
      setValue("numberOfStudents", defaultValues.numberOfStudents || "");
      setValue("otherRequirements", defaultValues.otherRequirements || "");
    }
  }, [defaultValues, setValue]);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <SelectDropdown
          label="Student Gender"
          options={filterData.studentGender}
          {...register("studentGender", {
            required: "Student gender is required",
          })}
        />

        <SelectDropdown
          label="Preferred Tutor"
          options={filterData.tutorGender}
          {...register("preferredTutorGender", {
            required: "Gender is required",
          })}
        />

        <TextInput
          label="Number of Students"
          placeholder="Enter number"
          error={errors.numberOfStudents}
          {...register("numberOfStudents")}
          isRequired={false}
        />
      </div>
      <Textarea
        label="Other Requirements"
        placeholder="Any other requirements"
        error={errors.otherRequirements}
        {...register("otherRequirements")}
        isRequired={false}
        rows={4}
      />
    </div>
  );
};

export default StudentInfoForm;
