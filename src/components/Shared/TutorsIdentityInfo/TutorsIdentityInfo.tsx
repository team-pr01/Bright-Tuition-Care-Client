/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFile, FaTimes } from "react-icons/fa";
import NoData from "../../Reusable/NoData/NoData";
import { useState } from "react";
import type { TIdentityInformation } from "../../../types/tutor.types";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteIdentityInfoMutation } from "../../../redux/Features/Tutor/tutorApi";
import toast from "react-hot-toast";

const TutorsIdentityInfo = ({
  identityInformation,
  variant,
}: {
  identityInformation: TIdentityInformation[];
  variant: "tutor" | "admin";
}) => {
  const [selectedDocument, setSelectedDocument] =
    useState<TIdentityInformation | null>(null);
  const [deleteIdentityInfo, { isLoading: isDeletingFile }] =
    useDeleteIdentityInfoMutation();

  // Delete identity info
  const handleDeleteIdentityInfo = async (id: string) => {
    try {
      await toast.promise(deleteIdentityInfo(id).unwrap(), {
        loading: "Loading...",
        success: "Deleted successfully!",
        error: "Failed to delete. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };
  const handleViewClick = (info: any) => {
    setSelectedDocument(info);
  };

  const handleCloseViewModal = () => {
    setSelectedDocument(null);
  };
  return (
    <div>
      {identityInformation?.length === 0 ? (
        <NoData title="No identity information submitted." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {identityInformation?.map((info: any) => (
            <div
              key={info?.documentType}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-300 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFile className="text-gray-400 text-xl" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">
                        {info?.documentType}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {info?.fileType || "Document"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewClick(info)}
                      className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
                    >
                      <span>View</span>
                    </button>
                    {variant === "tutor" && (
                      <button
                        onClick={() => {
                          handleDeleteIdentityInfo(info?._id || "");
                        }}
                        disabled={isDeletingFile}
                        className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-[7px] rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer"
                      >
                        <AiOutlineDelete />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Black View Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-99999 bg-black flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={handleCloseViewModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 cursor-pointer"
          >
            <FaTimes size={28} />
          </button>

          {/* Document Preview */}
          <div className="w-full h-full flex items-center justify-center">
            {selectedDocument.fileType?.includes("pdf") ? (
              <iframe
                src={selectedDocument.file}
                title={selectedDocument.fileType}
                className="w-full h-full"
              />
            ) : (
              <img
                src={selectedDocument.file}
                alt={selectedDocument.fileType}
                className="object-contain max-h-full max-w-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorsIdentityInfo;
