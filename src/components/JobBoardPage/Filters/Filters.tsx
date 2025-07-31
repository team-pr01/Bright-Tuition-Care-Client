import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { useState, useEffect } from "react";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { filterData } from "../../../constants/filterData";

const Filters = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);

  // Selected states for each filter
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string[]>([]);
  const [selectedTutorGender, setSelectedTutorGender] = useState<string[]>([]);
  const [selectedStudentGender, setSelectedStudentGender] = useState<string[]>(
    []
  );
  const [selectedTuitionType, setSelectedTuitionType] = useState<string[]>([]);

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
    <Container>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 mt-10 md:mt-16">
        <div className="flex items-center gap-3">
          <img src={ICONS.liveJobs} alt="" className="size-8" />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold leading-11 text-primary-50">
            1024 Live Jobs
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full lg:w-[400px]">
            <input
              placeholder={"Search by job title or id..."}
              className={`w-full pl-8 pr-2 py-[10px] rounded-lg bg-white border border-primary-30 leading-[18px] focus:outline-none focus:border-primary-10 transition duration-300`}
            />
            <img
              src={ICONS.search}
              alt=""
              className="size-5 absolute top-3 bottom-0 left-2"
            />
          </div>
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
        <div className="flex items-center gap-5 justify-end mt-10">
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
    </Container>
  );
};

export default Filters;
