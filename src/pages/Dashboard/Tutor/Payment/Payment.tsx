import { useState } from "react";
import { ICONS } from "../../../../assets";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import Button from "../../../../components/Reusable/Button/Button";
import Modal from "../../../../components/Reusable/Modal/Modal";
import SelectPaymentMethod from "../../../../components/Dashboard/Payment/SelectPaymentMethod/SelectPaymentMethod";
import SelectedPaymentMethod from "../../../../components/Dashboard/Payment/SelectedPaymentMethod/SelectedPaymentMethod";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import { useSelector } from "react-redux";
import { useUser } from "../../../../contexts/UserContext";

const Payment = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const { user: myProfile } = useUser();
  const [paidFor, setPaidFor] = useState<string>("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalType, setPaymentModalType] = useState<
    "selectPaymentMethod" | "addPaymentDetails" | "paymentSuccess"
  >("selectPaymentMethod");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bankTransfer" | "bKash" | "nagad" | string
  >("");

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  // Charge details
  const charges = [
    {
      title: "Platform Charge",
      amount: 500,
      icon: ICONS.platformCharge,
      description:
        "After confirming a tutor for a job, we take a one-time platform charge as a service fee for using our platform. This fee is collected only once for each tuition job.",
      isPaid: myProfile?.hasPaidPlatformCharge || false,
    },
    {
      title: "Verification Charge",
      amount: 500,
      icon: ICONS.verificationCharge,
      description:
        "A one-time verification fee that covers the review of your tutor profile, academic documents, and identity to ensure maximum trust, safety, and authenticity across our platform.",
      isPaid: myProfile?.isVerified || false,
    },
  ];

  const chargesToShow =
    user?.role === "tutor"
      ? charges
      : charges?.filter((charge) => charge.title === "Verification Charge");

  return (
    <div className="font-Nunito flex flex-col justify-between gap-5 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {chargesToShow?.map((charge, index) => (
          <div
            key={index}
            className="bg-white border border-primary-40/10 rounded-2xl py-7 px-5 flex flex-col items-center gap-5"
          >
            <img src={charge.icon} alt={charge.title} className="size-20" />

            <div className="text-neutral-10 text-center">
              <h1 className="font-bold text-xl">
                {charge.title}{" "}
                <span className="text-primary-10">{charge.amount} BDT</span>
              </h1>
              <p className="text-sm mt-[6px]">{charge.description}</p>
            </div>

            <Button
              type="button"
              label={charge?.isPaid ? "Paid" : "Pay Now"}
              variant={charge?.isPaid ? "primary" : "tertiary"}
              isDisabled={charge?.isPaid}
              className="py-2 lg:py-2"
              onClick={() => {
                setSelectedAmount(charge?.amount);
                setIsPaymentModalOpen(true);
                setPaymentModalType("selectPaymentMethod");
                setPaidFor(charge?.title);
              }}
            />
          </div>
        ))}
      </div>

      <SupportBar />

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
            amount={selectedAmount}
            paidFor={paidFor}
          />
        )}
      </Modal>
    </div>
  );
};

export default Payment;
