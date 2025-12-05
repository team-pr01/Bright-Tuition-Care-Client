import { FiCheck, FiMapPin, FiUserCheck } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

const VerificationSuccess = () => {
  return (
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
          <p className="text-sm font-medium text-gray-700">Verified Profile</p>
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
          <p className="text-sm font-medium text-gray-700">Address Verified</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
