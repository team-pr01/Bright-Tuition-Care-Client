import React from "react";
import {
  FiClock,
  FiCheck,
  FiDollarSign,
  FiMapPin,
  FiUserCheck,
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import PayVerificationFeeForm from "./PayVerificationFeeForm";
import AddressVerificationForm from "./AddressVerificationForm";
import VerificationSuccess from "./VerificationSuccess";

export type VerificationStatus =
  | "pending"
  | "reviewing"
  | "invoiceDue"
  | "addressVerification"
  | "verified";

interface VerificationStepsProps {
  currentStep: VerificationStatus;
  addressVerificationCode: string;
}

const VerificationSteps: React.FC<VerificationStepsProps> = ({
  currentStep,
  addressVerificationCode,
}) => {
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
      key: "invoiceDue" as VerificationStatus,
      title: "Invoice Due",
      icon: <FiDollarSign />,
      description: "Payment required for verification",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      id: 4,
      key: "addressVerification" as VerificationStatus,
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
      title: "Verified",
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
    if (currentStep === "verified") {
      return stepIndex <= currentIndex ? "completed" : "pending";
    }

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
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
                px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 capitalize
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
                    {currentStep === "invoiceDue"
                      ? "Invoice Due"
                      : currentStep === "addressVerification"
                      ? "Address Verification"
                      : currentStep}
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
                    <div className="w-4 h-4 text-primary-10">{step.icon}</div>
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
        ) : currentStep === "invoiceDue" ? (
          <PayVerificationFeeForm />
        ) : currentStep === "addressVerification" ? (
          <AddressVerificationForm
            addressVerificationCode={addressVerificationCode}
          />
        ) : currentStep === "verified" ? (
          <VerificationSuccess />
        ) : null}
      </div>

      {/* Steps List */}
      <div className="mt-8 border-t border-neutral-30/50 pt-6">
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
                  <div className="w-5 h-5">{step.icon}</div>
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
