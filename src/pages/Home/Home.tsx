import AboutUs from "../../components/HomePage/AboutUS/AboutUs";
import Counter from "../../components/HomePage/Counter/Counter";
import DownloadApp from "../../components/HomePage/DownloadApp/DownloadApp";
import Hero from "../../components/HomePage/Hero/Hero";
import StudentSteps from "../../components/HomePage/HowItWorksStudent/StudentSteps";
import TutorSteps from "../../components/HomePage/HowItWorksTutor/TutorSteps";
import Services from "../../components/HomePage/Services/Services";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import TuitionMethods from "../../components/HomePage/TuitionMethods/TuitionMethods";

const Home = () => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center ">
      <Hero />
      <Counter />
      <AboutUs />
      <Services />
      <TuitionMethods />
      <StudentSteps/>
      <Testimonials
        title="What Students / Guardian Say About Us"
        description="Real stories from real tutors who found success through our platform."
      />
      <DownloadApp />
      <TutorSteps/>
      <Testimonials
        title="What Tutors Say About Us"
        description="Real stories from real tutors who found success through our platform."
        variant="primary"
      />
    </div>
  );
};

export default Home;
