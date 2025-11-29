import Container from "../../components/Reusable/Container/Container";
import TuitionRequestForm from "../../components/TuitionRequestPage/TuitionRequestForm/TuitionRequestForm";
import TutorHiringProcess from "./TutorHiringProcess";
const TuitionRequest = () => {
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row items-stretch gap-10 mt-10 lg:mt-20 mb-72 lg:mb-96">
        <div className="w-full lg:w-[40%] flex items-center justify-center">
          <TutorHiringProcess />
        </div>
        <div className="w-full lg:w-[60%]">
          <TuitionRequestForm />
        </div>
      </div>
    </Container>
  );
};

export default TuitionRequest;
