import { useEffect, useState } from "react";
import HireTutorForm from "../../../../components/Guardian/HireTutorForm/HireTutorForm";
import Modal from "../../../../components/Reusable/Modal/Modal";

const HireATutor = () => {
  const [isHireTutorModalOpen, setIsHireTutorModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setIsHireTutorModalOpen(true);
  }, []);
  return (
    <Modal
      isModalOpen={isHireTutorModalOpen}
      setIsModalOpen={setIsHireTutorModalOpen}
      heading={``}
      width="w-[50%]"
    >
      <div className="font-Nunito">
        <div className="max-w-[1000px] mx-auto">
          <HireTutorForm />
        </div>
      </div>
    </Modal>
  );
};

export default HireATutor;
