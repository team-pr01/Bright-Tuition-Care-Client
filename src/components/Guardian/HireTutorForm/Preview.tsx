/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import { ICONS } from "../../../assets";
import { useEffect, useState } from "react";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";
import { useSelector } from "react-redux";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

const Preview = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useFormContext<any>();

  const selectedCity = watch("city") || [];
  const selectedArea = watch("area") || [];
  const selectedCategory = watch("category");
  const selectedClass = watch("class");
  const selectedSubject = watch("subjects") || [];

  // Dynamically update areas based on city selection
  const areaOptions = selectedCity.flatMap((cityName: string) => {
    const cityObj = filterData.cityCorporationWithLocation.find(
      (c) => c.name === cityName
    );
    return cityObj?.locations || [];
  });

  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);

  // ---------- UPDATE CLASS OPTIONS WHEN CATEGORY CHANGES ----------
  useEffect(() => {
    if (!selectedCategory) {
      setClassOptions([]);
      setSubjectOptions([]);
      setValue("subjects", []); // Keep this one - when category is cleared
      return;
    }

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    if (categoryData) {
      const extractedClasses = categoryData.classes.map((cls) => cls.name);
      setClassOptions(extractedClasses);
    }

    // REMOVE THIS: setValue("subjects", []);
    setSubjectOptions([]);
  }, [selectedCategory, setValue]);

  // ---------- UPDATE SUBJECT OPTIONS WHEN CLASS CHANGES ----------
  useEffect(() => {
    if (!selectedClass || !selectedCategory) {
      setSubjectOptions([]);
      // Only reset if class is being cleared, not when it changes
      if (!selectedClass) {
        setValue("subjects", []);
      }
      return;
    }

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    const classData = categoryData?.classes.find(
      (cls) => cls.name === selectedClass
    );

    if (classData) {
      setSubjectOptions(classData.subjects);
    }

    // REMOVE THIS: setValue("subjects", []);
  }, [selectedClass, selectedCategory, setValue]);

  console.log("Selected Subjects:", selectedSubject);

  const curriculumOptions = ["Ed-Excel", "Cambridge", "IB"];

  return (
    <div className="flex flex-col gap-4 lg:gap-5 font-Nunito">
      <div className="flex items-center gap-2">
        Need any correction?
        <button
          onClick={() => setIsEditEnable(!isEditEnable)}
          className="cursor-pointer flex items-center gap-1 text-primary-10"
        >
          <img src={ICONS.pen} alt="" className="size-4" /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {user?.role === "admin" && (
          <TextInput
            label="Guardian Name"
            placeholder="Enter guardian name"
            error={errors.guardianName}
            {...register("guardianName")}
            isRequired={false}
          />
        )}

        {user?.role === "admin" && (
          <TextInput
            label="Guardian Phone Number"
            placeholder="Enter guardian phone number"
            error={errors.guardianPhoneNumber}
            {...register("guardianPhoneNumber")}
          />
        )}
        
        <SelectDropdown
          label="Tuition Type"
          options={filterData.tuitionType}
          {...register("tuitionType", { required: "Tuition type is required" })}
          isDisabled={!isEditEnable}
        />

        <SelectDropdown
          label="Category"
          options={filterData.category}
          {...register("category", { required: "Category is required" })}
          isDisabled={!isEditEnable}
        />

        <Controller
          name="class"
          control={control}
          rules={{ required: "Class is required" }}
          render={({ field }) => (
            <SelectDropdown
              label="Class"
              options={classOptions}
              error={errors.class}
              isDisabled={!isEditEnable}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Conditionally show Curriculum field when Category is English Medium */}
        {watch("category") === "English Medium" && (
          <SelectDropdown
            label="Curriculum"
            options={curriculumOptions}
            {...register("curriculum", { required: "Curriculum is required" })}
            isDisabled={!isEditEnable}
          />
        )}

        {/* SUBJECTS */}
        <Controller
          name="subjects"
          control={control}
          render={({ field }) => (
            <MultiSelectDropdown
              label="Subjects"
              name="subjects"
              options={subjectOptions}
              value={field.value || []}
              onChange={field.onChange}
              noDataMessage="Please select class first"
              isDisabled={!selectedClass || !isEditEnable}
            />
          )}
        />

        <SelectDropdown
          label="Tutoring Days"
          options={filterData.daysPerWeek}
          {...register("tutoringDays")}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Tutoring Time"
          placeholder="Ex: 5:00 PM - 6:00 PM"
          error={errors.tutoringTime}
          value={watch("tutoringTime")}
          isDisabled={!isEditEnable}
          {...register("tutoringTime")}
          isRequired={false}
        />

        <TextInput
          label="Salary (BDT)"
          type="number"
          placeholder="Enter salary"
          error={errors.salary}
          value={watch("salary")}
          isDisabled={!isEditEnable}
          {...register("salary")}
        />

        <SelectDropdown
          label="Student Gender"
          options={filterData.studentGender}
          {...register("studentGender", {
            required: "Student gender is required",
          })}
          isDisabled={!isEditEnable}
        />

        <SelectDropdown
          label="Preferred Tutor"
          options={filterData.tutorGender}
          {...register("preferredTutorGender", {
            required: "Gender is required",
          })}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Number of Students"
          placeholder="Enter number"
          error={errors.numberOfStudents}
          value={watch("numberOfStudents")}
          isDisabled={!isEditEnable}
          {...register("numberOfStudents")}
          isRequired={false}
        />

        <TextInput
          label="Institute Name"
          placeholder="Enter student's institute name"
          error={errors.studentsInstituteName}
          value={watch("studentsInstituteName")}
          {...register("studentsInstituteName")}
          isRequired={false}
          isDisabled={!isEditEnable}
        />

        <MultiSelectDropdown
          label="City"
          name="city"
          options={filterData.cityCorporationWithLocation.map((c) => c.name)}
          value={selectedCity}
          onChange={(val) => setValue("city", val)}
          isDisabled={!isEditEnable}
        />

        <MultiSelectDropdown
          label="Area"
          name="area"
          options={areaOptions}
          value={selectedArea}
          onChange={(val) => setValue("area", val)}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Address"
          placeholder="Enter address"
          error={errors.address}
          value={watch("address")}
          isDisabled={!isEditEnable}
          {...register("address")}
        />

        {/* Hidden field to store location URL */}
        <TextInput
          label="Location URL"
          error={errors.locationDirection}
          value={watch("locationDirection")}
          isDisabled={!isEditEnable}
          {...register("locationDirection")}
          isRequired={false}
        />
      </div>

      <Textarea
        label="Other Requirements"
        placeholder="Any other requirements"
        error={errors.otherRequirements}
        value={watch("otherRequirements")}
        isDisabled={!isEditEnable}
        {...register("otherRequirements")}
        rows={4}
        isRequired={false}
      />
    </div>
  );
};

export default Preview;
