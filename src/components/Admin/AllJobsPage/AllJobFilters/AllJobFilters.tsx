/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { filterData } from "../../../../constants/filterData";
import { ICONS } from "../../../../assets";
import SearchInput from "../../../Reusable/SearchBar/SearchBar";
import MultiSelectDropdown from "../../../Reusable/MultiSelectDropdown/MultiSelectDropdown";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";

const AllJobFilters: React.FC<any> = ({
  keyword,
  setKeyword,
  selectedCities,
  setSelectedCities,
  selectedAreas,
  setSelectedAreas,
  areaOptions,
  setAreaOptions,
  selectedCategories,
  setSelectedCategories,
  selectedCurriculums,
  setSelectedCurriculums,
  selectedDays,
  setSelectedDays,
  selectedClasses,
  setSelectedClasses,
  selectedTutorGender,
  setSelectedTutorGender,
  selectedStudentGender,
  setSelectedStudentGender,
  selectedTuitionType,
  setSelectedTuitionType,
}) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);
  const handleResetFilters = () => {
    setSelectedCities([]);
    setSelectedAreas([]);
    setAreaOptions([]);
    setSelectedCategories([]);
    setSelectedCurriculums([]);
    setSelectedDays([]);
    setSelectedClasses([]);
    setSelectedTutorGender([]);
    setSelectedStudentGender([]);
    setSelectedTuitionType([]);
    setSelectedSubjects([]);
    setSubjectOptions([]);
    setClassOptions([]);
  };

  // --------- CITY → AREA OPTIONS ----------
  useEffect(() => {
    if (selectedCities.length === 0) {
      setAreaOptions([]);
      setSelectedAreas([]);
      return;
    }

    const locations = selectedCities.flatMap((cityName : string) => {
      const cityObj = filterData.cityCorporationWithLocation.find(
        (city) => city.name === cityName
      );
      return cityObj ? cityObj.locations : [];
    });

    const uniqueLocations = [...new Set(locations)];
    setAreaOptions(uniqueLocations);

    setSelectedAreas((prev: string[]) =>
      prev.filter((area) => uniqueLocations.includes(area))
    );
  }, [selectedCities, setAreaOptions, setSelectedAreas]);

  // ---------- CLASS / SUBJECT STATE ----------
  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // ---------- UPDATE CLASS OPTIONS WHEN CATEGORY CHANGES ----------
  useEffect(() => {
    if (!selectedCategories.length) {
      setClassOptions([]);
      setSubjectOptions([]);
      setSelectedSubjects([]);
      setSelectedClasses([]);
      return;
    }

    const relevantCategories =
      filterData?.tutoringCatalog.filter((item) =>
        selectedCategories.includes(item.category)
      ) || [];

    const allClasses = relevantCategories.flatMap((cat) =>
      cat.classes.map((cls) => cls.name)
    );
    const uniqueClasses = Array.from(new Set(allClasses));

    setClassOptions(uniqueClasses);

    // Keep only classes that still exist under selected categories
    setSelectedClasses((prev: string[]) => prev.filter((c) => uniqueClasses.includes(c)));

    // Reset subjects because category context changed
    setSubjectOptions([]);
    setSelectedSubjects([]);
  }, [selectedCategories, setSelectedClasses]);

  // ---------- UPDATE SUBJECT OPTIONS WHEN CLASS OR CATEGORY CHANGES ----------
  useEffect(() => {
    if (!selectedCategories.length || !selectedClasses.length) {
      setSubjectOptions([]);
      setSelectedSubjects([]);
      return;
    }

    const relevantCategories =
      filterData?.tutoringCatalog.filter((item) =>
        selectedCategories.includes(item.category)
      ) || [];

    const subjectsSet = new Set<string>();

    relevantCategories.forEach((category) => {
      category.classes.forEach((cls) => {
        if (selectedClasses.includes(cls.name)) {
          cls.subjects.forEach((subj: string) => subjectsSet.add(subj));
        }
      });
    });

    const subjectsArray = Array.from(subjectsSet);
    setSubjectOptions(subjectsArray);

    // Keep only subjects that exist in new combined subject list
    setSelectedSubjects((prev) =>
      prev.filter((subject) => subjectsArray.includes(subject))
    );
  }, [selectedCategories, selectedClasses]);

  const englishMediumSelected = selectedCategories.includes("English Medium");

  const curriculumOptions = ["Ed-Excel", "Cambridge", "IB"];
  const buttonCommonClassNames =
    "flex items-center justify-center gap-2 leading-[24px] w-fit w-fit rounded-lg font-semibold font-Nunito cursor-pointer transition-all duration-300 py-2 px-3 lg:px-6 text-sm md:text-lg";

  return (
    <>
      <div className="flex flex-col 2xl:flex-row items-start 2xl:items-center justify-between gap-6 2xl:gap-0 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <SearchInput
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
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
          <Link
            to="/dashboard/admin/hire-a-tutor"
            className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-lg flex items-center gap-2 px-3 py-2 pointer`}
          >
            Hire a Tutor <RxArrowTopRight className="text-lg" />
          </Link>
        </div>
      </div>

      {isAccordingOpen && (
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

            {/* 🔁 CATEGORY - NOW MULTI-SELECT */}
            <MultiSelectDropdown
              label="Category"
              name="category"
              options={filterData.category}
              value={selectedCategories}
              onChange={setSelectedCategories}
            />

            {/* 🔁 CURRICULUM (ONLY IF ENGLISH MEDIUM SELECTED) - MULTI-SELECT */}
            {englishMediumSelected && (
              <MultiSelectDropdown
                label="Curriculum"
                name="curriculum"
                options={curriculumOptions}
                value={selectedCurriculums}
                onChange={setSelectedCurriculums}
                isRequired={false}
              />
            )}

            {/* 🔁 CLASS - NOW MULTI-SELECT, DEPENDS ON CATEGORY */}
            <MultiSelectDropdown
              label="Class"
              name="class"
              options={classOptions}
              value={selectedClasses}
              onChange={setSelectedClasses}
              noDataMessage="Please select category first"
              isDisabled={!selectedCategories.length}
            />

            {/* SUBJECTS (already multi-select; now supports multiple classes/categories) */}
            <MultiSelectDropdown
              label="Subjects"
              name="subjects"
              options={subjectOptions}
              value={selectedSubjects}
              onChange={setSelectedSubjects}
              noDataMessage={
                !selectedCategories.length || !selectedClasses.length
                  ? "Please select category and class first"
                  : "No subjects found"
              }
              isDisabled={!selectedCategories.length || !selectedClasses.length}
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

export default AllJobFilters;
