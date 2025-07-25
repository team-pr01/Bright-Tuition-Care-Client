import React from "react";
import { methods } from "./TuitionMethods.dt";
import MethodCard from "./MethodCard";
import Heading from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";

const TuitionMethods: React.FC = () => {
  return (
    <div className="w-full py-[50px] font-Nunito">
      <Container>
        <div className=" text-center">
          <Heading
            titleParts={[{ text: "Tuition Method" }]}
            description="We offer multiple flexible learning options to suit every student’s needs — whether it’s personal, online, in groups, or structured packages."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center gap-4 xl:gap-8 mt-6 lg:mt-8">
            {methods.map((method, index) => (
              <MethodCard
                key={index}
                number={method.number}
                icon={method.icon}
                title={method.title}
                description={method.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TuitionMethods;
