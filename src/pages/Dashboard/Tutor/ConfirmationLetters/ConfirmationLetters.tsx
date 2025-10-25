import { useState } from "react";
import ConfirmationLetterCard from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterCard/ConfirmationLetterCard";
import Modal from "../../../../components/Reusable/Modal/Modal";
import type { TConfirmationLetter } from "../../../../types/confirmationLetter.types";
import ConfirmationLetterPreview from "../../../../components/Dashboard/Tutor/ConfirmationLettersPage/ConfirmationLetterPreview/ConfirmationLetterPreview";
import { useGetAllTutorsConfirmationLettersQuery } from "../../../../redux/Features/ConfirmationLetter/confirmationLetterApi";
import Loader from "../../../../components/Reusable/Loader/Loader";
import NoData from "../../../../components/Reusable/NoData/NoData";

const ConfirmationLetters = () => {
  const { data: allTutorsConfirmationLetters, isLoading } =
    useGetAllTutorsConfirmationLettersQuery({});
  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [isLetterPreviewOpen, setIsLetterPreviewOpen] =
    useState<boolean>(false);
  return (
    <div className="">
      {isLoading ? (
        <div className="py-10">
          <Loader size="lg" text="Please wait..." />
        </div>
      ) : allTutorsConfirmationLetters?.data &&
        allTutorsConfirmationLetters.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTutorsConfirmationLetters.data.map(
            (letter: TConfirmationLetter) => (
              <ConfirmationLetterCard
                key={letter?._id}
                letter={letter}
                setSelectedLetterId={setSelectedLetterId}
                setIsLetterPreviewOpen={setIsLetterPreviewOpen}
              />
            )
          )}
        </div>
      ) : (
        <NoData />
      )}

      <Modal
        isModalOpen={isLetterPreviewOpen}
        setIsModalOpen={setIsLetterPreviewOpen}
        width="w-[60%] md:w-[40%] max-h-[600px] overflow-y-auto"
      >
        <ConfirmationLetterPreview letterId={selectedLetterId as string} />
      </Modal>
    </div>
  );
};

export default ConfirmationLetters;
