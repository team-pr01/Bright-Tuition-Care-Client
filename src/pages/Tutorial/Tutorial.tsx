import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";
import Tutorials from "../../components/TutorialPage/Tutorials/Tutorials";

const Tutorial = () => {
  return (
    <Container>
      <div className="mt-10 mb-72">
        <Heading
          titleParts={[{ text: "Explore Our Tutorials" }]}
          description="Watch simple step-by-step video guides made for both Guardians and Tutors.These tutorials will help you how to use our platform—like submitting tutor requests, updating profiles and applying for tuition jobs—quickly and easily."
          align="center"
          headingClassName="text-center"
        />
        <Tutorials/>
      </div>
    </Container>
  );
};

export default Tutorial;
