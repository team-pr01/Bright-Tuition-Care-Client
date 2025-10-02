import { useState } from "react";
import Button from "../../../../components/Reusable/Button/Button";
import { mockData } from "../../Tutor/ConfirmationLetters/ConfirmationLetters";
import ConfirmationLetterCard from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterCard/ConfirmationLetterCard";
import Modal from "../../../../components/Reusable/Modal/Modal";
import ConfirmationLetterPreview from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterPreview/ConfirmationLetterPreview";
import SendConfirmationLetterForm from "../../../../components/Admin/ConfirmationLetterManagementPage/SendConfirmationLetterForm/SendConfirmationLetterForm";

const ConfirmationLetterManagement = () => {
  const [isConfirmationLetterModalOpen, setIsConfirmationLetterModalOpen] =
    useState<boolean>(false);
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [isLetterPreviewOpen, setIsLetterPreviewOpen] =
    useState<boolean>(false);
  return (
    <div className="font-Nunito flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Total Confirmation Letters (2)
        </h3>
        <Button
          label="Send Confirmation Letter"
          onClick={() => {
            setIsConfirmationLetterModalOpen(true);
          }}
          className="px-3 lg:px-3 py-2 lg:py-2 border-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.map((letter) => (
          <ConfirmationLetterCard
            key={letter?._id}
            letter={letter}
            setSelectedLetterId={setSelectedLetterId}
            setIsLetterPreviewOpen={setIsLetterPreviewOpen}
          />
        ))}
      </div>
      <Modal
        isModalOpen={isLetterPreviewOpen}
        setIsModalOpen={setIsLetterPreviewOpen}
        width="w-[60%] md:w-[40%] max-h-[600px] overflow-y-auto"
      >
        <ConfirmationLetterPreview />
      </Modal>
      <Modal
        heading="Send Confirmation Letter"
        isModalOpen={isConfirmationLetterModalOpen}
        setIsModalOpen={setIsConfirmationLetterModalOpen}
        width="w-[60%] md:w-[30%] max-h-[600px] overflow-y-auto"
      >
        <SendConfirmationLetterForm />
      </Modal>
    </div>
  );
};

export default ConfirmationLetterManagement;
