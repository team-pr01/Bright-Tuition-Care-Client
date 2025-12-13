import { RxArrowTopRight } from "react-icons/rx";
import { IMAGES } from "../../../../assets";
import Heading from "../../../../components/Reusable/Heading/Heading";
import { useLocation } from "react-router-dom";
import { guardianCommunity, tutorCommunity } from "../../../../data/community-facebook-links";

const JoinCommunity = () => {
  const location = useLocation();
  
  const communityLink =
    location.pathname === "/dashboard/tutor/community"
      ? tutorCommunity
      : guardianCommunity;
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Heading
        titleParts={[
          {
            text: `${
              location.pathname === "/dashboard/tutor/community"
                ? "Tutor Community"
                : "Guardian Community"
            }`,
          },
        ]}
        description={
          location.pathname === "/dashboard/tutor/community"
            ? "Join our tutor community to exchange teaching strategies, gain valuable insights, stay informed on the latest trends and access resources that support your professional growth."
            : "Join the Guardian Community to share your feedback, stay connected with our team and receive important updates and expert guidance to support your child’s learning."
        }
        align="center"
      />

      <img src={IMAGES.community} alt="" />
      <a
        target="_blank"
        href={communityLink}
        className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-xl flex items-center gap-2 px-5 py-3 cursor-pointer mt-5`}
      >
        Join Community <RxArrowTopRight className="text-lg" />
      </a>
    </div>
  );
};

export default JoinCommunity;
