import { IMAGES } from "../../../../assets";


const RoleTab = ({ activeTab, setActiveTab } : { activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>>;}) => {
      const roles = [
    {
      title: "Guardian/Student",
      description: "Get started as a Guardian or Student.",
      icon: IMAGES.guardian,
    },
    {
      title: "Tutor",
      description: "Join as a tutor and find tuition jobs.",
      icon: IMAGES.teacher,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
      {roles?.map((role) => (
        <button
          key={role?.title}
          onClick={() => setActiveTab(role?.title)}
          type="button"
          className={` border  py-2 px-3 rounded-xl text-start flex items-center justify-between gap-6 cursor-pointer transform duration-300 ${
            role?.title === activeTab
              ? "bg-primary-10 border-primary-10 text-white"
              : "bg-white border-neutral-45/20 text-neutral-10 hover:bg-neutral-50/40"
          }`}
        >
          <div>
            <h1 className="font-bold">{role?.title}</h1>
            <p className="text-sm mt-[3px]">{role?.description}</p>
          </div>
          <div className="size-16 rounded-full bg-neutral-20/10 flex items-center justify-center">
            <img src={role?.icon} alt="" className="size-11" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default RoleTab;
