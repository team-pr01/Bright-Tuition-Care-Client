import { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { filterData } from "../../../../constants/filterData";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";

type TFormData = {
  users: string[];
  message: string;
};

const SendNotificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleSendNotification = (data: TFormData) => {
    console.log(data);
  };
  const users = [
    {
      _id: "u1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      role: "Tutor",
      city: "New York",
      area: "New York",
    },
    {
      _id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      role: "Guardian",
      city: "Los Angeles",
      area: "Los Angeles",
    },
    {
      _id: "u3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "5556667777",
      role: "Student",
      city: "Chicago",
      area: "Chicago",
    },
  ];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Toggle single row
  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all rows
  const toggleAll = () => {
    if (selectedIds.length === users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u._id));
    }
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<string>("To Tutor");
  const tabButtons = [
    {
      label: "To Tutor",
      icon: <FaChalkboardTeacher />,
    },
    {
      label: "To Guardian",
      icon: <FaUserShield />,
    },
    {
      label: "To All",
      icon: <FiUsers />,
    },
  ];
  const limits = [5, 10, 15, 20, 25, 30, 50, 100];

  // For city and area/location filter
  useEffect(() => {
    if (setAreaOptions && setSelectedAreas) {
      if (!selectedCity) {
        setAreaOptions([]);
        setSelectedAreas([]);
        return;
      }
    }

    const cityObj = filterData.cityCorporationWithLocation.find(
      (city) => city.name === selectedCity
    );

    if (setAreaOptions) setAreaOptions(cityObj ? cityObj.locations : []);
    if (setSelectedAreas) setSelectedAreas([]);
  }, [selectedCity]);
  return (
    <div className="flex flex-col gap-3">
      {/* Tab buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
        {tabButtons?.map((button) => (
          <button
            key={button?.label}
            onClick={() => setActiveTab(button?.label)}
            type="button"
            className={`text-sm md:text-base rounded-3xl pl-[6px] pr-3 py-[5px] flex items-center gap-3 border cursor-pointer ${
              button?.label === activeTab
                ? "bg-primary-10/5 text-primary-10 border-primary-10/80"
                : "bg-white text-neutral-20 border-neutral-45/20"
            }`}
          >
            <div
              className={` size-7 rounded-full flex items-center justify-center  ${
                button?.label === activeTab
                  ? "bg-primary-10/20 "
                  : "bg-neutral-50/60"
              }`}
            >
              {button?.icon}
            </div>
            {button?.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(handleSendNotification)}
        className="border border-primary-10/30 p-4 rounded-lg space-y-5"
      >
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full">
            <input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm w-full md:w-56"
              aria-label="Search table"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-fit">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer w-full md:w-fit"
            >
              <option value="">Limit/Page</option>
              {limits?.map((limit) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) =>
                setSelectedCity && setSelectedCity(e.target.value)
              }
              className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer w-full md:w-fit"
            >
              <option value="">Select City</option>
              {filterData.cityCorporationWithLocation.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              value={selectedAreas?.[0] || ""}
              onChange={(e) =>
                setSelectedAreas && setSelectedAreas([e.target.value])
              }
              disabled={(areaOptions?.length ?? 0) === 0}
              className="input input-sm px-3 py-2 border border-neutral-55/60 focus:border-primary-10 transition duration-300 focus:outline-none rounded-md text-sm shadow-sm cursor-pointer w-full md:w-fit"
            >
              <option value="">Select Area</option>
              {areaOptions?.map((area: string) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-neutral-50 rounded-xl text-nowrap">
          <table className="min-w-full rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 text-center w-12 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === users.length}
                    onChange={toggleAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Role</th>
                <th className="p-2">City</th>
                <th className="p-2">Area</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelected = selectedIds.includes(user._id);
                return (
                  <tr
                    key={user._id}
                    onClick={() => toggleRow(user._id)}
                    className={`cursor-pointer ${
                      isSelected ? "bg-blue-100" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-2 text-center w-12">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(user._id)}
                        onClick={(e) => e.stopPropagation()} // prevent double toggle
                      />
                    </td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.phone}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.city}</td>
                    <td className="p-2">{user.area}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Message */}
        <Textarea
          label="Message"
          placeholder="Enter message"
          error={errors.message}
          {...register("message", {
            required: "This field is required",
          })}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            label={"Send Notification"}
            variant="primary"
            iconWithoutBg={ICONS.topRightArrowWhite}
            className="py-[7px] lg:py-[7px] px-3 lg:px-3 w-full md:w-fit"
          />
        </div>
      </form>
    </div>
  );
};

export default SendNotificationForm;
