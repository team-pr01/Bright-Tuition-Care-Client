import { ICONS } from "../../../assets";

const NoticeBoard = () => {
  return (
    <div className="bg-gradient-to-r from-primary-10 to-cyan-500 border border-primary-40/10 rounded-xl md:rounded-2xl p-1 md:p-4 flex items-center gap-6 font-Nunito">
      <img src={ICONS.notice} alt="" className="hidden lg:block size-24" />

      <div className="bg-white shadow p-2 md:p-4 rounded-xl md:rounded-2xl w-full">
        <div className="flex items-center gap-3">
          <img src={ICONS.notice2} alt="" className="size-9" />
        <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-primary-10 text-white p-2 w-fit text-xs">
          Notice Board
        </div>
        </div>
        <p className={`text-neutral-20 text-xs md:text-base xl:text-lg leading-6 mt-2`}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          fugiat facere reiciendis ratione cum, sed numquam pariatur
          perspiciatis in rerum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Reprehenderit beatae deleniti totam voluptatem
          aliquid quaerat iste quae praesentium porro enim!
        </p>
      </div>
    </div>
  );
};

export default NoticeBoard;
