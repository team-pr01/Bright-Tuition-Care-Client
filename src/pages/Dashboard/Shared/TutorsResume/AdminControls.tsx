import { useNavigate, type Location } from "react-router-dom";
import Button from "../../../../components/Reusable/Button/Button";
import type { TLoggedInUser } from "../../../../types/loggedinUser.types";

type AdminControlsProps = {
  location: Location;
  user?: TLoggedInUser;
  profile?: {
    userId?: {
      _id?: string;
    };
  };

  // loading states
  isShortlisting: boolean;
  isAppointing: boolean;
  isConfirming: boolean;
  isRejecting: boolean;

  // handlers
  handleShortlistTutor: () => void;
  handleAppointTutor: () => void;
  handleRejectTutor: () => void;
  handleConfirmTutor: () => void;

  buttonStyle: string;
};

const AdminControls = ({
  location,
  user,
  profile,
  isShortlisting,
  isAppointing,
  isConfirming,
  isRejecting,
  handleShortlistTutor,
  handleAppointTutor,
  handleRejectTutor,
  handleConfirmTutor,
  buttonStyle,
}: AdminControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          label="Go Back"
          variant="tertiary"
          className={buttonStyle}
          onClick={() => navigate(-1)}
        />

        {/* {(location.pathname.startsWith("/dashboard/admin/tutor") ||
        location.pathname.startsWith("/dashboard/staff/tutor")) && (
        
      )} */}
        <Button
          label="View Applications"
          variant="primary"
          className={buttonStyle}
          onClick={() =>
            navigate(
              `/dashboard/${
                user?.role === "admin" ? "admin" : "staff"
              }/tutor/applications/${profile?.userId?._id}`
            )
          }
        />
      </div>

      {location.pathname.startsWith("/dashboard/admin/application") && (
        <div className="flex flex-wrap items-center gap-3">
          <Button
            label={isShortlisting ? "Please wait..." : "Shortlist"}
            variant="tertiary"
            className={buttonStyle}
            onClick={handleShortlistTutor}
            isDisabled={
              isShortlisting || isAppointing || isConfirming || isRejecting
            }
          />

          <Button
            label={isAppointing ? "Please wait..." : "Appoint"}
            variant="tertiary"
            className={`${buttonStyle} border-[#9C9700] hover:bg-[#9C9700] text-[#9C9700] hover:text-white`}
            onClick={handleAppointTutor}
            isDisabled={
              isShortlisting || isAppointing || isConfirming || isRejecting
            }
          />

          <Button
            label={isRejecting ? "Please wait..." : "Reject"}
            variant="tertiary"
            className={`${buttonStyle} border-red-500 hover:bg-red-500 text-red-500 hover:text-white`}
            onClick={handleRejectTutor}
            isDisabled={isShortlisting || isRejecting || isConfirming}
          />

          <Button
            label={isConfirming ? "Please wait..." : "Confirm"}
            variant="tertiary"
            className={`${buttonStyle} border-green-600 hover:bg-green-600 text-green-600 hover:text-white`}
            onClick={handleConfirmTutor}
            isDisabled={
              isShortlisting || isAppointing || isConfirming || isRejecting
            }
          />
        </div>
      )}
    </div>
  );
};

export default AdminControls;
