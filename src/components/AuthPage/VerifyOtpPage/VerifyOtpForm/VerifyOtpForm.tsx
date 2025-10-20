import { useState, useRef, useEffect } from "react";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import { useForm } from "react-hook-form";
import {
  useResendForgetPasswordOtpMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useVerifyResetPasswordOtpMutation,
} from "../../../../redux/Features/Auth/authApi";
import { useNavigate } from "react-router-dom";

type TFormData = {
  email: string;
  otp: string;
};

const VerifyOtpForm = ({
  isForgetPasswordVerification,
}: {
  isForgetPasswordVerification?: boolean;
}) => {
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();
  const [
    resendForgetPasswordOtp,
    { isLoading: isResendForgotPasswordOtpLoading },
  ] = useResendForgetPasswordOtpMutation();
  const [verifyResetPasswordOtp] = useVerifyResetPasswordOtpMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<TFormData>();
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    const phoneNumber = localStorage.getItem("forgetPasswordPhNo");
    setEmail(email);
    setPhoneNumber(phoneNumber);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[idx] = val;
    setOtpValues(newOtpValues);
    setValue("otp", newOtpValues.join(""));
      // ✅ Clear OTP error once user starts typing again
  clearErrors("otp");
    trigger("otp");

    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Auto submit when all digits are filled
    if (newOtpValues.every((digit) => digit !== "")) {
      handleSubmit(handleVerifyOtp)();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && otpValues[idx] === "" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (data: TFormData) => {
    try {
      if (!isForgetPasswordVerification) {
        const payload = {
          email,
          otp: data.otp,
        };
        const response = await verifyOtp(payload).unwrap();
        if (response?.success) {
          navigate("/signin");
          localStorage.removeItem("signupEmail");
        }
      } else {
        const payload = {
          phoneNumber,
          otp: data.otp,
        };
        const response = await verifyResetPasswordOtp(payload).unwrap();
        if (response?.success) {
          navigate("/reset-password", {
            state: { navigateFrom: "verify-otp" },
          });
        }
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please try again.",
      });
    }
  };

  const handleResend = async () => {
    setOtpValues(["", "", "", ""]);
    try {
      if (!isForgetPasswordVerification) {
        const payload = {
          email,
        };
        const res = await resendOtp(payload);
        if (res?.data?.success) {
          setTimeLeft(120);
          setCanResend(false);
        }
      } else {
        const payload = {
          phoneNumber,
        };
        const res = await resendForgetPasswordOtp(payload);
        if (res?.data?.success) {
          setTimeLeft(120);
          setCanResend(false);
        }
      }
    } catch (err) {
      console.error("Resend OTP failed:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <form
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col gap-6 font-Nunito"
    >
      <AuthHeading
        title="Verify OTP"
        description="Enter the 4-digit code sent to your email or phone."
      />

      <div className="bg-neutral-50/10 rounded-2xl p-5 lg:p-7 flex flex-col gap-6">
        {/* {errors?.otp && (
          <p className="text-red-500 text-sm">{errors?.otp?.message}</p>
        )} */}

        <div className="flex items-center justify-center gap-5 md:gap-8">
          {/* OTP Inputs */}
          <div className="flex gap-2 md:gap-4 justify-center">
            {otpValues.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`size-10 md:size-12 text-center text-xl rounded-lg border ${
                  digit && !errors.otp && !isSubmitting
                    ? "border-primary-10 text-primary-10 focus:border-primary-10"
                    : isSubmitting
                    ? "border-primary-10 opacity-40 animate-pulse text-primary-10"
                    : errors?.otp
                    ? "border-red-500 focus:border-red-500 text-red-500"
                    : "border-neutral-30 focus:border-primary-10 text-primary-10"
                } focus:outline-none transition-colors`}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[idx] = el;
                }}
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>

        {/* Loader below inputs while submitting */}
        {isSubmitting && (
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary-10 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex md:gap-0 items-center justify-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
            >
              {isResendForgotPasswordOtpLoading || isResendOtpLoading
                ? "Resending OTP ..."
                : "Resend OTP"}
            </button>
          ) : (
            <p className="text-sm md:text-base leading-[24px] text-neutral-20">
              Didn't receive OTP? Resend in{" "}
              <span className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
