/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { filterData } from "../../../../constants/filterData";
import MultiSelectDropdown from "../../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "../../../../redux/Features/User/userApi";

type TTuitionRelatedInfoProps = {
  tuitionRelatedInfo: {
    tutoringMethod: string;
    tuitionStyle: string[];
    availableDays: string[];
    preferredCategories?: string[] | string;
    preferredClasses?: string[] | string;
    preferredSubjects?: string;
    preferredLocation?: string;
    placeOfTutoring?: string;
    preferredLocations: string[];
    expectedSalary: string | number;
    totalExperience: string;
    experienceDetails: string;
    from?: string;
    to?: string;
  };
};

const UpdateTuitionRelatedInfoModal = ({
  setIsFormModalOpen,
  defaultValues,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: any;
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTutoringStyles, setSelectedTutoringStyles] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPlaceOfTuition, setSelectedPlaceOfTuition] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TTuitionRelatedInfoProps["tuitionRelatedInfo"]>();

  // Setting default values
  useEffect(() => {
    if (defaultValues) {
      setValue("tutoringMethod", defaultValues.tutoringMethod);
      setValue(
        "preferredSubjects",
        defaultValues.preferences?.preferredSubjects
      );
      setValue(
        "preferredLocation",
        defaultValues.preferences?.preferredLocation
      );
      setValue("expectedSalary", defaultValues.expectedSalary);
      setValue("totalExperience", defaultValues?.experience?.totalExperience);
      setValue(
        "experienceDetails",
        defaultValues?.experience?.experienceDetails
      );
      setValue("from", defaultValues.availableTime?.from);
      setValue("to", defaultValues.availableTime?.to);

      setSelectedDays(defaultValues.availableDays);
      setSelectedTutoringStyles(defaultValues.tutoringStyles);
      setSelectedCategory(defaultValues?.preferences?.preferredCategories);
      setSelectedClasses(defaultValues?.preferences?.preferredClasses);
      setSelectedSubjects(defaultValues?.preferences?.preferredSubjects);
      setSelectedPlaceOfTuition(defaultValues?.preferences?.placeOfTuition);
    }
  }, [defaultValues, setValue]);

  const handleUpdateInfo = async (
    data: TTuitionRelatedInfoProps["tuitionRelatedInfo"]
  ) => {
    try {
      const payload = {
        tuitionPreference: {
          tutoringMethod: data.tutoringMethod,
          tuitionStyle: selectedTutoringStyles,
          availableDays: selectedDays,
          preferredCategories: selectedCategory,
          preferredClasses: selectedClasses,
          preferredSubjects: selectedSubjects,
          placeOfTuition: selectedPlaceOfTuition,
          preferredLocation: data.preferredLocation,
          expectedSalary: data.expectedSalary,
          availableTime: {
            from: data.from,
            to: data.to,
          },
        },
        experience: {
          totalExperience: data.totalExperience,
          experienceDetails: data.experienceDetails,
        },
        profileCompleted: 30,
      };
      const response = await updateProfile(payload).unwrap();
      if (response.success) {
        toast.success(response.message || "Tuition info updated successfully");
        setIsFormModalOpen(false);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error updating info. Please try again."
      );
    }
  };

  const [classOptions, setClassOptions] = useState<
    {
      [x: string]: any;
      id: string;
      name: string;
    }[]
  >([]);

  const [subjectsInitialized, setSubjectsInitialized] = useState(false);

  // Build class options whenever category changes
  useEffect(() => {
    const classes = filterData.tutoringCatalog
      .filter((cat) => selectedCategory.includes(cat.category))
      .flatMap((cat) => cat.classes);

    setClassOptions(classes);
  }, [selectedCategory]);

  // After class options loaded, apply default classes only once
  useEffect(() => {
    if (!defaultValues) return;
    if (classOptions.length === 0) return;

    setSelectedClasses(defaultValues.preferences?.preferredClasses || []);
  }, [classOptions, defaultValues]);

  // Build subject options
  useEffect(() => {
    if (selectedClasses.length === 0) {
      setSubjectOptions([]);
      setSelectedSubjects([]);
      return;
    }

    const subjects = classOptions
      .filter((cls) => selectedClasses.includes(cls.name))
      .flatMap((cls) => cls.subjects);

    setSubjectOptions([...new Set(subjects)]);
  }, [selectedClasses, classOptions]);

  // Apply default subjects only once
  useEffect(() => {
    if (!defaultValues) return;
    if (subjectsInitialized) return;

    if (subjectOptions.length > 0) {
      setSelectedSubjects(defaultValues.preferences?.preferredSubjects || []);
      setSubjectsInitialized(true);
    }
  }, [subjectOptions, defaultValues, subjectsInitialized]);

  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-5 mt-6">
      {/* Tutoring Method */}
      <Textarea
        label="Tutoring Method"
        placeholder="Enter tutoring method and explain how you will guide your student"
        error={errors?.tutoringMethod}
        {...register("tutoringMethod")}
        isRequired={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Time */}
        <TextInput
          label="Available Time (From)"
          type="time"
          placeholder="Enter available time (e.g. 5-7 PM)"
          error={errors.from}
          {...register("from")}
          isRequired={false}
        />
        <TextInput
          label="Available Time (To)"
          type="time"
          placeholder="Enter available time (e.g. 5-7 PM)"
          error={errors.to}
          {...register("to")}
          isRequired={false}
        />

        {/* Tutoring Styles */}
        <MultiSelectDropdown
          label="Tutoring Styles"
          name="tutoringStyles"
          options={filterData.tutoringStyles}
          value={selectedTutoringStyles}
          onChange={setSelectedTutoringStyles}
          isRequired={false}
        />

        {/* Available Days */}
        <MultiSelectDropdown
          label="Available Days"
          name="availableDays"
          options={[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]}
          value={selectedDays}
          onChange={setSelectedDays}
          isRequired={false}
        />

        {/* Preferences */}
        {/* Preferred Categories */}
        <MultiSelectDropdown
          label="Preferred Categories"
          name="preferences.preferredCategories"
          options={filterData.category}
          value={selectedCategory}
          onChange={setSelectedCategory}
          isRequired={false}
        />

        {/* Preferred Classes */}
        <MultiSelectDropdown
          label="Classes"
          name="preferences.preferredClasses"
          options={classOptions.map((c) => c.name)} // only names as strings
          value={selectedClasses}
          onChange={setSelectedClasses}
          isRequired={false}
        />

        {/* Subjects based on selected classes */}
        <MultiSelectDropdown
          label="Subjects"
          name="preferences.preferredSubjects"
          options={subjectOptions}
          value={selectedSubjects}
          onChange={setSelectedSubjects}
          isRequired={false}
          noDataMessage={"Select class first"}
        />

        {/* Place of Tutoring */}
        <MultiSelectDropdown
          label="Place of Tutoring"
          name="preferences.placeOfTutoring"
          options={filterData.placeOfTuition}
          value={selectedPlaceOfTuition}
          onChange={setSelectedPlaceOfTuition}
          isRequired={false}
        />

        {/* Preferred Location */}
        <TextInput
          label="Preferred Location"
          placeholder="Ex: Dhaka, Banani"
          error={errors?.preferredLocation}
          {...register("preferredLocation")}
          isRequired={false}
        />

        {/* Expected Salary */}
        <TextInput
          label="Expected Salary"
          type="text"
          placeholder="Enter expected salary"
          error={errors.expectedSalary}
          {...register("expectedSalary", {
            required: "Expected salary is required",
          })}
          isRequired={false}
        />
      </div>

      {/* Total Experience */}
      <TextInput
        label="Total Experience"
        placeholder="Enter total experience (e.g. 2 years)"
        error={errors.totalExperience}
        {...register("totalExperience")}
        isRequired={false}
      />

      {/* Experience Details */}
      <Textarea
        label="Experience Details"
        placeholder="Write experience details"
        error={errors.experienceDetails}
        {...register("experienceDetails")}
        isRequired={false}
      />

      <div className="flex items-center gap-4 justify-end">
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          onClick={() => setIsFormModalOpen(false)}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>
    </form>
  );
};

export default UpdateTuitionRelatedInfoModal;
