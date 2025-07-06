import React from "react";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsSectionProps {
  title: string;
  description: string;
}

const Testimonials: React.FC<TestimonialsSectionProps> = ({
  title,
  description,
}) => {
  return (
    <div
      className="py-[50px] w-full"
      style={{
        background: "linear-gradient(101deg, #E8F3FF -6.83%, #FFF 85.15%)",
      }}
    >
      <Container>
        <div className="text-center">
          <Heading
            titleParts={[{ text: title }]}
            description={description}
            align="center"
            className="w-[60%] mx-auto"
          />

        </div>
        <div className="mt-17">
<TestimonialCard
      image="/images/tutor1.jpg"
      name="Tanvir Rahman"
      role="Math Tutor, Dhaka"
      rating={4}
      review="I joined the platform just 3 months ago, and I’ve already connected with 5 great students. The process is easy and fast — it truly changed my career!"
    />
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
