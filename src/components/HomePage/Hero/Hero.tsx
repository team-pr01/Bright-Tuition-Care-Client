import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";

const Hero = () => {
  return (
    <Container>
      <div className="flex flex-row justify-between gap-[44px] ">
        <div className="w-[60%] flex flex-col justify-start">
            <div className="flex flex-row gap-3 mb-4 ">
                <p>0177296232</p>
                
            </div>
          <Heading
            titleParts={[
              { text: "Perfect" },
              { text: "Tutor", highlight: true },
              { text: "or Dream" },
              { text: "Tutoring", highlight: true },
              { text: "Job – All in One Place!" },
            ]}
            description="Whether you're a student seeking expert guidance or a tutor looking for new opportunities — our platform connects you in just a few clicks. Learn smarter. Teach better."
            headingClassName="text-[56px] leading-[64px] tracking-[-1.68px]"
          />
        </div>

        {/* Right Image Content */}
        <div className="w-[40%]"></div>
      </div>
      {/* Left Content */}
    </Container>
  );
};

export default Hero;
