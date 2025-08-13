import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import SendProfileVerificationRequest from "./SendProfileVerificationRequest";

const ProfileVerificationForm = () => {
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState<boolean>(false);
  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        Verify Your Profile
      </h1>
      <p className="text-sm mt-3">Your profile is not verified yet. Click to <strong>Request for Verification.</strong></p>

      <div className="flex justify- mt-7">
        <Button
        type="button"
        label="Request for Verification"
        variant="primary"
        iconWithoutBg={ICONS.topRightArrowWhite}
        className="py-2 lg:py-2"
        onClick={() => setIsVerificationModalOpen(true)}
      />
      </div>

      <SendProfileVerificationRequest isVerificationModalOpen={isVerificationModalOpen} setIsVerificationModalOpen={setIsVerificationModalOpen}/>
    </div>
  );
};

export default ProfileVerificationForm;
