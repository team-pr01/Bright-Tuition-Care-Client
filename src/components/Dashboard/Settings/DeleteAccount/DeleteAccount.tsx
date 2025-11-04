import { useState } from "react";
import Button from "../../../Reusable/Button/Button";
import DeleteAccountCOnfirmationModal from "./DeleteAccountCOnfirmationModal";
import { ICONS } from "../../../../assets";

const DeleteAccount = () => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState<boolean>(false);
  return (
    <div className="font-Nunito">
      <h1 className="font-semibold text-2xl text-neutral-10/90">
        Delete Your Account
      </h1>
      <p className="text-sm mt-3 max-w-full md:max-w-[500px]">
        Are you sure you want to delete your account? This action cannot be
        undone. Please proceed with caution.
      </p>

      <div className="flex justify- mt-7">
        <Button
          type="button"
          label="Delete Account"
          variant="primary"
          iconWithoutBg={ICONS.deleteWhite}
          className="py-2 lg:py-2 bg-red-600 border-red-600"
          onClick={() => setIsConfirmDeleteModalOpen(true)}
        />
      </div>

      <DeleteAccountCOnfirmationModal
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
      />
    </div>
  );
};

export default DeleteAccount;
