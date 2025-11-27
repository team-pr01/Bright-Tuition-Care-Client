import { IMAGES } from "../../../../assets";
import { FaCheck } from "react-icons/fa";

const RoleTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const roles = [
    {
      key: "tutor",
      title: "Tutor",
      description: "Join as a tutor and find tuition jobs.",
      icon: IMAGES.teacher,
    },
    {
      key: "guardian",
      title: "Guardian/Student",
      description: "Get started as a Guardian or Student.",
      icon: IMAGES.guardian,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      {roles?.map((role) => {
        const isActive = role?.key === activeTab;
        return (
          <button
            key={role?.key}
            onClick={() => setActiveTab(role?.key)}
            type="button"
            className={`relative border py-2 px-3 rounded-xl text-start flex items-center justify-between gap-6 cursor-pointer transform duration-300 ${
              isActive
                ? "bg-blue-100/80 text-neutral-10 border-2 border-primary-10"
                : "bg-white text-neutral-10 hover:bg-neutral-50/40 border-white"
            }`}
          >
            {/* Tick mark positioned above */}
            {isActive && (
              <div className="size-6 rounded-full bg-primary-10 border border-white flex items-center justify-center absolute -top-3 -right-2 ">
                <FaCheck
                  className="transform text-white text-xs"
                  title="Selected"
                />
              </div>
            )}

            <div>
              <h1 className="font-bold">{role?.title}</h1>
              <p className="text-sm mt-[3px]">{role?.description}</p>
            </div>
            <div className="size-16 rounded-full bg-neutral-20/10 flex items-center justify-center">
              <img src={role?.icon} alt="" className="w-11" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleTab;
