import { useEffect, useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import SendProfileVerificationRequest from "../SendProfileVerificationRequest/SendProfileVerificationRequest";
import VerificationSteps, {
  type VerificationStatus,
} from "./VerificationSteps";
import { useGetMyVerificationRequestQuery } from "../../../../redux/Features/VerificationRequest/verificationRequestApi";

const ProfileVerificationForm = ({
  isVerified,
  hasRequestedToVerify,
}: {
  isVerified: boolean;
  hasRequestedToVerify: boolean;
}) => {
  const { data: myVerificationRequest } = useGetMyVerificationRequestQuery({});
  const [isVerificationModalOpen, setIsVerificationModalOpen] =
    useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<VerificationStatus>();

  useEffect(() => {
    setCurrentStep(myVerificationRequest?.data?.status);
  }, [myVerificationRequest]);

  return (
    <div className="font-Nunito">
      {!hasRequestedToVerify && (
        <>
          <h1 className="font-semibold text-2xl text-neutral-10/90">
            {isVerified ? "Your profile is verified." : "Verify Your Profile"}
          </h1>
          <p className="text-sm mt-3">
            Your profile is not verified yet. Click to{" "}
            <strong>Request for Verification.</strong>
          </p>

          <Button
            type="button"
            label="Request for Verification"
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-2 lg:py-2 mt-7"
            onClick={() => setIsVerificationModalOpen(true)}
          />
        </>
      )}
      {/* {!isVerified && (
        <Button
          type="button"
          label="Request for Verification"
          variant="primary"
          iconWithoutBg={ICONS.topRightArrowWhite}
          className="py-2 lg:py-2 mt-7"
          onClick={() => setIsVerificationModalOpen(true)}
        />
      )} */}

      {hasRequestedToVerify && (
        <VerificationSteps currentStep={currentStep as VerificationStatus} addressVerificationCode={myVerificationRequest?.data?.addressVerificationCode} />
      )}

      <SendProfileVerificationRequest
        isVerificationModalOpen={isVerificationModalOpen}
        setIsVerificationModalOpen={setIsVerificationModalOpen}
      />
    </div>
  );
};

export default ProfileVerificationForm;
