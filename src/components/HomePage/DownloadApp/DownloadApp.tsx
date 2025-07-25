import Container from "../../Reusable/Container/Container";
import { ICONS, IMAGES } from "../../../assets";
import Heading from "../../Reusable/Heading/Heading";
import IconButton from "../../Reusable/Button/IconButton";

const DownloadApp = () => {
  return (
    <div
      className="py-6 lg:py-[50px] w-full"
      style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}
    >
      <Container>
        <div className="flex flex-col lg:flex-row font-Nunito h-fit items-center justify-between gap-6 lg:gap-[44px]">
          <img
            src={IMAGES.appDownload}
            alt="Hero Section"
            className="w-auto h-[548px]"
          />

          {/* Right Image Content */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4 lg:gap-8">
            <Heading
              titleParts={[
                {
                  text: "Download the App for Seamless Learning and Teaching Experience",
                },
              ]}
              headingClassName="text-center lg:text-start max-w-[690px]"
            />

            <p className="text-neutral-20 text-lg leading-[24px] text-center lg:text-start">
              Bright Tuition Care is Bangladesh's first and most trusted online
              platform for guardians, students and tutors to connect with
              verified tutors and find any tuition jobs throughout the country.
              Bright tuition care is dedicated to bridging the educational
            </p>
            <div className="flex justify-center lg:justify-start flex-row gap-4 items-center">
              <IconButton variant="primary" icon={ICONS.appStore} />
              <IconButton variant="primary" icon={ICONS.playStore} />
            </div>
          </div>
        </div>

        {/* Left Content */}
      </Container>
    </div>
  );
};

export default DownloadApp;
