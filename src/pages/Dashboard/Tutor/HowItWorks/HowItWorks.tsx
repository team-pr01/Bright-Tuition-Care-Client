import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { tutorSteps } from "../../../../constants/stepsData";

const HowItWorks = () => {
  return (
    <div>
      <VerticalTimeline lineColor={"#e5e7eb"}>
        {tutorSteps.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#fff",
              color: "#000",
              border : "1px solid #0d99ff",
              borderColor: "#0d99ff",
              // boxShadow:
              //   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
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
    </div>
  );
};

export default HowItWorks;
