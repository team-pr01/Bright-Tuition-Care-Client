/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import TextInput from "../../../Reusable/TextInput/TextInput";
import toast from "react-hot-toast";
import { useUpdateIdentityInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";

const fileTypes = [
  "SSC/Marksheet/Certificate",
  "HSC/Marksheet/Certificate",
  "NID/Passport/BirthCertificate",
  "AdmissionSlip/UniversityId/Certificate",
  "Others",
];

type TFormData = {
  fileType: string;
  file?: File | null;
};

const UpdateIdentityInfoModal = ({
  setIsFormModalOpen,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updateIdentityInfo, { isLoading }] = useUpdateIdentityInfoMutation();
  const [fileError, setFileError] = useState<string>("");

  const { register, handleSubmit, setValue, watch, reset } = useForm<TFormData>();

  const selectedFile = watch("file");

  // File validation
  const handleFileChange = (file: File | null) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PNG, JPG, and JPEG files are allowed ❌");
      setValue("file", null);
      return;
    }

    setFileError("");
    setValue("file", file);
  };

  const onSubmit = async (data: TFormData) => {
    try {
      const formData = new FormData();
      formData.append("profileCompleted", "10");
      formData.append("fileType", data.fileType);
      if (data.file) {
        formData.append("file", data.file);
      }

      const response = await updateIdentityInfo(formData).unwrap();

      if (response.success) {
        toast.success(
          response.message || "Identity information updated successfully ✅"
        );
        setIsFormModalOpen(false);
        reset();
      } else {
        toast.error(response.message || "Something went wrong ❌");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="p-4 border border-neutral-30/30 rounded-md bg-white">
        {/* File Type Dropdown */}
        <SelectDropdown
          label="File Type"
          options={fileTypes}
          {...register("fileType", { required: true })}
          isRequired
        />

        {/* File Upload Input */}
        <div className="mt-3">
          <TextInput
            label="Upload File"
            type="file"
            name=""
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            isRequired
          />
          <p className="text-xs text-gray-500 mt-2">
            ⚠️ Only PNG, JPG, and JPEG formats are allowed
          </p>

          {fileError && (
            <p className="text-xs text-red-500 mt-1">{fileError}</p>
          )}

          {selectedFile && (
            <p className="text-xs text-green-600 mt-1">
              ✅ {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      {/* Submit + Cancel Buttons */}
      <div className="flex items-center gap-4 justify-end mt-4">
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="py-2 w-full md:w-auto"
          onClick={() => setIsFormModalOpen(false)}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 w-full md:w-auto"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default UpdateIdentityInfoModal;
