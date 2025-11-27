/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { filterData } from "../../../../constants/filterData";
import Textarea from "../../../Reusable/TextArea/TextArea";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import { ICONS } from "../../../../assets";
import { useSendNotificationMutation } from "../../../../redux/Features/Notification/notificationApi";
import { useGetAllTutorsQuery } from "../../../../redux/Features/Tutor/tutorApi";
import { useGetAllGuardiansQuery } from "../../../../redux/Features/Guardian/guardianApi";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Loader from "../../../Reusable/Loader/Loader";
import toast from "react-hot-toast";

type TFormData = {
  users: string[];
  title: string;
  message: string;
};

const SendNotificationForm = () => {
  const [activeTab, setActiveTab] = useState<string>("To Tutor");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [areaOptions, setAreaOptions] = useState<string[]>([]);
  const {
    data: tutors,
    isLoading: isTutorLoading,
    isFetching: isTutorFetching,
  } = useGetAllTutorsQuery({
    city: selectedCity,
    area: selectedArea,
    keyword: searchQuery,
    page,
    limit,
  });

  const {
    data: guardian,
    isLoading: isGuardianLoading,
    isFetching: isGuardianFetching,
  } = useGetAllGuardiansQuery({
    city: selectedCity,
    area: selectedArea,
    keyword: searchQuery,
    page,
    limit,
  });

  const [sendNotification, { isLoading: isSendingNotification }] =
    useSendNotificationMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const users = useMemo(() => {
    if (activeTab === "To Tutor") return tutors?.data?.tutors ?? [];
    if (activeTab === "To Guardian") return guardian?.data?.guardians ?? [];
    if (activeTab === "To All") {
      return [
        ...(tutors?.data?.tutors ?? []),
        ...(guardian?.data?.guardians ?? []),
      ];
    }
    return [];
  }, [activeTab, tutors, guardian]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Set selectedIds based on activeTab
  useEffect(() => {
    if (activeTab === "To All" && users.length) {
      setSelectedIds(users.map((u: any) => u.userId));
    } else {
      setSelectedIds([]);
    }
  }, [activeTab, users]);

  // Toggle single row
  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all rows
  const toggleAll = () => {
    if (selectedIds?.length === users?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users?.map((u: any) => u?.userId));
    }
  };

  const handleSendNotification = async (data: TFormData) => {
    try {
      const payload = {
        userIds: selectedIds,
        title: data.title || "New Notification",
        message: data.message,
      };
      const response = await sendNotification(payload).unwrap();
      if (response?.success) {
        toast.success("Notification sent.");
        setSelectedIds([]);
        setActiveTab("To Tutor");
        reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send notification.");
    }
  };

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
    if (setAreaOptions && setSelectedArea) {
      if (!selectedCity) {
        setAreaOptions([]);
        setSelectedArea("");
        return;
      }
    }

    const cityObj = filterData.cityCorporationWithLocation.find(
      (city) => city.name === selectedCity
    );

    if (setAreaOptions) setAreaOptions(cityObj ? cityObj.locations : []);
  }, [selectedCity]);

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [activeTab, selectedCity, selectedArea, searchQuery]);

  const isLoading =
    isTutorLoading ||
    isGuardianLoading ||
    isTutorFetching ||
    isGuardianFetching;

  const meta =
    activeTab === "To Tutor"
      ? tutors?.data?.meta
      : activeTab === "To Guardian"
      ? guardian?.data?.meta
      : {
          page,
          limit,
          totalPages: Math.max(
            tutors?.meta?.totalPages || 1,
            guardian?.meta?.totalPages || 1
          ),
        };

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
              value={selectedArea || ""}
              onChange={(e) =>
                setSelectedArea && setSelectedArea(e.target.value)
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
                <th className="p-2 text-center w-12">
                  <input
                    type="checkbox"
                    checked={selectedIds?.length === users?.length}
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10">
                    <div className="flex justify-center items-center">
                      <Loader size="lg" />
                    </div>
                  </td>
                </tr>
              ) : (
                users?.map((user: any) => {
                  const isSelected = selectedIds.includes(user?.userId);

                  return (
                    <tr
                      key={user?.userId}
                      onClick={() => toggleRow(user?.userId)}
                      className={`cursor-pointer ${
                        isSelected ? "bg-blue-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="p-2 text-center w-12">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(user?.userId)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.phoneNumber}</td>
                      <td className="p-2 capitalize">{user.role}</td>
                      <td className="p-2">{user.city}</td>
                      <td className="p-2">{user.area}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="m-4 flex justify-end items-center gap-2">
            <div className="flex items-center gap-2 text-xs lg:text-sm">
              {/* Prev Button */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-md border border-neutral-55/60 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${page > 1 ? "cursor-pointer bg-primary-10 text-white" : ""}`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-md border border-neutral-55/60
              ${
                page === pageNum
                  ? "bg-primary-10 text-white"
                  : "hover:bg-primary-10 hover:text-white cursor-pointer"
              }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              {/* Next Button */}
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className={`px-3 py-1 rounded-md border border-neutral-55/60 
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            page < meta.totalPages
              ? "cursor-pointer bg-primary-10 text-white"
              : ""
          }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Title */}
        <TextInput
          label="Title"
          placeholder="Enter title"
          error={errors.title}
          {...register("title")}
          isRequired={false}
        />

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
            isLoading={isSendingNotification}
            isDisabled={isSendingNotification || selectedIds?.length === 0}
          />
        </div>
      </form>
    </div>
  );
};

export default SendNotificationForm;
