/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import Modal from "../../../Reusable/Modal/Modal";
import { useGiveRatingMutation } from "../../../../redux/Features/User/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import TextInput from "../../../Reusable/TextInput/TextInput";

type TFormData = {
  rating: string;
};
const RateUserModal = ({
  isRatingModalOpen,
  setIsRatingModalOpen,
  selectedUserId,
  defaultValue,
  setSelectedUserRating,
}: {
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: any;
  selectedUserId: string | null;
  defaultValue?: string;
  setSelectedUserRating?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  useEffect(() => {
    if (defaultValue) {
      setValue("rating", defaultValue);
    }
  }, [defaultValue, setValue]);

  const [giveRating, { isLoading }] = useGiveRatingMutation();

  const handleGiveRating = async (data: TFormData) => {
    try {
      const res = await giveRating({ data, id: selectedUserId }).unwrap();
      if (res?.success) {
        reset();
        setIsRatingModalOpen(false);
        setSelectedUserRating(null);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error rating user. Please try again."
      );
    }
  };
  return (
    <Modal
      isModalOpen={isRatingModalOpen}
      setIsModalOpen={setIsRatingModalOpen}
      heading={`Rating`}
    >
      <form
        onSubmit={handleSubmit(handleGiveRating)}
        className="flex flex-col gap-6 font-Nunito mt-5"
      >
        {/* Rating */}
        <TextInput
          label="Rating"
          placeholder="Ex: 4.5"
          error={errors.rating}
          {...register("rating")}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            label={defaultValue ? "Update" : "Submit"}
            variant="primary"
            className="py-[7px] lg:py-[7px] w-full md:w-fit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
};

export default RateUserModal;
