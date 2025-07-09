import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import Button from "../../Reusable/Button/Button";

const AboutUs = () => {
  return (
    <Container>
      <div className="flex flex-row font-Nunito h-fit justify-between items-center gap-[44px] my-[50px] ">
        <div className="w-[40%] flex flex-col justify-start">
          <img
            src={IMAGES.aboutUs}
            alt="Hero Section"
            className="w-auto h-[402px]"
          />
        </div>

        {/* Right Image Content */}
        <div className="w-[60%]  ">
            <div className="w-[75%]"><Heading titleParts={[{ text: "About Bright Tuition Care" }]} />
          <div className="flex flex-col gap-5 mt-4">
            <p className="text-neutral-20 text-lg leading-[24px]">
              At Bright Tutor Care, we are passionate about connecting students
              with the perfect tutors to support their learning journey. Whether
              you are a student, guardian, or tutor, our mission is to make
              tutoring simple, effective, and accessible for everyone.
            </p>
            <p className="text-neutral-20 text-lg leading-[24px]">
              We believe that every student deserves quality education tailored
              to their unique needs. That's why we have built a trusted platform
              where finding the right tutor is quick, reliable, and hassle-free.
              From academic subjects to special skills, our network of
              experienced tutors is here to help students reach their full
              potential.
            </p>
          </div>
          <div className="flex flex-row gap-4 mt-12 items-center">
            <Button
              label="Hire A Tutor "
              variant="primary"
              icon={ICONS.topRightArrow}
            />
            <Button
              label="Become A Tutor "
              variant="secondary"
              icon={ICONS.topRightArrowWhite}
                iconBg="#0D99FF"
            />
          </div></div>
          
        </div>
      </div>
      {/* Left Content */}
    </Container>
  );
};

export default AboutUs;
