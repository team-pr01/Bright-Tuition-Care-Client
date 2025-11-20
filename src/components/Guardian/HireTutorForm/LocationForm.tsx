/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";
import { ICONS } from "../../../assets";
import { useState } from "react";

const LocationForm = () => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
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

  const [isDirectionAdded, setIsDirectionAdded] = useState<boolean>(false);
  // Function to get user's location and save Google Maps URL
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Store as Google Maps URL
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Save to form value
        setValue("locationDirection", googleMapsUrl);

        setIsDirectionAdded(true);
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow access.");
        console.error(error);
      }
    );
  };

  return (
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

      <TextInput
        label="Address"
        placeholder="Enter address"
        error={errors.address}
        {...register("address", { required: "Address is required" })}
      />

      <div className="relative">
        <TextInput
          label="Location Direction"
          placeholder=""
          error={errors.locationDirection}
          {...register("locationDirection")}
          isDisabled={true}
          isRequired={false}
        />

        {/* Button to capture location */}
        {!isDirectionAdded && (
          <button
            type="button"
            onClick={getLocation}
            className="text-primary-10 text-sm cursor-pointer absolute bottom-[13px] right-3 flex items-center gap-1"
          >
            <img
              src={ICONS.location}
              alt="location-icon"
              className="size-4 mb-1"
            />
            Allow
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationForm;
