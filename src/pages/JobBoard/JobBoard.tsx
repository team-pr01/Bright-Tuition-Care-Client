import Filters from "../../components/JobBoardPage/Filters/Filters";
import Jobs from "../../components/JobBoardPage/Jobs/Jobs";
import Heading from "../../components/Reusable/Heading/Heading";

const JobBoard = () => {
  return (
    <div>
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
    </div>
  );
};

export default JobBoard;
