import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const ProfileStatusForm = () => {
  const profileStatus = "unlocked";
  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        Your Profile Status
      </h1>
      <p className="text-sm mt-3">
        {
            profileStatus === "unlocked" ?
            "Your profile is now unlocked, and you can edit it whenever you want."
            :
            "Your profile is now locked, and you can't edit it until you unlock it."
        }
      </p>

      {profileStatus === "unlocked" && (
        <Link to="/dashboard/tutor/profile" className="flex justify- mt-7">
          <Button
            type="button"
            label={"Edit Profile"}
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-2 lg:py-2"
          />
        </Link>
      )}
    </div>
  );
};

export default ProfileStatusForm;
