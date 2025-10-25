/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../../assets";
import { useState, useEffect } from "react";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { filterData } from "../../../constants/filterData";
import SearchInput from "../../Reusable/SearchBar/SearchBar";

// Filters.types.ts (optional file)
export type TFiltersProps = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;

  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
  areaOptions: string[];
  setAreaOptions: React.Dispatch<React.SetStateAction<string[]>>;

  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;

  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;

  selectedClass: string[];
  setSelectedClass: React.Dispatch<React.SetStateAction<string[]>>;

  selectedTutorGender: string[];
  setSelectedTutorGender: React.Dispatch<React.SetStateAction<string[]>>;

  selectedStudentGender: string[];
  setSelectedStudentGender: React.Dispatch<React.SetStateAction<string[]>>;

  selectedTuitionType: string[];
  setSelectedTuitionType: React.Dispatch<React.SetStateAction<string[]>>;

  totalJobs: number;
};

const Filters: React.FC<TFiltersProps> = ({
  keyword,
  setKeyword,
  selectedCities,
  setSelectedCities,
  selectedAreas,
  setSelectedAreas,
  areaOptions,
  setAreaOptions,
  selectedCategory,
  setSelectedCategory,
  selectedDays,
  setSelectedDays,
  selectedClass,
  setSelectedClass,
  selectedTutorGender,
  setSelectedTutorGender,
  selectedStudentGender,
  setSelectedStudentGender,
  selectedTuitionType,
  setSelectedTuitionType,
  totalJobs,
}) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);
  const handleResetFilters = () => {
    setSelectedCities([]);
    setSelectedAreas([]);
    setSelectedCategory([]);
    setSelectedDays([]);
    setSelectedClass([]);
    setSelectedTutorGender([]);
    setSelectedStudentGender([]);
    setSelectedTuitionType([]);
  };

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
  const buttonCommonClassNames =
    "flex items-center justify-center gap-2 leading-[24px] w-fit w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 px-3 lg:px-6 text-sm md:text-lg";

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <div className="flex items-center gap-3">
          <img src={ICONS.liveJobs} alt="" className="size-8" />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold leading-11 text-primary-50">
            {totalJobs} Live Jobs
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
            placeholder="Search by job title or id..."
          />
          <button
            onClick={() => setIsAccordingOpen(!isAccordingOpen)}
            className="flex items-center justify-center gap-[10px] px-3 py-2 bg-white border border-primary-30 rounded-lg cursor-pointer w-[145px]"
          >
            <img src={ICONS.filter} alt="" className="size-5" />
            <h1 className="font-medium leading-6 text-primary-50">Filters</h1>
          </button>
        </div>
      </div>

      <div
        className={`w-full bg-primary-65 border border-primary-10/20 rounded-xl p-6 transition-all duration-300 ease-in-out ${
          isAccordingOpen
            ? "grid-rows-[1fr] opacity-100 mt-4 mb-6"
            : "grid-rows-[0fr] opacity-0 h-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* City Dropdown */}
          <MultiSelectDropdown
            label="City"
            name="city"
            options={filterData.cityCorporationWithLocation.map((c) => c.name)}
            value={selectedCities}
            onChange={setSelectedCities}
            isRequired={false}
          />

          {/* Area Dropdown */}
          <MultiSelectDropdown
            label="Area"
            name="area"
            options={areaOptions}
            value={selectedAreas}
            onChange={setSelectedAreas}
            isRequired={false}
          />

          {/* Days Per Week */}
          <MultiSelectDropdown
            label="Days Per Week"
            name="daysPerWeek"
            options={filterData.daysPerWeek}
            value={selectedDays}
            onChange={setSelectedDays}
            isRequired={false}
          />

          {/* Category */}
          <MultiSelectDropdown
            label="Category"
            name="category"
            options={filterData.category}
            value={selectedCategory}
            onChange={setSelectedCategory}
            isRequired={false}
          />

          {/* Tuition Type */}
          <MultiSelectDropdown
            label="Tuition Type"
            name="tuitionType"
            options={filterData.tuitionType}
            value={selectedTuitionType}
            onChange={setSelectedTuitionType}
            isRequired={false}
          />

          {/* Class */}
          <MultiSelectDropdown
            label="Class"
            name="class"
            options={filterData.class}
            value={selectedClass}
            onChange={setSelectedClass}
            isRequired={false}
          />

          {/* Tutor Gender */}
          <MultiSelectDropdown
            label="Tutor Gender"
            name="tutorGender"
            options={filterData.tutorGender}
            value={selectedTutorGender}
            onChange={setSelectedTutorGender}
            isRequired={false}
          />

          {/* Student Gender */}
          <MultiSelectDropdown
            label="Student Gender"
            name="studentGender"
            options={filterData.studentGender}
            value={selectedStudentGender}
            onChange={setSelectedStudentGender}
            isRequired={false}
          />
        </div>
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <img src={ICONS.reset} alt="" className="size-4" />
            <h1 className="font-medium leading-6 text-primary-10">Reset</h1>
          </button>

          <div className="flex items-center gap-5 justify-end">
            <button
              onClick={() => setIsAccordingOpen(!isAccordingOpen)}
              className={`border border-primary-10 text-primary-10 hover:bg-primary-10 hover:text-white w-fit ${buttonCommonClassNames}`}
            >
              Close
            </button>
            <button
              className={`bg-primary-10 hover:bg-transparent border border-primary-10 text-white hover:text-primary-10 w-fit ${buttonCommonClassNames}`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
