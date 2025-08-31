/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { filterData } from "../../../constants/filterData";
import Textarea from "../../Reusable/TextArea/TextArea";

const JobDetailsForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();

  const selectedTuitionType = watch("tuitionType") || [];
  const selectedCategory = watch("category") || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <TextInput
          label="Job Title"
          placeholder="Enter job title"
          error={errors.title}
          {...register("title", { required: "Job title is required" })}
        />

        <TextInput
          label="Salary (BDT)"
          type="number"
          placeholder="Enter salary"
          error={errors.salary}
          {...register("salary", { required: "Salary is required" })}
        />

        <MultiSelectDropdown
          label="Tuition Type"
          name="tuitionType"
          options={filterData.tuitionType}
          value={selectedTuitionType}
          onChange={(val) => setValue("tuitionType", val)}
        />

        <MultiSelectDropdown
          label="Category"
          name="category"
          options={filterData.category}
          value={selectedCategory}
          onChange={(val) => setValue("category", val)}
        />

        <TextInput
          label="Tutoring Time"
          type=""
          placeholder="Ex: 10:00 AM - 12:00 PM"
          error={errors.tutoringTime}
          {...register("tutoringTime", { required: "Time is required" })}
        />

        <MultiSelectDropdown
          label="Tutoring Days"
          name="tutoringDays"
          options={filterData.daysPerWeek}
          value={watch("tutoringDays") || []}
          onChange={(val) => setValue("tutoringDays", val)}
        />
      </div>

      <TextInput
        label="Subjects"
        placeholder="Enter subjects"
        error={errors.subjects}
        {...register("subjects", { required: "Subjects are required" })}
      />

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

export default JobDetailsForm;
