/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { filterData } from "../../../../constants/filterData";
import MultiSelectDropdown from "../../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { useEffect, useState } from "react";
import { useUpdateTutorProfileInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import toast from "react-hot-toast";

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
  const [updateTutorProfileInfo, { isLoading }] =
    useUpdateTutorProfileInfoMutation();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTutoringStyles, setSelectedTutoringStyles] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string[]>([]);
  const [selectedPlaceOfTuition, setSelectedPlaceOfTuition] = useState<
    string[]
  >([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TTuitionRelatedInfoProps["tuitionRelatedInfo"]>();

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
      setSelectedClass(defaultValues?.preferences?.preferredClasses);
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
          preferredClasses: selectedClass,
          preferredSubjects: data.preferredSubjects,
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
      };
      const response = await updateTutorProfileInfo(payload).unwrap();
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
          label="Preferred Classes"
          name="preferences.preferredClasses"
          options={filterData.class}
          value={selectedClass}
          onChange={setSelectedClass}
          isRequired={false}
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
        {/* Preferred Subjects */}
        <TextInput
          label="Preferred Subjects"
          placeholder="Enter preferred subjects (comma separated)"
          error={errors?.preferredSubjects as any}
          {...register("preferredSubjects")}
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
