import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

type TSelectPaymentMethodProps = {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (paymentMethod: string) => void;
  setPaymentModalType: (
    paymentModalType:
      | "selectPaymentMethod"
      | "addPaymentDetails"
      | "paymentSuccess"
  ) => void;
};
const SelectPaymentMethod: React.FC<TSelectPaymentMethodProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setPaymentModalType,
}) => {
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
  return (
    <div className="w-full flex flex-col items-center gap-6 mt-2 md:mt-5 px-0 md:px-10">
      <h1 className="text-base md:text-xl font-semibold">
        Please select a payment method
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 w-full">
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
            <div className="size-12 md:size-20 rounded-full bg-primary-20 flex items-center justify-center">
              <img
                src={paymentMethod?.icon}
                alt=""
                className="size-8 md:size-11"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold ">{paymentMethod?.name}</h1>
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
  );
};

export default SelectPaymentMethod;
