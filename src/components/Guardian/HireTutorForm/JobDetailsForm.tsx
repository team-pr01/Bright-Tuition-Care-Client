/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { useEffect, useState } from "react";

const JobDetailsForm = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();

  const selectedCategory = watch("category");
  const selectedClass = watch("class");
  const selectedSubject = watch("subjects");

  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // ---------- UPDATE CLASS OPTIONS WHEN CATEGORY CHANGES ----------
  useEffect(() => {
    if (!selectedCategory) {
      setClassOptions([]);
      setSubjectOptions([]);
      setSelectedSubjects([]);
      return;
    }

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    if (categoryData) {
      const extractedClasses = categoryData.classes.map((cls) => cls.name);
      setClassOptions(extractedClasses);
    }

    setValue("class", "");
    setSubjectOptions([]);
    setSelectedSubjects([]);
  }, [selectedCategory, setValue]);

  // ---------- UPDATE SUBJECT OPTIONS WHEN CLASS CHANGES ----------
  useEffect(() => {
    if (!selectedClass || !selectedCategory) return;

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    const classData = categoryData?.classes.find(
      (cls) => cls.name === selectedClass
    );

    if (classData) {
      setSubjectOptions(classData.subjects);
    }

    setSelectedSubjects([]);
    setValue("subjects", []);
  }, [selectedClass, selectedCategory, setValue]);

  // ---------- UPDATE SUBJECTS IN RHF ----------
  useEffect(() => {
    setValue("subjects", selectedSubjects);
  }, [selectedSubjects, setValue]);

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

        {/* IF CATEGORY = ENGLISH MEDIUM SHOW CURRICULUM */}
        {selectedCategory === "English Medium" && (
          <SelectDropdown
            label="Curriculum"
            options={curriculumOptions}
            error={errors.curriculum}
            {...register("curriculum", { required: "Curriculum is required" })}
          />
        )}

        {/* CLASS */}
        <SelectDropdown
          label="Class"
          options={classOptions}
          error={errors.class}
          {...register("class", { required: "Class is required" })}
          isDisabled={!selectedCategory}
        />

        {/* SUBJECTS */}
        <MultiSelectDropdown
          label="Subjects"
          name="subjects"
          options={subjectOptions}
          value={selectedSubject}
          onChange={(val) => setValue("subjects", val)}
          noDataMessage="Please select class first"
          isDisabled={!selectedClass}
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
          placeholder="Ex: 5:00 PM - 6:00 PM"
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
