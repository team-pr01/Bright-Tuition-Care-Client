import { useState, useEffect, useRef } from "react";
import Filters from "../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../components/JobBoardPage/Jobs/Jobs";
import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";
import { useGetAllJobsQuery } from "../../redux/Features/Job/jobApi";
import { useDebounce } from "../../hooks/useDebounce";
import JobCardSkeleton from "../../components/JobBoardPage/Jobs/jobCard/JobCardSkeleton";

const JobBoard = () => {
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

  // Pagination states
  const [skip, setSkip] = useState(0);
  const limit = 6;
  const [jobs, setJobs] = useState<any[]>([]);

  // API Call
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
  }, [allJobs, isFetching,allJobs?.data?.meta?.hasMore]);
  console.log(jobs,"jobs")

  return (
    <Container>
      <div className="relative mt-10 mb-72">
        <Heading
          titleParts={[{ text: "Available Tuition Job" }]}
          description="Find the perfect tutoring opportunity that matches your expertise and schedule."
          align="center"
          headingClassName="text-center"
        />

        <div className="mt-10 md:mt-16">
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
          />
        </div>

        <Jobs allJobs={jobs} isLoading={isLoading || isFetching} />
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
    </Container>
  );
};

export default JobBoard;
