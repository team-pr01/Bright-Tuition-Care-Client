import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import SelectPaymentMethod from "../../Payment/SelectPaymentMethod/SelectPaymentMethod";
import SelectedPaymentMethod from "../../Payment/SelectedPaymentMethod/SelectedPaymentMethod";

const ProfileVerificationForm = ({ isVerified }: { isVerified: boolean }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalType, setPaymentModalType] = useState<
    "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
  >("selectPaymentMethod");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bankTransfer" | "bKash" | "nagad" | string
  >("");
  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        {isVerified ? "Your profile is verified." : "Verify Your Profile"}
      </h1>
      {!isVerified ? (
        <p className="text-sm mt-3">
          Your profile is not verified yet. Click to{" "}
          <strong>Request for Verification.</strong>
        </p>
      ) : (
        <p className="text-sm mt-3">
          Thanks for <strong className="text-primary-10">Verifying</strong> Your
          profile
        </p>
      )}

      {!isVerified && (
        <Button
          type="button"
          label="Request for Verification"
          variant="primary"
          iconWithoutBg={ICONS.topRightArrowWhite}
          className="py-2 lg:py-2 mt-7"
          onClick={() => setIsPaymentModalOpen(true)}
        />
      )}

      {/* Payment Modal */}
      <Modal
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
      </Modal>
    </div>
  );
};

export default ProfileVerificationForm;
