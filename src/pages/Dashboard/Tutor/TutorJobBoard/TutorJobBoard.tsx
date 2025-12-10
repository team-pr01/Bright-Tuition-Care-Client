/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Filters from "../../../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../../../components/JobBoardPage/Jobs/Jobs";
import { useGetAllJobsQuery } from "../../../../redux/Features/Job/jobApi";
import { useDebounce } from "../../../../hooks/useDebounce";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/JobCard/JobCardSkeleton";
import { useSearchParams } from "react-router-dom";

const TutorJobBoard = () => {
  const [searchParams] = useSearchParams();

  const cities = searchParams.getAll("city");
  const areas = searchParams.getAll("area");

  const [keyword, setKeyword] = useState<string>("");

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);

  // 🔁 NOW MULTI-SELECT
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurriculums, setSelectedCurriculums] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTutorGender, setSelectedTutorGender] = useState<string[]>([]);
  const [selectedStudentGender, setSelectedStudentGender] = useState<string[]>(
    []
  );
  const [selectedTuitionType, setSelectedTuitionType] = useState<string[]>([]);

  const debouncedKeyword = useDebounce(keyword, 500);

  // Clear areas when no city is selected
  useEffect(() => {
    if (selectedCities.length === 0) {
      setSelectedAreas([]);
    }
  }, [selectedCities]);

  // Sync city & area from URL params on mount
  useEffect(() => {
    if (cities.length > 0) setSelectedCities(cities);
    if (areas.length > 0) setSelectedAreas(areas);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pagination states
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const [jobs, setJobs] = useState<any[]>([]);

  const {
    data: allJobs,
    isLoading,
    isFetching,
  } = useGetAllJobsQuery({
    keyword: debouncedKeyword || undefined,
    city: selectedCities.join(",") || undefined,
    area: selectedAreas.join(",") || undefined,
    category: selectedCategories.join(",") || undefined,
    class: selectedClasses.join(",") || undefined,
    curriculum: selectedCurriculums.join(",") || undefined,
    tutoringDays: selectedDays.join(",") || undefined,
    preferredTutorGender: selectedTutorGender.join(",") || undefined,
    studentGender: selectedStudentGender.join(",") || undefined,
    tuitionType: selectedTuitionType.join(",") || undefined,
    status: "live",
    skip,
  });

  // Update jobs when new data arrives
  useEffect(() => {
    if (allJobs?.data?.jobs) {
      if (skip === 0) {
        setJobs(allJobs.data.jobs);
      } else {
        setJobs((prev) => {
          const newJobs = allJobs.data.jobs.filter(
            (job: any) => !prev.some((p) => p._id === job._id)
          );
          return [...prev, ...newJobs];
        });
      }
    }
  }, [allJobs, skip]);

  // Reset pagination when filters or search change
  useEffect(() => {
    setSkip(0);
  }, [
    debouncedKeyword,
    selectedCities,
    selectedAreas,
    selectedCategories,
    selectedCurriculums,
    selectedDays,
    selectedClasses,
    selectedTutorGender,
    selectedStudentGender,
    selectedTuitionType,
  ]);

  // Infinite Scroll Observer
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          allJobs?.data?.meta?.hasMore
        ) {
          setSkip((prev) => prev + limit);
        }
      },
      { threshold: 1 }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [allJobs, isFetching, allJobs?.data?.meta?.hasMore]);

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
        // 🔁 MULTI-SELECT PROPS
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedCurriculums={selectedCurriculums}
        setSelectedCurriculums={setSelectedCurriculums}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        selectedClasses={selectedClasses}
        setSelectedClasses={setSelectedClasses}
        selectedTutorGender={selectedTutorGender}
        setSelectedTutorGender={setSelectedTutorGender}
        selectedStudentGender={selectedStudentGender}
        setSelectedStudentGender={setSelectedStudentGender}
        selectedTuitionType={selectedTuitionType}
        setSelectedTuitionType={setSelectedTuitionType}
        liveJobs={allJobs?.data?.meta?.liveJobs || 0}
      />
      <div className="mt-6 px-3 lg:px-6 pb-6">
        <Jobs
          allJobs={jobs}
          isLoading={isLoading || isFetching}
          variant="tutorJobCard"
        />
        <div ref={loaderRef} className="h-10"></div>

        {allJobs?.data?.meta?.hasMore && isFetching && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!allJobs?.data?.meta?.hasMore && !isFetching && (
          <p className="text-center mt-4 text-gray-400">
            No more jobs to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default TutorJobBoard;
