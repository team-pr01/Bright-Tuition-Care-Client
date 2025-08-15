import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const PersonalInfo = () => {
  const contactInfo = [
    {
      icon: ICONS.email,
      label: "Email",
      value: "hello@example.com",
    },
    {
      icon: ICONS.phoneGray,
      label: "Phone Number",
      value: "124326547890",
    },
    {
      icon: ICONS.address,
      label: "Address",
      value: "Rampura, Bonosre",
    },
  ];
  return (
    <div className="bg-white border border-primary-40/10 p-5 rounded-2xl w-[25%] flex flex-col gap-6 font-Nunito">
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
        <h1 className="text-neutral-5e font-semibold text-center text-xl mt-2">
          John Smith
        </h1>
        <h2 className="text-neutral-5e text-sm text-center mt-2">
          Tutor Id : 0001
        </h2>
      </div>

      <div>
        <div className="bg-accent-25 py-2 px-5 text-accent-30 rounded-lg text-center text-sm">
          Profile Complated 30%
        </div>
        <Button
          type="button"
          label="Edit Information"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center mt-3"
        />
      </div>

      <div className="flex flex-col gap-3">
        {contactInfo?.map((info) => (
          <div key={info?.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-[6px]">
              <img src={info?.icon} alt="" className="size-5 mt-1" />
              <p className="text-neutral-10 text-lg font-semibold">
                {info?.label}
              </p>
            </div>
            <p className="text-neutral-20 ml-6">{info?.value}</p>
          </div>
        ))}
      </div>

      <div>
        <Button
          type="button"
          label="Download CV"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
        />
        <Button
          type="button"
          label="View as Guardian or Student"
          variant="tertiary"
          className="py-2 lg:py-2 w-full flex items-center justify-center mt-3"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
