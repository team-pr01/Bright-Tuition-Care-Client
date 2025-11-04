import { ICONS } from "../../../../assets";

const NotificationCard = () => {
  return (
    <div className="p-3 border border-primary-30 bg-white shadow rounded-xl font-Nunito transform transition-transform duration-300 hover:-translate-y-2 flex gap-3">
      <div className="bg-primary-30 size-10 rounded-full flex items-center justify-center">
        <img src={ICONS.notification} alt="" className="size-6" />
      </div>
      <div>
        <span className="text-sm text-neutral-20">
          30th October, 2025, 10:00 AM
        </span>
        <p className="text-sm text-neutral-20">
          To : John Smith
        </p>
        <p className="mt-2 text-neutral-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          accusamus.
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
