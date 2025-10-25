import { useState } from "react";
import Filters from "../../../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../../../components/JobBoardPage/Jobs/Jobs";
import { useGetAllJobsQuery } from "../../../../redux/Features/Job/jobApi";
import { useDebounce } from "../../../../hooks/useDebounce";

const TutorJobBoard = () => {
  const [keyword, setKeyword] = useState<string>("");
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
  const debouncedKeyword = useDebounce(keyword, 500);

  const {
    data: allJobs,
    isLoading,
    isFetching,
  } = useGetAllJobsQuery({
    keyword: debouncedKeyword || undefined,
    city: selectedCities.join(",") || undefined,
    area: selectedAreas.join(",") || undefined,
    category: selectedCategory.join(",") || undefined,
    class: selectedClass.join(",") || undefined,
    tutoringDays: selectedDays.join(",") || undefined,
    preferredTutorGender: selectedTutorGender.join(",") || undefined,
    studentGender: selectedStudentGender.join(",") || undefined,
    tuitionType: selectedTuitionType.join(",") || undefined,
  });
  return (
    <div>
      <Filters
        keyword={keyword}
        setKeyword={setKeyword}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        areaOptions={areaOptions}
        setAreaOptions={setAreaOptions}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedTutorGender={selectedTutorGender}
        setSelectedTutorGender={setSelectedTutorGender}
        selectedStudentGender={selectedStudentGender}
        setSelectedStudentGender={setSelectedStudentGender}
        selectedTuitionType={selectedTuitionType}
        setSelectedTuitionType={setSelectedTuitionType}
        totalJobs={allJobs?.data?.meta?.total || 0}
      />
      <Jobs allJobs={allJobs?.data?.jobs} isLoading={isLoading || isFetching} variant="tutorJobCard" />
    </div>
  );
};

export default TutorJobBoard;
