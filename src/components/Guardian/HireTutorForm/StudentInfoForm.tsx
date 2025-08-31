/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import TextInput from "../../Reusable/TextInput/TextInput";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";

const StudentInfoForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();

  const selectedTutorGender = watch("preferedTutorGender") || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      <MultiSelectDropdown
        label="Preferred Tutor"
        name="preferedTutor"
        options={filterData.tutorGender}
        value={selectedTutorGender}
        onChange={(val) => setValue("preferedTutor", val)}
      />

      <TextInput
        label="Number of Students"
        placeholder="Enter number"
        error={errors.noOfStudents}
        {...register("noOfStudents", { required: "Number is required" })}
      />

      <MultiSelectDropdown
        label="Student Gender"
        name="studentGender"
        options={filterData.studentGender}
        value={watch("studentGender") || []}
        onChange={(val) => setValue("studentGender", val)}
      />

      <MultiSelectDropdown
        label="Class"
        name="class"
        options={filterData.class}
        value={watch("class") || []}
        onChange={(val) => setValue("class", val)}
      />
    </div>
  );
};

export default StudentInfoForm;
