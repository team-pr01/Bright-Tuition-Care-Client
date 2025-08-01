import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";
import Tutorials from "../../components/TutorialPage/Tutorials/Tutorials";

const Tutorial = () => {
  return (
    <Container>
      <div className="mt-10 mb-72">
        <Heading
          titleParts={[{ text: "Explore Our Tutorials" }]}
          description="Learn from the best with our comprehensive video tutorials, designed to help you master new skills at your own paced"
          align="center"
          headingClassName="text-center"
        />
        <Tutorials/>
      </div>
    </Container>
  );
};

export default Tutorial;
