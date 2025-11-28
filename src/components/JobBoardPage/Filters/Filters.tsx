/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../../assets";
import { useState, useEffect } from "react";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { filterData } from "../../../constants/filterData";
import SearchInput from "../../Reusable/SearchBar/SearchBar";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";

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

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;

  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;

  selectedTutorGender: string[];
  setSelectedTutorGender: React.Dispatch<React.SetStateAction<string[]>>;

  selectedStudentGender: string[];
  setSelectedStudentGender: React.Dispatch<React.SetStateAction<string[]>>;

  selectedTuitionType: string[];
  setSelectedTuitionType: React.Dispatch<React.SetStateAction<string[]>>;

  liveJobs: number;

  status?: string;
  setStatus?: React.Dispatch<React.SetStateAction<string>>;
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
  liveJobs,
}) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);
  const handleResetFilters = () => {
    setSelectedCities([]);
    setSelectedAreas([]);
    setSelectedCategory("");
    setSelectedDays([]);
    setSelectedClass("");
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

  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // ---------- UPDATE CLASS OPTIONS WHEN CATEGORY CHANGES ----------
  useEffect(() => {
    if (!selectedCategory) {
      setClassOptions([]);
      setSubjectOptions([]);
      setSelectedSubjects([]);
      setSelectedClass(""); // Reset class when category changes
      return;
    }

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    if (categoryData) {
      const extractedClasses = categoryData.classes.map((cls) => cls.name);
      setClassOptions(extractedClasses);
    }

    setSubjectOptions([]);
    setSelectedSubjects([]);
    setSelectedClass(""); // Reset class when category changes
  }, [selectedCategory]);

  // ---------- UPDATE SUBJECT OPTIONS WHEN CLASS CHANGES ----------
  useEffect(() => {
    if (!selectedClass || !selectedCategory) {
      setSubjectOptions([]);
      setSelectedSubjects([]);
      return;
    }

    const categoryData = filterData?.tutoringCatalog.find(
      (item) => item.category === selectedCategory
    );

    const classData = categoryData?.classes.find(
      (cls) => cls.name === selectedClass
    );

    if (classData) {
      setSubjectOptions(classData.subjects);

      // Keep only subjects that exist in the new class
      setSelectedSubjects((prev) =>
        prev.filter((subject) => classData.subjects.includes(subject))
      );
    } else {
      setSelectedSubjects([]);
    }
  }, [selectedClass, selectedCategory]);

  const curriculumOptions = ["Ed-Excel", "Cambridge", "IB"];
  const buttonCommonClassNames =
    "flex items-center justify-center gap-2 leading-[24px] w-fit w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 px-3 lg:px-6 text-sm md:text-lg";

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
        <div className="flex items-center gap-3">
          <img src={ICONS.liveJobs} alt="" className="size-8" />
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold leading-11 text-primary-50">
            {liveJobs} Live Jobs
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

      {isAccordingOpen && (
        <div
          className={`w-full bg-primary-65 border border-primary-10/20 rounded-xl p-6 transition-all duration-300 ease-in-out mt-4`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* City Dropdown */}
            <MultiSelectDropdown
              label="City"
              name="city"
              options={filterData.cityCorporationWithLocation.map(
                (c) => c.name
              )}
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
            <SelectDropdown
              label="Category"
              options={filterData.category}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            {/* IF CATEGORY = ENGLISH MEDIUM SHOW CURRICULUM */}
            {selectedCategory === "English Medium" && (
              <SelectDropdown label="Curriculum" options={curriculumOptions} />
            )}

            {/* CLASS */}
            <SelectDropdown
              label="Class"
              options={classOptions}
              value={selectedClass}
              onChange={setSelectedClass}
              isDisabled={!selectedCategory}
            />

            {/* SUBJECTS */}
            <MultiSelectDropdown
              label="Subjects"
              name="subjects"
              options={subjectOptions}
              value={selectedSubjects}
              onChange={setSelectedSubjects}
              noDataMessage="Please select class first"
              isDisabled={!selectedClass}
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
                onClick={() => setIsAccordingOpen(!isAccordingOpen)}
                className={`bg-primary-10 hover:bg-transparent border border-primary-10 text-white hover:text-primary-10 w-fit ${buttonCommonClassNames}`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
