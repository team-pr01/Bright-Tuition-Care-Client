import { ICONS } from "../../../assets";

const NoticeBoard = () => {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-sky-50 border border-primary-40/10 rounded-2xl p-4 flex items-center gap-6 font-Nunito">
      <img src={ICONS.notice} alt="" className="size-16" />

      <div className="bg-white shadow p-4 rounded-2xl w-full">
        <div className="rounded-lg bg-gradient-to-r from-cyan-500 to-primary-10 text-white p-2 w-fit">
          Notice Board
        </div>
        <p className={`text-neutral-20 text-lg leading-6 mt-2`}>
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
