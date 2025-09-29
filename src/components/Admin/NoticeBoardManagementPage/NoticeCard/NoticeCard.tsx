/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPen, FaTrash } from "react-icons/fa";

const NoticeCard = ({ notice, setIsAddNoticeModalOpen, setSelectedNoticeId }: { notice:any, setIsAddNoticeModalOpen:any, setSelectedNoticeId:any }) => {
  return (
    <div className="bg-white border-l-4 border-primary-10 shadow-md rounded-xl p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">{notice?.title}</h3>
        <div className="flex gap-3 text-gray-400">
          <button onClick={() => {setIsAddNoticeModalOpen(true); setSelectedNoticeId(notice?._id);}} className="hover:text-blue-600 transition cursor-pointer">
            <FaPen />
          </button>
          <button className="hover:text-red-600 transition cursor-pointer">
            <FaTrash />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{notice?.notice}</p>
      <div className="flex items-center text-xs text-gray-500 mt-2">
        <span className="mr-1">📅</span> {notice?.date}
      </div>
    </div>
  );
};

export default NoticeCard;