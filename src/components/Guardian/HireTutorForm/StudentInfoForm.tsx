/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import TextInput from "../../Reusable/TextInput/TextInput";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";

const StudentInfoForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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

      <SelectDropdown
        label="Student Gender"
        options={filterData.studentGender}
        {...register("studentGender", {
          required: "Student gender is required",
        })}
      />
      {/* <MultiSelectDropdown
       label="Student Gender"
       name="studentGender"
       options={filterData.studentGender}
       value={watch("studentGender") || []}
       onChange={(val) => setValue("studentGender", val)}
      /> */}

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
