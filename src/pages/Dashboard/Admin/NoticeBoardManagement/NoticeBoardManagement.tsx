import { RxArrowTopRight } from "react-icons/rx";
import NoticeCard from "../../../../components/Admin/NoticeBoardManagementPage/NoticeCard/NoticeCard";
import AddNoticeModal from "../../../../components/Admin/NoticeBoardManagementPage/AddNoticeModal/AddNoticeModal";
import { useState } from "react";

export type Notice = {
  _id: string;
  title: string;
  notice: string;
  targetedAudience: string;
  date: string;
};

const notices: Notice[] = [
  {
    _id: "1",
    title: "System Maintenance",
    notice:
      "The system will be down for scheduled maintenance on Sunday from 2 AM to 4 AM.",
    targetedAudience: "Tutor",
    date: "2025-09-28",
  },
  {
    _id: "2",
    title: "New Course Released",
    notice:
      "We have released a new MERN stack course. Check it out in the courses section.",
    targetedAudience: "Guardian",
    date: "2025-09-25",
  },
  {
    _id: "3",
    title: "Exam Schedule Updated",
    notice:
      "The mid-term exam schedule has been updated. Please download the new version.",
    targetedAudience: "Both",
    date: "2025-09-20",
  },
];

const NoticeBoardManagement = () => {
  const [modalType, setModalType] = useState<string>("add");
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [isAddNoticeModalOpen, setIsAddNoticeModalOpen] =
    useState<boolean>(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end border-b border-neutral-30/20 pb-3">
        <button
          onClick={() => {
            setModalType("add");
            setIsAddNoticeModalOpen(true);
            setSelectedNoticeId(null);
          }}
          className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-lg flex items-center gap-2 px-3 py-2 pointer cursor-pointer`}
        >
          Add Notice <RxArrowTopRight className="text-lg mt-1" />
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices?.map((notice) => (
          <NoticeCard
            key={notice?._id}
            notice={notice}
            setModalType={setModalType}
            setIsAddNoticeModalOpen={setIsAddNoticeModalOpen}
            setSelectedNoticeId={setSelectedNoticeId}
          />
        ))}
      </div>

      <AddNoticeModal
        isAddNoticeModalOpen={isAddNoticeModalOpen}
        setIsAddNoticeModalOpen={setIsAddNoticeModalOpen}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
};

export default NoticeBoardManagement;
