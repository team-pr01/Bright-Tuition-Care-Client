/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import { ICONS } from "../../../assets";
import { useState } from "react";

const Preview = () => {
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();

  const selectedTuitionType = watch("tuitionType") || [];
  const selectedCategory = watch("category") || [];
  const selectedTutorGender = watch("preferedTutorGender") || [];
  const selectedCity = watch("city") || [];
  const selectedArea = watch("area") || [];

  // Dynamically update areas based on city selection
  const areaOptions = selectedCity.flatMap((cityName: string) => {
    const cityObj = filterData.cityCorporationWithLocation.find(
      (c) => c.name === cityName
    );
    return cityObj?.locations || [];
  });

  return (
    <div className="flex flex-col gap-4 lg:gap-5 font-Nunito">
      <div className="flex items-center gap-2">
        Need any correction?
        <button onClick={() => setIsEditEnable(!isEditEnable)} className="cursor-pointer flex items-center gap-1 text-primary-10">
          <img src={ICONS.pen} alt="" className="size-4" /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        <TextInput
          label="Job Title"
          placeholder="Enter job title"
          error={errors.title}
          value={watch("title")}
          isDisabled={!isEditEnable}
          {...register("title")}
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

        <MultiSelectDropdown
          label="Tuition Type"
          name="tuitionType"
          options={filterData.tuitionType}
          value={selectedTuitionType}
          onChange={(val) => setValue("tuitionType", val)}
          isDisabled={!isEditEnable}
        />

        <MultiSelectDropdown
          label="Category"
          name="category"
          options={filterData.category}
          value={selectedCategory}
          onChange={(val) => setValue("category", val)}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Tutoring Time"
          placeholder="Ex: 10:00 AM - 12:00 PM"
          error={errors.tutoringTime}
          value={watch("tutoringTime")}
          isDisabled={!isEditEnable}
          {...register("tutoringTime")}
        />

        <MultiSelectDropdown
          label="Tutoring Days"
          name="tutoringDays"
          options={filterData.daysPerWeek}
          value={watch("tutoringDays") || []}
          onChange={(val) => setValue("tutoringDays", val)}
          isDisabled={!isEditEnable}
        />

        <MultiSelectDropdown
          label="Preferred Tutor"
          name="preferedTutorGender"
          options={filterData.tutorGender}
          value={selectedTutorGender}
          onChange={(val) => setValue("preferedTutorGender", val)}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Number of Students"
          placeholder="Enter number"
          error={errors.noOfStudents}
          value={watch("noOfStudents")}
          isDisabled={!isEditEnable}
          {...register("noOfStudents")}
        />

        <MultiSelectDropdown
          label="Student Gender"
          name="studentGender"
          options={filterData.studentGender}
          value={watch("studentGender") || []}
          onChange={(val) => setValue("studentGender", val)}
          isDisabled={!isEditEnable}
        />

        <MultiSelectDropdown
          label="Class"
          name="class"
          options={filterData.class}
          value={watch("class") || []}
          onChange={(val) => setValue("class", val)}
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
          error={errors.locationUrl}
          value={watch("locationUrl")}
          isDisabled={!isEditEnable}
          {...register("locationUrl")}
        />
      </div>

      {/* Full-width fields */}
      <TextInput
        label="Subjects"
        placeholder="Enter subjects"
        error={errors.subjects}
        value={watch("subjects")}
        isDisabled={!isEditEnable}
        {...register("subjects")}
      />

      <Textarea
        label="Other Requirements"
        placeholder="Any other requirements"
        error={errors.otherRequirements}
        value={watch("otherRequirements")}
        isDisabled={!isEditEnable}
        {...register("otherRequirements")}
        rows={4}
      />
    </div>
  );
};

export default Preview;
