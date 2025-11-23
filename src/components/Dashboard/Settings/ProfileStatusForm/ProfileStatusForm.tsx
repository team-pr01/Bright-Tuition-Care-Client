import { Link } from "react-router-dom";
import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import { useState } from "react";
import RequestToUnlockProfileModal from "./RequestToUnlockProfileModal";

const ProfileStatusForm = ({
  profileStatus,
  isLoading,
}: {
  profileStatus: string;
  isLoading: boolean;
}) => {
  const [isRequestUnlockModalOpen, setIsRequestUnlockModalOpen] =
    useState<boolean>(false);
  if (isLoading) {
    return (
      <div className="font-Nunito animate-pulse">
        <div className="h-6 w-48 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
        <div className="mt-3 h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
        <div className="mt-2 h-4 w-[80%] bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
        <div className="mt-7 h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        Your Profile Status
      </h1>

      <p className="text-sm mt-3">
        {profileStatus === "unlocked"
          ? "Your profile is now unlocked, and you can edit it whenever you want."
          : "Your profile is now locked, and you can't edit it until you unlock it."}
      </p>

      {profileStatus === "unlocked" && (
        <Link
          to="/dashboard/tutor/my-profile"
          className="flex justify-start mt-7"
        >
          <Button
            type="button"
            label={"Edit Profile"}
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-2 lg:py-2"
          />
        </Link>
      )}

      {profileStatus === "locked" && (
        <Button
          type="button"
          label="Request to Unlock"
          variant="primary"
          iconWithoutBg={ICONS.topRightArrowWhite}
          className="py-2 lg:py-2 mt-7"
          onClick={() => setIsRequestUnlockModalOpen(true)}
        />
      )}

      {isRequestUnlockModalOpen && (
        <RequestToUnlockProfileModal
          isRequestUnlockModalOpen={isRequestUnlockModalOpen}
          setIsRequestUnlockModalOpen={setIsRequestUnlockModalOpen}
        />
      )}
    </div>
  );
};

export default ProfileStatusForm;
