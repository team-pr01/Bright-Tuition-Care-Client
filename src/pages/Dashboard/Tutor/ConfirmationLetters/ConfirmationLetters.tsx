import { useState } from "react";
import ConfirmationLetterCard from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterCard/ConfirmationLetterCard";
import Modal from "../../../../components/Reusable/Modal/Modal";
import type { TConfirmationLetter } from "../../../../types/confirmationLetter.types";
import ConfirmationLetterPreview from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterPreview/ConfirmationLetterPreview";
import { useGetAllTutorsConfirmationLettersQuery } from "../../../../redux/Features/ConfirmationLetter/confirmationLetterApi";
import NoData from "../../../../components/Reusable/NoData/NoData";
import LogoLoader from "../../../../components/Reusable/LogoLoader/LogoLoader";

const ConfirmationLetters = () => {
  const { data: allTutorsConfirmationLetters, isLoading } =
    useGetAllTutorsConfirmationLettersQuery({});

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [isLetterPreviewOpen, setIsLetterPreviewOpen] =
    useState<boolean>(false);

  const hasLetters = allTutorsConfirmationLetters?.data?.length > 0;

  // Loader centered
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LogoLoader />
      </div>
    );
  }

  // No data centered
  if (!hasLetters) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <NoData />
      </div>
    );
  }

  return (
    <div>
      {/* Data grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTutorsConfirmationLetters.data.map(
          (letter: TConfirmationLetter) => (
            <ConfirmationLetterCard
              key={letter._id}
              letter={letter}
              setSelectedLetterId={setSelectedLetterId}
              setIsLetterPreviewOpen={setIsLetterPreviewOpen}
            />
          )
        )}
      </div>

      {/* Preview modal */}
      <Modal
        isModalOpen={isLetterPreviewOpen}
        setIsModalOpen={setIsLetterPreviewOpen}
        width="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%] max-h-[600px] overflow-y-auto"
      >
        <ConfirmationLetterPreview letterId={selectedLetterId as string} />
      </Modal>
    </div>
  );
};

export default ConfirmationLetters;
