import React from "react";
import { methods } from "./TuitionMethods.dt";
import MethodCard from "./MethodCard";
import Heading from "../../Reusable/Heading/Heading";
import Container from "../../Reusable/Container/Container";


const TuitionMethods: React.FC = () => {
  return (
    <div className="w-full py-[50px]"
     style={{
        background: "linear-gradient(101deg, #E8F3FF -6.83%, #FFF 85.15%)",
      }}>
        <Container>
            <div className=" text-center">
        <Heading
            titleParts={[
              { text: "Tuition Method" },
            ]}
            description="We offer multiple flexible learning options to suit every student’s needs — whether it’s personal, online, in groups, or structured packages."
            align="center"
            className="w-[60%] mx-auto"
          />
        

        <div className="flex flex-row justify-center gap-8 mt-8">
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
