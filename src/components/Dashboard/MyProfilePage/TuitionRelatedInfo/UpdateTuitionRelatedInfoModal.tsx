/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { filterData } from "../../../../constants/filterData";
import MultiSelectDropdown from "../../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { useEffect, useState } from "react";

type TTuitionRelatedInfoProps = {
  tuitionRelatedInfo: {
    tutoringMethod: string;
    tutoringStyles: string[];
    availableDays: string[];
    time: string;
    location: {
      city: string;
      area: string;
    };
    preferences?: {
      preferredCategories?: string[] | string;
      preferredClasses?: string[] | string;
      preferredSubjects?: string[] | string;
      placeOfTutoring?: string;
      preferredLocations: string[];
    };
    expectedSalary: string | number;
    experience: {
      total: string;
      details: string;
    };
  };
};

const UpdateTuitionRelatedInfoModal = ({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTutoringStyles, setSelectedTutoringStyles] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string[]>([]);
  const [selectedPlaceOfTuition, setSelectedPlaceOfTuition] = useState<
    string[]
  >([]);

  // Update area options when city changes
  useEffect(() => {
    if (selectedCities.length === 0) {
      setAreaOptions([]);
      setSelectedAreas([]);
      return;
    }

    const locations = selectedCities.flatMap((cityName) => {
      const cityObj = filterData.cityCorporationWithLocation.find(
        (city) => city.name === cityName
      );
      return cityObj ? cityObj.locations : [];
    });

    // Remove duplicates and update state
    const uniqueLocations = [...new Set(locations)];
    setAreaOptions(uniqueLocations);
    setSelectedAreas([]);
  }, [selectedCities]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTuitionRelatedInfoProps["tuitionRelatedInfo"]>();

  const handleUpdateInfo = (
    data: TTuitionRelatedInfoProps["tuitionRelatedInfo"]
  ) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-5 mt-6">
      {/* Tutoring Method */}
      <Textarea
        label="Tutoring Method"
        placeholder="Enter tutoring method and explain how you will guide your student"
        error={errors?.tutoringMethod}
        {...register("tutoringMethod")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Time */}
        <TextInput
          label="Available Time"
          type="text"
          placeholder="Enter available time (e.g. 5-7 PM)"
          error={errors.time}
          {...register("time", { required: "Available time is required" })}
        />

        {/* Tutoring Styles */}
        <MultiSelectDropdown
          label="Tutoring Styles"
          name="tutoringStyles"
          options={filterData.tutoringStyles}
          value={selectedTutoringStyles}
          onChange={setSelectedTutoringStyles}
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
        />

        {/* City Dropdown */}
        <MultiSelectDropdown
          label="City"
          name="city"
          options={filterData.cityCorporationWithLocation.map((c) => c.name)}
          value={selectedCities}
          onChange={setSelectedCities}
        />

        {/* Area Dropdown */}
        <MultiSelectDropdown
          label="Area"
          name="area"
          options={areaOptions}
          value={selectedAreas}
          onChange={setSelectedAreas}
        />

        {/* Preferences */}
        {/* Preferred Categories */}
        <MultiSelectDropdown
          label="Preferred Categories"
          name="preferences.preferredCategories"
          options={filterData.category}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Preferred Classes */}
        <MultiSelectDropdown
          label="Preferred Classes"
          name="preferences.preferredClasses"
          options={filterData.class}
          value={selectedClass}
          onChange={setSelectedClass}
        />

        {/* Place of Tutoring */}
        <MultiSelectDropdown
          label="Place of Tutoring"
          name="preferences.placeOfTutoring"
          options={filterData.placeOfTuition}
          value={selectedPlaceOfTuition}
          onChange={setSelectedPlaceOfTuition}
        />

        {/* Preferred Subjects */}
        <TextInput
          label="Preferred Subjects"
          placeholder="Enter preferred subjects (comma separated)"
          error={errors?.preferences?.preferredSubjects as any}
          {...register("preferences.preferredSubjects")}
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
        />
      </div>
      {/* Total Experience */}
      <TextInput
        label="Total Experience"
        placeholder="Enter total experience (e.g. 2 years)"
        error={errors.experience?.total}
        {...register("experience.total")}
      />

      {/* Experience Details */}
      <Textarea
        label="Experience Details"
        placeholder="Write experience details"
        error={errors.experience?.details}
        {...register("experience.details", {
          required: "Experience details are required",
        })}
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
        />
      </div>
    </form>
  );
};

export default UpdateTuitionRelatedInfoModal;
