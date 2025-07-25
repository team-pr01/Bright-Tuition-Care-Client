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
    <div>
      <Hero />
      <Counter />
      <AboutUs />
      <Services />
      <TuitionMethods />
      <StudentSteps />
      <Testimonials
        title="What Students / Guardian Say About Us"
        description="Real stories from real tutors who found success through our platform."
      />
      <TutorSteps />

      <Testimonials
        title="What Tutors Say About Us"
        description="Real stories from real tutors who found success through our platform."
        variant="primary"
      />
      <DownloadApp />
    </div>
  );
};

export default Home;
