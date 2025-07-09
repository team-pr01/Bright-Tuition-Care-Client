// components/StudentSteps/StudentSteps.tsx

import React from "react";
import StepCard from "./StepCard";
import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";

const steps = [
  {
    icon: ICONS.send,
    title: "Request A Tutor",
    description:
      "Fill out a simple form with your subject, class, location, and preferred tutoring method. It takes less than 2 minutes!",
  },
  {
    icon: ICONS.choose,
    title: "Chose The Right One",
    description:
      "Browse tutor profiles, compare experience, read reviews, and choose the best fit for your child.",
  },
  {
    icon:ICONS.receive,
    title: "Receive the Best Tutors",
    description:
      "Top-rated and verified tutors will respond to your request. We filter based on quality, reviews, and availability.",
  },
  {
    icon: ICONS.getStarted,
    title: "Get Started Learning",
    description:
      "Schedule your first session and begin a productive learning journey — at home or online, as you prefer.",
  },
];

const StudentSteps = () => {
  return (
    <section
      className="py-[50px] w-full "
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div className=" mx-auto px-4">
          <Heading
            titleParts={[
              { text: "How The System Works For Students / Guardian" },
            ]}
            description={
              "Finding the right tutor is easier than ever. Follow these simple steps to connect with the best educators for your child."
            }
            align="center"
            className="w-full max-w-2xl mx-auto"
          />
          <div className="relative mt-9">
            {/* dotted line */}
            <img
              src={IMAGES.stepLine}
              alt="Connector line"
              className="hidden md:block absolute top-7 left-0 right-0 mx-auto z-0 w-[80%] max-w-[90%] object-contain"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
  {steps.map((step, index) => (
    <div
      key={index}
      className={`relative ${
        index === 1
          ? "mt-17"
          : index === 2
          ? "mt-3"
          : index === 3
          ? "mt-19"
          : "mt-5"
      }`}
    >
      <StepCard {...step} />
    </div>
  ))}
</div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default StudentSteps;
