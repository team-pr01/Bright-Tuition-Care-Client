import { useState } from "react";
import { FiCheck } from "react-icons/fi";

const SignatureField = ({ label }: { label: string }) => {
  const [signature, setSignature] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (signature.trim()) {
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
            className="font-[Dancing Script] text-neutral-20 bg-transparent border-none outline-none text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          />
          {signature && (
            <button
              onClick={handleSubmit}
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
        (Date: {new Date().toLocaleDateString()})
      </p>
    </div>
  );
};


export default SignatureField