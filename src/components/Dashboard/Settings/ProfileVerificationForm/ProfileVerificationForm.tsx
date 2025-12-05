import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import SendProfileVerificationRequest from "../SendProfileVerificationRequest/SendProfileVerificationRequest";
import VerificationSteps, {
  type VerificationStatus,
} from "./VerificationSteps";

const ProfileVerificationForm = ({
  isVerified,
  hasRequestedToVerify,
}: {
  isVerified: boolean;
  hasRequestedToVerify: boolean;
}) => {
  // const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  // const [paymentModalType, setPaymentModalType] = useState<
  //   "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
  // >("selectPaymentMethod");

  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
  //   "bankTransfer" | "bKash" | "nagad" | string
  // >("");

  const [isVerificationModalOpen, setIsVerificationModalOpen] =
    useState<boolean>(false);

  const [currentStep, setCurrentStep] =
    useState<VerificationStatus>("verified");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvoicePay = async () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("address_verification");
    }, 2000);
  };

  const handleCodeSubmit = async (code: string) => {
    setIsLoading(true);
    // Simulate code verification
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("verified");
    }, 2000);
  };
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
        <VerificationSteps
          currentStep={currentStep}
          onInvoicePay={handleInvoicePay}
          onCodeSubmit={handleCodeSubmit}
          isLoading={isLoading}
        />
      )}

      <SendProfileVerificationRequest
        isVerificationModalOpen={isVerificationModalOpen}
        setIsVerificationModalOpen={setIsVerificationModalOpen}
      />

      {/* Payment Modal */}
      {/* <Modal
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
        width="w-[90%] md:w-auto max-h-[600px] overflow-y-auto"
      >
        {paymentModalType === "selectPaymentMethod" ? (
          <SelectPaymentMethod
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            setPaymentModalType={setPaymentModalType}
          />
        ) : (
          <SelectedPaymentMethod
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            selectedPaymentMethod={selectedPaymentMethod}
            amount={500}
            paidFor={"Verification Charge"}
          />
        )}
      </Modal> */}
    </div>
  );
};

export default ProfileVerificationForm;
