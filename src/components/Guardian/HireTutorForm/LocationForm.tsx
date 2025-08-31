/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import { filterData } from "../../../constants/filterData";

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
        setValue("locationUrl", googleMapsUrl);
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
      />

      <MultiSelectDropdown
        label="Area"
        name="area"
        options={areaOptions}
        value={selectedArea}
        onChange={(val) => setValue("area", val)}
      />

      <TextInput
        label="Address"
        placeholder="Enter address"
        error={errors.address}
        {...register("address", { required: "Address is required" })}
      />

      {/* Hidden field to store location URL */}
      <TextInput
        label="Location URL"
        placeholder=""
        error={errors.locationUrl}
        {...register("locationUrl")}
        isDisabled={true}
      />

      {/* Button to capture location */}
      <div className="col-span-full mt-2">
        <button
          type="button"
          onClick={getLocation}
          className="px-2 py-2 bg-primary-10 text-sm text-white rounded cursor-pointer"
        >
          Allow Directions
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
