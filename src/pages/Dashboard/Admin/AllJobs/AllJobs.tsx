/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import AllJobFilters from "../../../../components/Admin/AllJobsPage/AllJobFilters/AllJobFilters";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useGetAllJobsQuery } from "../../../../redux/Features/Job/jobApi";
import Jobs from "../../../../components/JobBoardPage/Jobs/Jobs";
import JobCardSkeleton from "../../../../components/JobBoardPage/Jobs/JobCard/JobCardSkeleton";

const AllJobs = () => {
  const [keyword, setKeyword] = useState<string>("");
    const [status, setStatus] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedTutorGender, setSelectedTutorGender] = useState<string[]>([]);
  const [selectedStudentGender, setSelectedStudentGender] = useState<string[]>(
    []
  );
  const [selectedTuitionType, setSelectedTuitionType] = useState<string[]>([]);
  const debouncedKeyword = useDebounce(keyword, 500);

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
    category: selectedCategory || undefined,
    class: selectedClass || undefined,
    tutoringDays: selectedDays.join(",") || undefined,
    preferredTutorGender: selectedTutorGender.join(",") || undefined,
    studentGender: selectedStudentGender.join(",") || undefined,
    tuitionType: selectedTuitionType.join(",") || undefined,
    status: status === "" ? undefined : status,
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
  }, [allJobs]);

  // Reset pagination when filters or search change
  useEffect(() => {
    setSkip(0);
  }, [
    debouncedKeyword,
    selectedCities,
    selectedAreas,
    selectedCategory,
    selectedDays,
    selectedClass,
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
      <AllJobFilters
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
        pendingJobs={allJobs?.data?.meta?.pendingJobs || 0}
        closedJobs={allJobs?.data?.meta?.closedJobs || 0}
        liveJobs={allJobs?.data?.meta?.liveJobs || 0}
        cancelledJobs={allJobs?.data?.meta?.cancelledJobs || 0}
        status={status}
        setStatus={setStatus}
      />

      <Jobs allJobs={jobs} isLoading={isLoading || isFetching} variant="admin" />
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
  );
};

export default AllJobs;
