import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import Button from "../../Reusable/Button/Button";

const DownloadApp = () => {
  return (
    <Container>
      <div className="flex flex-row font-Nunito h-fit items-center justify-between gap-[44px] my-[50px] ">
        <div className="w-[40%] flex flex-col justify-start">
          <img
            src={IMAGES.aboutUs}
            alt="Hero Section"
            className="w-auto h-[402px]"
          />
        </div>

        {/* Right Image Content */}
        <div className="w-[60%]  flex flex-col gap-8  ">
          <Heading
            titleParts={[
              {
                text: "Download the App for Seamless Learning and Teaching Experience",
              },
            ]}
          />

          <p className="text-neutral-20 text-lg leading-[24px]">
            Bright Tuition Care is Bangladesh's first and most trusted online
            platform for guardians, students and tutors to connect with verified
            tutors and find any tuition jobs throughout the country. Bright
            tuition care is dedicated to bridging the educational
          </p>
          <div className="flex flex-row gap-4 items-center">
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
          </div>
        </div>
      </div>

      {/* Left Content */}
    </Container>
  );
};

export default DownloadApp;
