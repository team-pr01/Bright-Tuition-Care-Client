import { useState, useRef, useEffect } from "react";
import AuthHeading from "../../../Reusable/AuthHeading/AuthHeading";
import Button from "../../../Reusable/Button/Button";
import { useForm } from "react-hook-form";

type TFormData = {
  otp: string;
};

const VerifyOtpForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<TFormData>();

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

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
    trigger("otp");

    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
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

  const handleVerifyOtp = (data: TFormData) => {
    console.log("OTP entered:", data.otp);
  };

  const handleResend = () => {
    console.log("Resend OTP triggered");
    setTimeLeft(60);
    setCanResend(false);
    setOtpValues(["", "", "", ""]);
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
        {errors.otp && (
          <p className="text-red-500 text-sm">{errors.otp.message}</p>
        )}

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
                  digit ? "border-primary-10" : "border-neutral-30"
                } focus:outline-none focus:border-primary-10 text-primary-10 transition-colors`}
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

          <Button type="submit" label="Verify" variant="primary" />
        </div>

        <div className="flex md:gap-0 items-center justify-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent cursor-pointer"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-sm md:text-base leading-[24px] text-neutral-20">
              Didn't receive OTP? Resend in{" "}
              <span className="font-semibold bg-gradient-to-r from-primary-10 to-primary-40/60 bg-clip-text text-transparent">
                {`0:${timeLeft.toString().padStart(2, "0")}`}
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default VerifyOtpForm;
