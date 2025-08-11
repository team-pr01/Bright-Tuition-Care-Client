import { RxArrowTopRight } from "react-icons/rx";
import { IMAGES } from "../../../../assets";
import Heading from "../../../../components/Reusable/Heading/Heading";
import { useLocation } from "react-router-dom";

const JoinCommunity = () => {
  const location = useLocation();
  const guardianCommunity = "https://www.facebook.com/groups/5212120622136650/";
  const tutorCommunity = "https://www.facebook.com/groups/100567064353666/";
  
  const communityLink =
    location.pathname === "/dashboard/tutor/community"
      ? tutorCommunity
      : guardianCommunity;
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Heading
        titleParts={[{ text: "Tutor Community" }]}
        description="Join our active Guardian Community to connect with other parents, share experiences, get recommendations, and stay updated with valuable tips and news about tutoring and child education."
        align="center"
      />

      <img src={IMAGES.community} alt="" />
      <a
        target="_blank"
        href={communityLink}
        className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-xl flex items-center gap-2 px-5 py-3 cursor-pointer mt-5`}
      >
        Join Community <RxArrowTopRight className="text-lg mt-1" />
      </a>
    </div>
  );
};

export default JoinCommunity;
