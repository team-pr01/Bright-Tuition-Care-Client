import React, { useState } from "react";
import {
  FiClock,
  FiCheck,
  FiDollarSign,
  FiMapPin,
  FiUserCheck,
  FiMail,
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { MdOutlinePayment, MdOutlineVerified } from "react-icons/md";

export type VerificationStatus =
  | "pending"
  | "reviewing"
  | "invoice_due"
  | "address_verification"
  | "verified";

interface VerificationStepsProps {
  currentStep: VerificationStatus;
  onInvoicePay?: () => void;
  onCodeSubmit?: (code: string) => void;
  isLoading?: boolean;
}

const VerificationSteps: React.FC<VerificationStepsProps> = ({
  currentStep,
  onInvoicePay,
  onCodeSubmit,
  isLoading = false,
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  const steps = [
    {
      id: 1,
      key: "pending" as VerificationStatus,
      title: "Request Pending",
      icon: <FiClock />,
      description: "Your verification request has been submitted",
      color: "text-gray-500",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-300",
    },
    {
      id: 2,
      key: "reviewing" as VerificationStatus,
      title: "Reviewing",
      icon: <FiFileText />,
      description: "Your documents are being reviewed",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: 3,
      key: "invoice_due" as VerificationStatus,
      title: "Invoice Due",
      icon: <FiDollarSign />,
      description: "Payment required for verification",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: 4,
      key: "address_verification" as VerificationStatus,
      title: "Address Verification",
      icon: <FiMapPin />,
      description: "Enter verification code from letter",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 5,
      key: "verified" as VerificationStatus,
      title: "Address Verified",
      icon: <FiCheck />,
      description: "Verification completed successfully",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.key === currentStep);
  };

  const getStepStatus = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim() && onCodeSubmit) {
      onCodeSubmit(verificationCode);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-2">
              <FiUserCheck className="w-6 h-6 text-primary-10" />
              Profile Verification
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`
                px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                ${
                  currentStep === "verified"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              `}
              >
                {currentStep === "verified" ? (
                  <>
                    <FiCheckCircle className="w-4 h-4" />
                    Verified
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="w-4 h-4" />
                    Pending
                  </>
                )}
              </div>
              <span className="text-gray-600 text-sm">
                Step {getCurrentStepIndex() + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* Progress circle */}
          <div className="w-20 h-20 rounded-full border-8 border-primary-10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {getCurrentStepIndex() + 1}/{steps.length}
              </div>
              <div className="text-xs text-gray-500">Steps</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1
                  ${
                    getStepStatus(index) === "completed"
                      ? "bg-primary-10 text-white"
                      : getStepStatus(index) === "current"
                      ? "bg-white border-2 border-primary-10 text-primary-500"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
                >
                  {getStepStatus(index) === "completed" ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    React.cloneElement(step.icon as React.ReactElement, {
                      className: "w-4 h-4 text-primary-10",
                    })
                  )}
                </div>
                <span
                  className={`
                  text-xs font-medium
                  ${
                    getStepStatus(index) === "current"
                      ? "text-primary-10"
                      : "text-gray-500"
                  }
                `}
                >
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-8">
        {currentStep === "pending" || currentStep === "reviewing" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {currentStep === "pending" ? (
                <FiClock className="w-8 h-8 text-gray-400" />
              ) : (
                <FiLoader className="w-8 h-8 text-yellow-500 animate-spin" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {currentStep === "pending" ? "Request Submitted" : "Under Review"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {currentStep === "pending"
                ? "Your verification request has been submitted. Our team will review it shortly."
                : "Your documents are currently under review. This may take 24-48 hours."}
            </p>
          </div>
        ) : currentStep === "invoice_due" ? (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MdOutlinePayment className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Invoice Payment Required
                </h3>
                <p className="text-gray-600 mb-4">
                  Pay the profile verification charge to proceed to the next
                  step.
                </p>

                {/* Invoice Details */}
                <div className="bg-white rounded-lg border border-orange-100 p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Verification Fee</span>
                    <span className="font-semibold">₹500.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Invoice #</span>
                    <span className="text-sm text-gray-500">INV-2023-001</span>
                  </div>
                </div>

                <button
                  onClick={onInvoicePay}
                  disabled={isLoading}
                  className="w-full bg-primary-10 hover:bg-primary-10/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiDollarSign className="w-5 h-5" />
                      Pay Verification Fee
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Secure payment gateway • Invoice will be emailed
                </p>
              </div>
            </div>
          </div>
        ) : currentStep === "address_verification" ? (
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
                  Please enter the "Verification Code" which you will receive in
                  your address verification letter. Kindly wait for the arrival
                  of the letter.
                </p>

                <form onSubmit={handleSubmitCode}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Verification Code *
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-10 focus:border-transparent transition-all duration-200"
                      placeholder="Enter 6-digit code"
                      required
                      maxLength={6}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {!verificationCode.trim() && "This Field is Required"}
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !verificationCode.trim()}
                    className="w-full bg-primary-10 hover:bg-primary-10/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    The verification code will be sent to your registered
                    address via postal mail. Please allow 5-7 business days for
                    delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : currentStep === "verified" ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdOutlineVerified className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">
              Verification Complete! 🎉
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your profile has been successfully verified.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FiUserCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Verified Profile
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FiCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Trust Badge</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FiMapPin className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Address Verified
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Steps List */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Verification Steps
        </h4>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`
                flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                ${
                  getStepStatus(index) === "current"
                    ? "bg-primary-10"
                    : getStepStatus(index) === "completed"
                    ? "bg-green-50"
                    : "bg-gray-50"
                }
              `}
            >
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${
                  getStepStatus(index) === "completed"
                    ? "bg-green-100 text-green-600"
                    : getStepStatus(index) === "current"
                    ? "bg-primary-100 text-primary-600"
                    : "bg-gray-100 text-gray-400"
                }
              `}
              >
                {getStepStatus(index) === "completed" ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  React.cloneElement(step.icon as React.ReactElement, {
                    className: "w-5 h-5",
                  })
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5
                    className={`font-medium ${
                      getStepStatus(index) === "current"
                        ? "text-primary-700"
                        : "text-gray-700"
                    }`}
                  >
                    {step.title}
                  </h5>
                  {getStepStatus(index) === "current" && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationSteps;
