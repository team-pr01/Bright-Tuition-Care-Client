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
        <div className="flex flex-col gap-6 max-w-[1000px] mx-auto">
          {/* Heading */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-xl text-neutral-10">Hire a Tutor</h1>
            <p className="text-sm mt-[6px] text-neutral-10">
              Find expert tutors easily for personalized learning and academic
              success.
            </p>
          </div>

          <HireTutorForm />
        </div>
      </div>
    </Modal>
  );
};

export default HireATutor;
