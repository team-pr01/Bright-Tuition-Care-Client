import Filters from "../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../components/JobBoardPage/Jobs/Jobs";
import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";

const JobBoard = () => {
  return (
    <Container>
      <div className="relative mt-20 mb-72">
        <Heading
          titleParts={[{ text: "Available Tuition Job" }]}
          description="Find perfect tutoring opportunity that matches your Expertise and Scheduled"
          align="center"
          headingClassName="text-center"
        />
        <Filters />
        <Jobs />
      </div>
    </Container>
  );
};

export default JobBoard;
