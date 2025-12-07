/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";
import { useEffect } from "react";
import type { TJobs } from "../../../types/job.types";

const LocationForm = ({ defaultValues }: { defaultValues?: TJobs }) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext<any>();

  useEffect(() => {
    if (defaultValues) {
      setValue("city", defaultValues.city || []);
      setValue("area", defaultValues.area || []);
      setValue("address", defaultValues.address || "");
    }
  }, [defaultValues, setValue]);

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
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <MultiSelectDropdown
          label="City"
          name="city"
          options={filterData.cityCorporationWithLocation.map((c) => c.name)}
          value={selectedCity}
          onChange={(val) => setValue("city", val)}
          dropdownDirection="top-full"
        />

        <MultiSelectDropdown
          label="Area"
          name="area"
          options={areaOptions}
          value={selectedArea}
          onChange={(val) => setValue("area", val)}
          dropdownDirection="top-full"
        />
      </div>
      <TextInput
        label="Address"
        placeholder="Enter address"
        error={errors.address}
        {...register("address", { required: "Address is required" })}
      />
    </div>
  );
};

export default LocationForm;
