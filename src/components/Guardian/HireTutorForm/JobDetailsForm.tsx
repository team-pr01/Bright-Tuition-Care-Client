/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";

const JobDetailsForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<any>();

  const selectedCategory = watch("category");

  const curriculumOptions = ["Ed-Excel", "Cambridge", "IB"];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <SelectDropdown
          label="Tuition Type"
          options={filterData.tuitionType}
          {...register("tuitionType", { required: "Tuition type is required" })}
        />

        <SelectDropdown
          label="Category"
          options={filterData.category}
          {...register("category", { required: "Category is required" })}
        />

        {/* if Category is English Medium then will show */}
        {selectedCategory === "English Medium" && (
          <SelectDropdown
            label="Curriculum"
            options={curriculumOptions}
            {...register("curriculum", { required: "Curriculum is required" })}
          />
        )}

        <TextInput
          label="Subjects"
          placeholder="Enter subjects"
          error={errors.subjects}
          {...register("subjects", { required: "Subjects are required" })}
        />

        <SelectDropdown
          label="Tutoring Days"
          options={filterData.daysPerWeek}
          {...register("tutoringDays", {
            required: "Tutoring days is required",
          })}
        />

        <TextInput
          label="Tutoring Time"
          placeholder="Ex: 10:00 AM - 12:00 PM"
          error={errors.tutoringTime}
          {...register("tutoringTime")}
          isRequired={false}
        />

        <TextInput
          label="Salary (BDT)"
          type="number"
          placeholder="Enter salary"
          error={errors.salary}
          {...register("salary", { required: "Salary is required" })}
        />
      </div>
    </div>
  );
};

export default JobDetailsForm;
