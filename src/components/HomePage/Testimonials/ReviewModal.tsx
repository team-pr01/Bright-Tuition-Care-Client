import Modal from "../../Reusable/Modal/Modal";

const ReviewModal = ({ isReviewModalOpen, setIsReviewModalOpen, review }) => {
  return (
    <Modal
      isModalOpen={isReviewModalOpen}
      setIsModalOpen={setIsReviewModalOpen}
    >
      <p className="text-neutral-10 text-base md:text-xl font-medium text-center font-Nunito">
        "{review}"
      </p>
    </Modal>
  );
};

export default ReviewModal;
