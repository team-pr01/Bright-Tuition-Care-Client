/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../../redux/Features/Auth/authSlice";

type SignatureFieldProps = {
  label: string;
  onClick: (signature: string) => void;
  signature: string | null;
  signatureDate: string | null;
};

const SignatureField: React.FC<SignatureFieldProps> = ({
  label,
  onClick,
  signature: defaultSignature,
  signatureDate: defaultDate,
}) => {
  const user = useSelector(useCurrentUser) as any;
  const [signature, setSignature] = useState(defaultSignature || "");
  const [submitted, setSubmitted] = useState(!!defaultSignature);
  const isDisabled = submitted || user?.role === "admin";

  const handleSubmit = () => {
    if (signature.trim()) {
      onClick(signature);
      setSubmitted(true);
    }
  };

  return (
    <div className="text-center relative">
      {/* Signature Input */}
      {!submitted ? (
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Type Your Signature..."
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            disabled={isDisabled}
            className="font-[Dancing Script] text-neutral-20 bg-transparent border-none outline-none text-center disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          />
          {!isDisabled && signature && (
            <button
              onClick={handleSubmit}
              type="button"
              className="text-green-600 hover:text-green-800 cursor-pointer flex items-center"
            >
              <FiCheck size={20} /> Submit
            </button>
          )}
        </div>
      ) : (
        <p
          className="font-[Dancing Script] text-xl text-neutral-20"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {signature}
        </p>
      )}

      {/* Signature Line */}
      <div className="h-[2px] border-b border-gray-400 mb-2 mt-2"></div>

      {/* Labels */}
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-neutral-30">
        (Date: {defaultDate ? new Date(defaultDate).toLocaleDateString() : new Date().toLocaleDateString()})
      </p>
    </div>
  );
};

export default SignatureField;
