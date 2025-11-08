import AboutUs from "../../components/HomePage/AboutUS/AboutUs";
import Counter from "../../components/HomePage/Counter/Counter";
import DownloadApp from "../../components/HomePage/DownloadApp/DownloadApp";
import Hero from "../../components/HomePage/Hero/Hero";
import StudentSteps from "../../components/HomePage/HowItWorksStudent/StudentSteps";
import TutorSteps from "../../components/HomePage/HowItWorksTutor/TutorSteps";
import Services from "../../components/HomePage/Services/Services";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import TuitionMethods from "../../components/HomePage/TuitionMethods/TuitionMethods";
import WhyChooseUs from "../../components/HomePage/WhyChooseUs/WhyChooseUs";
import {
  useGetAllGuardiansTestimonialsQuery,
  useGetAllTutorsTestimonialsQuery,
} from "../../redux/Features/Testimonial/testimonialApi";

const Home = () => {
  const { data: allTutorsTestimonials, isLoading:isTutorTestimonialLoading } = useGetAllTutorsTestimonialsQuery({});
  const { data: allGuardianTestimonials, isLoading:isGuardianTestimonialLoading } = useGetAllGuardiansTestimonialsQuery(
    {}
  );
  return (
    <div className="overflow-hidden">
      <Hero />
      <Counter />
      <AboutUs />
      <Services />
      <TuitionMethods />
      <StudentSteps />
      <Testimonials
        title="What Students / Guardian Say About Us"
        description="Real stories from real tutors who found success through our platform."
        buttonText="Hire A Tutor"
        navigatePath="/hire-a-tutor"
        data={allGuardianTestimonials?.data}
        isLoading={isTutorTestimonialLoading}
      />
      <TutorSteps />

      <Testimonials
        title="What Tutors Say About Us"
        description="Real stories from real tutors who found success through our platform."
        variant="primary"
        buttonText="Become A Tutor"
        navigatePath="/signup"
        data={allTutorsTestimonials?.data}
        isLoading={isGuardianTestimonialLoading}
      />
      <WhyChooseUs />
      <div className="mb-72 overflow-hidden">
        <DownloadApp />
      </div>
    </div>
  );
};

export default Home;
