import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";
import toast from "react-hot-toast";
import { useDeleteEducationMutation } from "../../../../redux/Features/Tutor/tutorApi";

const DeleteEducationConfirmationModal = ({
  setIsConfirmDeleteModalOpen,
  selectedEducationId,
}: {
  setIsConfirmDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEducationId: string;
}) => {
  // const navigate = useNavigate();
  const [deleteEducation, { isLoading }] = useDeleteEducationMutation();

  const handleDeleteEducation = async () => {
    try {
      const response = await deleteEducation(selectedEducationId).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Education deleted successfully");
        setIsConfirmDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Error deleting education:", err);
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <img src={ICONS.warning} alt="warning icon" className="size-28" />

      <div className="text-center text-neutral-900">
        <h1 className="text-xl font-semibold">Delete Education</h1>
        <p className="text-sm mt-2">
          Once you delete your education, it cannot be recovered.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          type="submit"
          label="Yes, Delete"
          variant="primary"
          className="py-2 lg:py-2"
          onClick={handleDeleteEducation}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="py-2 lg:py-2"
          onClick={() => setIsConfirmDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default DeleteEducationConfirmationModal;
