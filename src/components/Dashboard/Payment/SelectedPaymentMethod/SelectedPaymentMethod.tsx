import { ICONS, IMAGES } from "../../../../assets";
import SubmitProofForm from "../SubmitProofForm/SubmitProofForm";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

type TSelectedPaymentMethodProps = {
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPaymentMethod: string;
  amount: number;
  paidFor: string;
};
const SelectedPaymentMethod: React.FC<TSelectedPaymentMethodProps> = ({
  setIsPaymentModalOpen,
  selectedPaymentMethod,
  amount,
  paidFor,
}) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-2 md:mt-5 font-Nunito">
      <div>
        <h1 className="text-xl font-semibold text-center">
          {selectedPaymentMethod === "bankTransfer"
            ? "Bank Transfer"
            : selectedPaymentMethod === "nagad"
            ? "Nagad Payment"
            : selectedPaymentMethod === "rocket"
            ? "Rocket Payment"
            : "bKash Payment"}
        </h1>
        <p className="text-neutral-20 mt-1 max-w-[400px] mx-auto text-center">
          Please complete the payment manually and provide payment proof in the
          below form
        </p>
      </div>

      <div className="bg-white border-primary-40/10 p-5 rounded-2xl flex flex-col md:flex-row gap-4 w-full">
        <div className="flex gap-4">
          <img
            src={
              selectedPaymentMethod === "bankTransfer"
                ? ICONS.bank
                : selectedPaymentMethod === "nagad"
                ? ICONS.nagad
                : selectedPaymentMethod === "rocket"
                ? ICONS.rocket
                : ICONS.bkash
            }
            alt="bKash-icon"
            className="size-10"
          />
          <div>
            <h1 className="text-sm md:text-lg font-medium">
              {selectedPaymentMethod === "bankTransfer"
                ? "DBBL Bank Account"
                : selectedPaymentMethod === "nagad"
                ? "Nagad Personal"
                : selectedPaymentMethod === "rocket"
                ? "Rocket Personal"
                : "bKash Personal"}
            </h1>
            <h1 className="text-lg md:text-xl font-semibold ">
              {
                selectedPaymentMethod === "bankTransfer"
                  ? "Shorif Mia" // bank account name
                  : selectedPaymentMethod === "nagad"
                  ? "01610785588" // nagad
                  : selectedPaymentMethod === "rocket"
                  ? "019886038203" // rocket
                  : "01988603820" //bkash
              }
            </h1>
            <h2 className="text-neutral-20 mt-1">
              {selectedPaymentMethod === "bankTransfer"
                ? "1481050208725" // bank account number
                : "Bright Tuition Care"}
            </h2>
          </div>
        </div>

        {selectedPaymentMethod !== "bankTransfer" &&
          selectedPaymentMethod !== "nagad" && (
            <div className="border border-primary-40/10 rounded-2xl flex items-center justify-center w-full md:w-28 size-36 md:size-28">
              <img
                src={
                  selectedPaymentMethod === "bKash"
                    ? IMAGES.bkashQrCode
                    : IMAGES.rocketQrCode
                }
                alt=""
              />
            </div>
          )}
      </div>

      <div className="bg-white border-primary-40/10 p-5 rounded-2xl">
        <div
          className="flex gap-2 cursor-pointer items-center justify-between w-full"
          onClick={() => setIsAccordingOpen(!isAccordingOpen)}
        >
          <h2 className="font-semibold text-center">Submit Payment Proof</h2>
          <p>
            <FaChevronDown
              className={`text-text transition-all duration-300 ${
                isAccordingOpen && "rotate-[180deg] !text-[#3B9DF8]"
              }`}
            />
          </p>
        </div>
        <div
          className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
            isAccordingOpen
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0 h-0"
          }`}
        >
          <SubmitProofForm
            amount={amount}
            selectedPaymentMethod={selectedPaymentMethod}
            paidFor={paidFor}
            setIsPaymentModalOpen={setIsPaymentModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedPaymentMethod;
