// components/TutorSteps/TutorSteps.tsx

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Heading from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";
import { tutorSteps } from "../../../constants/stepsData";

const TutorSteps: React.FC = () => {
  return (
    <section
      className="py-[50px] w-full font-Nunito"
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div className="mb-9 lg:mb-16">
          <Heading
            titleParts={[{ text: "How The System Works For Tutor" }]}
            description="Join in 5 easy steps to start your tutoring journey. Help students, grow your career, and earn with flexibility."
            align="center"
          />
        </div>

        <VerticalTimeline lineColor={"#e5e7eb"}>
          {tutorSteps.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "#fff",
                color: "#000",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                borderRadius: "0.5rem",
              }}
              contentArrowStyle={{ borderRight: "7px solid  #fff" }}
              iconStyle={{ background: "#0d99ff", color: "#fff" }}
              icon={item.icon}
            >
              <div className="p-1">
                <div className="bg-primary-20 w-fit px-4 py-[10px] flex items-center justify-center rounded font-normal">
                  Step {item.step}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-neutral-10 mt-3 lg:mt-5">
                  {item.title}
                </h3>
                <p className="text-neutral-30 leading-2 lg:leading-6">
                  {item.description}
                </p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Container>
    </section>
  );
};

export default TutorSteps;
