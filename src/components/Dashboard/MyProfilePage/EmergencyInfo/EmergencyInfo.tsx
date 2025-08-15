type TEmergencyInfo = {
  name?: string;
  relation?: string;
  number?: string;
  address?: string;
};

type TEmergencyInfoProps = {
  emergencyInfo: TEmergencyInfo;
};

const isProvided = (val: unknown): boolean => {
  if (Array.isArray(val))
    return val.length > 0 && val.some((v) => String(v).trim() !== "");
  if (typeof val === "string") return val.trim() !== "";
  return val !== null && val !== undefined;
};

const EmergencyInfo: React.FC<TEmergencyInfoProps> = ({ emergencyInfo }) => {
  const details = [
    { label: "Name", value: emergencyInfo?.name },
    { label: "Relation", value: emergencyInfo?.relation },
    { label: "Number", value: emergencyInfo?.number },
    { label: "Address", value: emergencyInfo?.address },
  ];

  return (
    <div className="font-Nunito">
      <h1 className="text-neutral-5 font-semibold text-2xl">
        Emergency Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {details.map((item, index) => {
          const provided = isProvided(item.value);

          return (
            <div key={index} className="flex">
              <span className="text-neutral-5 font-medium min-w-[200px]">
                {item.label}
              </span>
              <span className="text-neutral-5 font-medium">:</span>
              <span
                className={`ml-2 ${
                  provided ? "text-neutral-45" : "text-red-500"
                }`}
              >
                {provided
                  ? Array.isArray(item.value)
                    ? (item.value as string[]).join(", ")
                    : item.value
                  : "Not Provided"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyInfo;
