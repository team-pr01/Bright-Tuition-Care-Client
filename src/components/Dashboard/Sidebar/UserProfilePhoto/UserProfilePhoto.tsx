import { ICONS, IMAGES } from "../../../../assets";

const UserProfilePhoto = () => {
  return (
    <div className="font-Nunito flex flex-col items-center justify-center">
      <div className="size-32 rounded-full relative">
        <div className="bg-white/40 rounded-full p-[2px] size-full">
          <img
            src={IMAGES.dummyAvatar}
            alt=""
            className="size-full object-cover rounded-full"
          />
        </div>
        <div className="bg-green-500 shadow-2xl size-7 rounded-full flex items-center justify-center absolute right-3 bottom-1">
          <img src={ICONS.tickMark} alt="" className="" />
        </div>
      </div>
      <h1 className="text-white font-semibold text-center text-xl mt-2">
        John Smith
      </h1>
      {/* <h2 className="text-white text-sm text-center mt-2">john@gmail.com</h2> */}
      <h2 className="text-white text-xs text-center mt-2">
        Tutor Id : 0001 | Since 11 Aug, 2025
      </h2>
    </div>
  );
};

export default UserProfilePhoto;
