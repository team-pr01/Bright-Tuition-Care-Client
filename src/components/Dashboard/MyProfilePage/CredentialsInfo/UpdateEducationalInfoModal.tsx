/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import toast from "react-hot-toast";
import { useUpdateIdentityInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import { FiUploadCloud, FiX, FiFile, FiImage } from "react-icons/fi";
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";

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
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<TFormData>();

  const selectedFile = watch("file");
  const selectedFileType = watch("fileType");

  // File validation
  const validateAndSetFile = (file: File | null) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PNG, JPG, and JPEG files are allowed ❌");
      setValue("file", null);
      return;
    }

    // File size validation (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB ❌");
      setValue("file", null);
      return;
    }

    setFileError("");
    setValue("file", file);
  };

  const handleFileChange = (file: File | null) => {
    validateAndSetFile(file);
  };

  const handleRemoveFile = () => {
    setValue("file", null);
    setFileError("");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  // Get file icon based on type
  const getFileIcon = () => {
    if (!selectedFile)
      return <FiUploadCloud className="text-4xl text-blue-500" />;

    const fileType = selectedFile.type;
    if (fileType.includes("image"))
      return <FiImage className="text-3xl text-green-500" />;
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-3xl text-red-500" />;
    if (fileType.includes("word"))
      return <FaFileWord className="text-3xl text-blue-600" />;
    if (fileType.includes("excel") || fileType.includes("sheet"))
      return <FaFileExcel className="text-3xl text-green-600" />;

    return <FiFile className="text-3xl text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
      <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        {/* File Type Dropdown */}
        <div className="mb-6">
          <SelectDropdown
            label="File Type"
            options={fileTypes}
            {...register("fileType", { required: true })}
            isRequired
          />
        </div>

        {/* Modern File Upload Area */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File <span className="text-red-500">*</span>
          </label>

          {!selectedFile ? (
            <div
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : fileError
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }
                cursor-pointer
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 rounded-full bg-blue-50">
                  <FiUploadCloud className="text-3xl text-blue-500" />
                </div>

                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG files only (Max 5MB)
                  </p>
                </div>

                <Button
                  type="button"
                  label="Browse Files"
                  variant="outline"
                  onClick={(e:any) => {
                    e.stopPropagation(); // prevent parent div click
                    const input = document.getElementById(
                      "file-upload"
                    ) as HTMLInputElement;
                    if (input) {
                      input.value = ""; // reset to allow same file
                      input.click();
                    }
                  }}
                />
              </div>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </div>
          ) : (
            <div className="relative">
              {/* File Preview Card */}
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      {getFileIcon()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800 truncate max-w-xs">
                          {selectedFile.name}
                        </h4>
                      </div>

                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatFileSize(selectedFile.size)}</span>
                        <span>•</span>
                        <span>
                          {selectedFile.type.split("/")[1]?.toUpperCase() ||
                            "FILE"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-4 p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <FiX className="text-xl text-gray-500 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {fileError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center">
                <FiX className="mr-2" />
                {fileError}
              </p>
            </div>
          )}

          {/* Format Requirements */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h5 className="text-sm font-medium text-blue-800 mb-2">
              File Requirements:
            </h5>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Only PNG, JPG, JPEG formats are allowed
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Maximum file size: 5MB
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                Clear, readable documents preferred
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit + Cancel Buttons */}
      <div className="flex items-center gap-4 justify-end mt-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="px-6 py-2.5"
          onClick={() => setIsFormModalOpen(false)}
          isDisabled={isLoading}
        />
        <Button
          type="submit"
          label={isLoading ? "Uploading..." : "Submit Document"}
          variant="quaternary"
          className="px-6 py-2.5"
          isLoading={isLoading}
          isDisabled={!selectedFile || !selectedFileType}
        />
      </div>
    </form>
  );
};

export default UpdateIdentityInfoModal;
