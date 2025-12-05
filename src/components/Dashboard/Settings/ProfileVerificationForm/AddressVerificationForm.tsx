/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSubmitAddressCodeMutation } from "../../../../redux/Features/VerificationRequest/verificationRequestApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiAlertCircle, FiCheck, FiLoader, FiMail } from "react-icons/fi";

type TFormData = {
  addressVerificationCode: string;
};
const AddressVerificationForm = ({
  addressVerificationCode,
}: {
  addressVerificationCode: string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();
  const [submitAddressCode, { isLoading }] = useSubmitAddressCodeMutation();

  const handleAddressVerification = async (data: TFormData) => {
    try {
      const payload = {
        addressVerificationCode: data.addressVerificationCode,
      };
      const response = await submitAddressCode(payload).unwrap();
      if (response.success) {
        toast.success(
          response.message || "Address verification code submitted successfully"
        );
        reset();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error submitting address verification code"
      );
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <FiMail className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Enter Verification Code
          </h3>
          <p className="text-gray-600 mb-4">
            Please enter the "Verification Code" which you will receive in your
            address verification letter. Kindly wait for the arrival of the
            letter.
          </p>

          <form onSubmit={handleSubmit(handleAddressVerification)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Verification Code *
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all duration-200"
                placeholder="Enter 6-digit code"
                required
                {...register("addressVerificationCode", { required: true })}
                disabled={addressVerificationCode ? true : false}
              />
              {errors.addressVerificationCode && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a verification code.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary-10 hover:bg-primary-10/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isLoading || addressVerificationCode ? true : false}
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <FiCheck className="w-5 h-5" />
                  Submit Code
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-700 flex items-start gap-2">
              <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {addressVerificationCode
                ? "We have received your address verification code. It's under review."
                : "The verification code will be sent to your registered address via postal mail. Please allow 5-7 business days for delivery."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressVerificationForm;
