import { RxArrowTopRight } from "react-icons/rx";
import NoticeCard from "../../../../components/Admin/NoticeBoardManagementPage/NoticeCard/NoticeCard";
import AddNoticeModal from "../../../../components/Admin/NoticeBoardManagementPage/AddNoticeModal/AddNoticeModal";
import { useState } from "react";
import {
  useGetAllNoticesQuery,
  useGetSingleNoticeByIdQuery,
} from "../../../../redux/Features/NoticeBoard/noticeBoardApi";
import type { TNotice } from "../../../../types/noticeBoard.types";
import Loader from "../../../../components/Reusable/Loader/Loader";

export type Notice = {
  _id: string;
  title: string;
  notice: string;
  targetedAudience: string;
  date: string;
};

const NoticeBoardManagement = () => {
  const [modalType, setModalType] = useState<string>("add");
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [isAddNoticeModalOpen, setIsAddNoticeModalOpen] =
    useState<boolean>(false);

  const { data: allNotices, isLoading } = useGetAllNoticesQuery({});
  const {
    data: singleNotice,
    isLoading: isSingleNoticeLoading,
    isFetching: isSingleNoticeFetching,
  } = useGetSingleNoticeByIdQuery(selectedNoticeId);
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
          Add Notice <RxArrowTopRight className="text-lg" />
        </button>
      </div>
      {isLoading ? (
        <div className="py-10">
          <Loader size="lg" text="Please wait..." />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNotices?.data?.map((notice: TNotice) => (
            <NoticeCard
              key={notice?._id}
              notice={notice}
              setModalType={setModalType}
              setIsAddNoticeModalOpen={setIsAddNoticeModalOpen}
              setSelectedNoticeId={setSelectedNoticeId}
            />
          ))}
        </div>
      )}

      <AddNoticeModal
        isAddNoticeModalOpen={isAddNoticeModalOpen}
        setIsAddNoticeModalOpen={setIsAddNoticeModalOpen}
        modalType={modalType}
        setModalType={setModalType}
        defaultValues={singleNotice?.data}
        isLoading={isSingleNoticeLoading || isSingleNoticeFetching}
      />
    </div>
  );
};

export default NoticeBoardManagement;
