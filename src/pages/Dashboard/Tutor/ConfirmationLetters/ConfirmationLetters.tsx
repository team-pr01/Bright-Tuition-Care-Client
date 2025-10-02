/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import ConfirmationLetterCard from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterCard/ConfirmationLetterCard";
import Modal from "../../../../components/Reusable/Modal/Modal";
import type { TConfirmationLetter } from "../../../../types/confirmationLetter.types";
import ConfirmationLetterPreview from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterPreview/ConfirmationLetterPreview";

export const mockData: TConfirmationLetter[] = [
  {
    _id: "1234",
    jobId: "JOB-101",
    tutorName: "John Doe",
    guardianName: "John Smith",
    studentName: "Emily Carter",
    tuitionDetails: "Maths - 3 Days/week",
    createdAt: "2025-10-02",
  },
  {
    _id: "54321",
    jobId: "JOB-102",
    tutorName: "Sarah Smith",
    guardianName: "John Smith",
    studentName: "Michael Brown",
    tuitionDetails: "English - 2 Days/week",
    createdAt: "2025-09-28",
  },
];

const ConfirmationLetters = () => {
    const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
    const [isLetterPreviewOpen, setIsLetterPreviewOpen] = useState<boolean>(false);
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.map((letter) => (
          <ConfirmationLetterCard key={letter?._id} letter={letter} setSelectedLetterId={setSelectedLetterId} setIsLetterPreviewOpen={setIsLetterPreviewOpen} />
        ))}
      </div>

      <Modal
        isModalOpen={isLetterPreviewOpen}
        setIsModalOpen={setIsLetterPreviewOpen}
        width="w-[60%] md:w-[40%] max-h-[600px] overflow-y-auto"
      >
        <ConfirmationLetterPreview/>
      </Modal>
    </div>
  );
};

export default ConfirmationLetters;
