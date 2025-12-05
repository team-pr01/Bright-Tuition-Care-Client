import { FiDollarSign } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../redux/Features/Auth/authSlice";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

const PayVerificationFeeForm = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  return (
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
            Pay the profile verification charge to proceed to the next step.
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

          <a
            href={
              user?.role === "tutor"
                ? "/dashboard/tutor/invoice"
                : "/dashboard/guardian/invoice"
            }
            className="w-full bg-primary-10 hover:bg-primary-10/70 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <FiDollarSign className="w-5 h-5" />
            Pay Verification Fee
          </a>
        </div>
      </div>
    </div>
  );
};

export default PayVerificationFeeForm;
