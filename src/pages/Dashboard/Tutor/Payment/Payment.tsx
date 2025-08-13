/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ICONS } from "../../../../assets";
import SupportBar from "../../../../components/Dashboard/SupportBar/SupportBar";
import Button from "../../../../components/Reusable/Button/Button";
import Modal from "../../../../components/Reusable/Modal/Modal";
import { LiaQrcodeSolid } from "react-icons/lia";
import TextInput from "../../../../components/Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";

type TFormData = {
  senderNumber: string;
  file?: string;
  amount?: string;
};
const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalType, setPaymentModalType] = useState<
    "selectPaymentMethod" | "addPaymentDetails"
  >("selectPaymentMethod");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bankTransfer" | "bKash" | "nagad" | string
  >("");

  const paymentMethods = [
    {
      name: "Bank Transfer",
      description: "Transfer through bank account",
      icon: ICONS.bank,
      key: "bankTransfer",
    },
    {
      name: "bKash",
      description: "Transfer through mobile banking",
      icon: ICONS.bkash,
      key: "bKash",
    },
    {
      name: "Nagad",
      description: "Transfer through mobile banking",
      icon: ICONS.nagad,
      key: "nagad",
    },
  ];

  const handleSubmitProof = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="font-Nunito flex flex-col justify-between gap-5 h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <div className="bg-white border border-primary-40/10 rounded-2xl py-7 px-5 flex flex-col items-center gap-5">
          <img
            src={ICONS.platformCharge}
            alt="platform-charge"
            className="size-20"
          />

          <div className="text-neutral-10 text-center">
            <h1 className="font-bold text-xl">Platform Charge</h1>
            <p className="text-sm mt-[6px]">
              After finalizing a job to a tutor, we ask for (55%-Home Tutoring;
              55%-Online Tutoring; 35%-Package Tutoring; 55%-Group Tutoring)
              advance of his/her first month's payment only once for each
              tuition job.
            </p>
          </div>

          <Button
            type="button"
            label="Pay Now"
            variant="tertiary"
            className="py-2 lg:py-2"
            onClick={() => {
              setIsPaymentModalOpen(true);
              setPaymentModalType("selectPaymentMethod");
            }}
          />
        </div>
      </div>

      <SupportBar />

      <Modal
        isModalOpen={isPaymentModalOpen}
        setIsModalOpen={setIsPaymentModalOpen}
        width="w-auto"
      >
        {paymentModalType === "selectPaymentMethod" ? (
          <div className="w-full flex flex-col items-center gap-6 mt-5 px-10">
            <h1 className="text-xl font-semibold ">
              Please select a payment method
            </h1>

            <div className="grid grid-cols-3 gap-6">
              {paymentMethods?.map((paymentMethod) => (
                <button
                  key={paymentMethod?.key}
                  onClick={() => setSelectedPaymentMethod(paymentMethod?.key)}
                  className={`border cursor-pointer transition duration-300 py-7 rounded-2xl px-5 flex flex-col items-center text-center gap-5 ${
                    selectedPaymentMethod === paymentMethod?.key
                      ? "bg-primary-10 border-primary-10 text-white"
                      : "bg-white hover:bg-neutral-50/5 border-primary-40/10"
                  }`}
                >
                  <div className="size-20 rounded-full bg-primary-20 flex items-center justify-center">
                    <img src={paymentMethod?.icon} alt="" className="size-11" />
                  </div>

                  <div>
                    <h1 className="text-xl font-semibold ">
                      {paymentMethod?.name}
                    </h1>
                    <p className="text-sm mt-2">{paymentMethod?.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="submit"
                label="Next"
                variant="primary"
                className="py-2 lg:py-2"
                iconWithoutBg={ICONS.rightArrow}
                isDisabled={!selectedPaymentMethod}
                onClick={() => setPaymentModalType("addPaymentDetails")}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-6 mt-5 px-5">
            <div>
              <h1 className="text-xl font-semibold text-center">
                bKash Payment
              </h1>
              <p className="text-neutral-20 mt-1 max-w-[400px] mx-auto text-center">
                Please complete the payment manually and provide payment proof
                in the below form
              </p>
            </div>

            <div className="bg-white border-primary-40/10 p-5 rounded-2xl flex gap-4">
              <img src={ICONS.bkash} alt="bKash-icon" className="size-10" />
              <div>
                <h1 className="text-lg font-medium">bKash</h1>
                <h1 className="text-xl font-semibold ">+880 17200000000</h1>
                <h2 className="text-neutral-20 mt-1">Bright Tuition Care</h2>
              </div>

              <div className="border border-primary-40/10 rounded-2xl flex items-center justify-center size-28">
                <LiaQrcodeSolid className="size-28" />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleSubmitProof)}
              className="flex flex-col w-full"
            >
              <h1 className="text-kg font-semibold">Provide payment proof</h1>
              <div className="flex flex-col gap-4 mt-4">
                <TextInput
                  label="Sender Phone Number "
                  placeholder="Enter sender phone number or account number"
                  error={errors.senderNumber}
                  {...register("senderNumber", {
                    required: "Number is required",
                  })}
                />
                <TextInput
                  label="Screenshot of Payment (optional)"
                  type="file"
                  {...register("file")}
                  error={errors.file as any}
                  isRequired={false}
                />
                <TextInput
                  label="Amount"
                  error={errors.amount}
                  {...register("amount")}
                  value="500"
                  isDisabled={true}
                />

                <Button
                  type="submit"
                  label="Submit"
                  variant="primary"
                  className="py-2 lg:py-2 w-full flex items-center justify-center"
                />
              </div>

              <p className="text-neutral-20 mt-2 max-w-[400px] mx-auto text-center">
                Having any problem with payment?{" "}
                <a
                  href="tel:01720000000"
                  className="underline font-semibold text-primary-10"
                >
                  Call Us
                </a>
              </p>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Payment;
