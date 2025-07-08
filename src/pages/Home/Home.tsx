import AboutUs from "../../components/HomePage/AboutUS/AboutUs";
import Counter from "../../components/HomePage/Counter/Counter";
import DownloadApp from "../../components/HomePage/DownloadApp/DownloadApp";
import Hero from "../../components/HomePage/Hero/Hero";
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
      <Testimonials
        title="What Students / Guardian Say About Us"
        description="Real stories from real tutors who found success through our platform."
      />
      <DownloadApp />
      <Testimonials
        title="What Tutors Say About Us"
        description="Real stories from real tutors who found success through our platform."
        variant="primary"
      />
    </div>
  );
};

export default Home;
