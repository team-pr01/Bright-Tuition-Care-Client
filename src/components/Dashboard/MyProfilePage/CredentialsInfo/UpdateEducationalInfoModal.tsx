/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import TextInput from "../../../Reusable/TextInput/TextInput";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { useUpdateIdentityInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";

const fileTypes = [
  "SSC/Marksheet/Certificate",
  "HSC/Marksheet/Certificate",
  "NID/Passport/BirthCertificate",
  "AdmissionSlip/UniversityId/Certificate",
  "Others",
];

type TIdentityForm = {
  fileType: string;
  file?: File | null;
};

type TFormData = {
  identityInformation: TIdentityForm[];
};

const emptyIdentity = (): TIdentityForm => ({
  fileType: "",
  file: null,
});

const UpdateIdentityInfoModal = ({
  setIsFormModalOpen,
  defaultValues,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: any[];
}) => {
  const [updateIdentityInfo, { isLoading }] = useUpdateIdentityInfoMutation();

  const [fileErrors, setFileErrors] = useState<Record<number, string>>({});

  const { register, control, handleSubmit, setValue, watch, reset } =
    useForm<TFormData>({
      defaultValues: { identityInformation: [emptyIdentity()] },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "identityInformation",
  });

  // Prefill defaults if available
  useEffect(() => {
    if (defaultValues && Array.isArray(defaultValues)) {
      const mapped = defaultValues.map((info: any) => ({
        fileType: info.fileType || "",
        file: null,
      }));
      reset({
        identityInformation: mapped.length ? mapped : [emptyIdentity()],
      });
    }
  }, [defaultValues, reset]);

  // ✅ File validation handler
  const handleFileChange = (file: File | null, index: number) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [index]: "Only PNG, JPG, and JPEG files are allowed ❌",
      }));
      setValue(`identityInformation.${index}.file`, null);
      return;
    }

    setFileErrors((prev) => ({ ...prev, [index]: "" }));
    setValue(`identityInformation.${index}.file`, file);
  };

  // ✅ Submit handler
  const onSubmit = async (formData: TFormData) => {
    try {
      const formDataToSend = new FormData();

      formData.identityInformation.forEach((info) => {
        formDataToSend.append("fileType", info.fileType);
        if (info.file) {
          formDataToSend.append("file", info.file);
        }
      });

      const response = await updateIdentityInfo(formDataToSend).unwrap();

      if (response.success) {
        toast.success(
          response.message || "Identity information updated successfully ✅"
        );
        setIsFormModalOpen(false);
      } else {
        toast.error(response.message || "Something went wrong ❌");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="space-y-4">
        {fields.map((field, index) => {
          const selectedFile = watch(`identityInformation.${index}.file`);
          return (
            <div
              key={field.id}
              className="p-4 border border-neutral-30/30 rounded-md bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Document #{index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 cursor-pointer"
                    title="Remove Document"
                  >
                    <FiTrash2 className="mb-[2px]" /> Remove
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {/* File Type Dropdown */}
                <SelectDropdown
                  label="File Type"
                  options={fileTypes}
                  {...register(
                    `identityInformation.${index}.fileType` as const,
                    {
                      required: true,
                    }
                  )}
                  isRequired
                />

                {/* File Upload Input */}
                <div>
                  <TextInput
                    label="Upload File"
                    type="file"
                    name=""
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] || null, index)
                    }
                    isRequired
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ⚠️ Only PNG, JPG, and JPEG formats are allowed
                  </p>

                  {fileErrors[index] && (
                    <p className="text-xs text-red-500 mt-1">
                      {fileErrors[index]}
                    </p>
                  )}

                  {selectedFile && (
                    <p className="text-xs text-green-600 mt-1">
                      ✅ {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add more button */}
      <button
        type="button"
        onClick={() => append(emptyIdentity())}
        className="text-primary-10 text-sm font-medium italic underline cursor-pointer"
      >
        ➕ Add More Identity Documents
      </button>

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
