/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";
import { useEffect } from "react";
import type { TJobs } from "../../../types/job.types";
import Textarea from "../../Reusable/TextArea/TextArea";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../types/loggedinUser.types";
import { useLocation } from "react-router-dom";
import SelectDropdownWithSearch from "../../Reusable/SelectDropdownWithSearch/SelectDropdownWithSearch";

const LocationForm = ({ defaultValues }: { defaultValues?: TJobs }) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const location = useLocation();
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
      setValue("jobUpdate", defaultValues.jobUpdate || "");
    }
  }, [defaultValues, setValue]);

  // watch raw values
  const rawCity = watch("city");
  const rawArea = watch("area");

  // normalize to arrays so .flatMap etc. always works
  const selectedCity: string[] = Array.isArray(rawCity)
    ? rawCity
    : rawCity
    ? [rawCity]
    : [];

  const selectedArea: string[] = Array.isArray(rawArea)
    ? rawArea
    : rawArea
    ? [rawArea]
    : [];

  // Dynamically update areas based on city selection
  const areaOptions = selectedCity.flatMap((cityName: string) => {
    const cityObj = filterData.cityCorporationWithLocation.find(
      (c) => c.name === cityName
    );
    return cityObj?.locations || [];
  });

  const isJobUpdateFieldVisible =
    (location.pathname.startsWith("/dashboard/admin/edit-job") &&
      user?.role === "admin") ||
    (location.pathname.startsWith("/dashboard/staff/edit-job") &&
      user?.role === "staff");

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <SelectDropdownWithSearch
          label="City"
          name="city"
          options={filterData.cityCorporationWithLocation.map((c) => c.name)}
          value={selectedCity}
          onChange={(val) => setValue("city", val)}
          dropdownDirection="top-full"
        />

        <SelectDropdownWithSearch
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

      {isJobUpdateFieldVisible && (
        <div className="bg-primary-10/10 p-3 rounded-lg">
          {/* Job Update */}
          <Textarea
            label="Job Update"
            placeholder="Enter job update"
            error={errors.jobUpdate}
            {...register("jobUpdate")}
            isRequired={false}
          />
        </div>
      )}
    </div>
  );
};

export default LocationForm;
