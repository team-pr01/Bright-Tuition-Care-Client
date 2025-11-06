/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import { filterData } from "../../../constants/filterData";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import { ICONS } from "../../../assets";
import { useState } from "react";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";

const Preview = () => {
  const [isEditEnable, setIsEditEnable] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<any>();
  
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
        <button
          onClick={() => setIsEditEnable(!isEditEnable)}
          className="cursor-pointer flex items-center gap-1 text-primary-10"
        >
          <img src={ICONS.pen} alt="" className="size-4" /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
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

        {/* Conditionally show Curriculum field when Category is English Medium */}
        {watch("category") === "English Medium" && (
          <SelectDropdown
            label="Curriculum"
            options={["Ed-Excel", "Cambridge", "IB"]}
            {...register("curriculum", { required: "Curriculum is required" })}
            isDisabled={!isEditEnable}
          />
        )}

        <TextInput
          label="Subjects"
          placeholder="Enter subjects"
          error={errors.subjects}
          value={watch("subjects")}
          isDisabled={!isEditEnable}
          {...register("subjects")}
        />

        <SelectDropdown
          label="Tutoring Days"
          options={filterData.daysPerWeek}
          {...register("tutoringDays")}
          isDisabled={!isEditEnable}
        />

        <TextInput
          label="Tutoring Time"
          placeholder="Ex: 10:00 AM - 12:00 PM"
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

        <MultiSelectDropdown
          label="Class"
          name="class"
          options={filterData.class}
          value={watch("class") || []}
          onChange={(val) => setValue("class", val)}
          isDisabled={!isEditEnable}
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
          error={errors.noOfStudents}
          value={watch("noOfStudents")}
          isDisabled={!isEditEnable}
          {...register("noOfStudents")}
          isRequired={false}
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
