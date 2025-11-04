/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDate } from "../../../../utils/formatDate";
import { useDeleteNoticeMutation } from "../../../../redux/Features/NoticeBoard/noticeBoardApi";
import toast from "react-hot-toast";

const NoticeCard = ({
  notice,
  setModalType,
  setIsAddNoticeModalOpen,
  setSelectedNoticeId,
}: {
  notice: any;
  setModalType: any;
  setIsAddNoticeModalOpen: any;
  setSelectedNoticeId: any;
}) => {
  const [deleteNotice] = useDeleteNoticeMutation();

  const handleDeleteNotice = async () => {
    try {
      await toast.promise(deleteNotice(notice?._id).unwrap(), {
        loading: "Loading...",
        success: "Notice deleted successfully!",
        error: "Failed to delete notice. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting notice:", err);
    }
  };
  return (
    <div className="bg-white border-l-4 border-primary-10 shadow-md rounded-xl p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{notice?.title}</h3>
        <div className="flex gap-3 text-gray-400">
          <button
            onClick={() => {
              setModalType("edit");
              setIsAddNoticeModalOpen(true);
              setSelectedNoticeId(notice?._id);
            }}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={handleDeleteNotice}
            className="hover:text-red-600 transition cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {notice?.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="flex items-center text-xs text-gray-500 mt-2">
          <span className="mr-1">📅</span> {formatDate(notice?.createdAt)}
        </p>
        <div className="bg-primary-60 px-2 py-1 text-white rounded w-fit text-sm capitalize">
          For {notice?.targetedAudience}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
