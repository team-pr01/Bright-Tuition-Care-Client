import { useState } from "react";
import Filters from "../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../components/JobBoardPage/Jobs/Jobs";
import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";
import { useGetAllJobsQuery } from "../../redux/Features/Job/jobApi";

const JobBoard = () => {
  // Selected states for each filter
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

  const { data: allJobs, isLoading, isFetching } = useGetAllJobsQuery({
    keyword : keyword || undefined,
    city: selectedCities.join(",") || undefined,
    area: selectedAreas.join(",") || undefined,
    category: selectedCategory.join(",") || undefined,
    class: selectedClass.join(",") || undefined,
    tutoringDays: selectedDays.join(",") || undefined,
    preferredTutorGender: selectedTutorGender.join(",") || undefined,
    studentGender: selectedStudentGender.join(",") || undefined,
    tuitionType: selectedTuitionType.join(",") || undefined,
  });

  console.log(allJobs);

  return (
    <Container>
      <div className="relative mt-10 mb-72">
        <Heading
          titleParts={[{ text: "Available Tuition Job" }]}
          description="Find perfect tutoring opportunity that matches your Expertise and Scheduled"
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

        <Jobs allJobs={allJobs?.data?.jobs} isLoading={isLoading || isFetching} />
      </div>
    </Container>
  );
};

export default JobBoard;
