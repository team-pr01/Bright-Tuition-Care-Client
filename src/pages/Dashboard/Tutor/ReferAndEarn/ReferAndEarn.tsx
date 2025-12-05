import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import Heading from "../../../../components/Reusable/Heading/Heading";
import Modal from "../../../../components/Reusable/Modal/Modal";
import AddLeadFormModal from "../../../../components/Dashboard/Tutor/AddLeadFormModal/AddLeadFormModal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ReferAndEarn = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const earnSteps = [
    {
      title: "Get Your Referral Link",
      description:
        "Sign in to your account and go to the “Refer & Earn” section. From there, copy your referral link.",
    },
    {
      title: "Share Your Referral Link",
      description:
        "Share your referral link across Facebook, WhatsApp, Instagram, TikTok, YouTube, or any other platform where your audience is active.",
    },
    {
      title: "Submit Leads Manually",
      description:
        "If someone is interested in hiring a tutor, you can submit their details using the “Lead Submission” option. Please ensure the lead is genuine and the person is truly looking for a tutor.",
    },
    {
      title: "Lead Confirmation Process",
      description:
        'Your lead will be marked as a "Confirmed Lead" when the student or guardian you referred successfully hires a tutor and the tutor completes the payment of the platform charges for that tuition job.',
    },
    {
      title: "Receive Your 10% Commission",
      description:
        "For each confirmed lead, you will receive 10% commission of the fee set for that tuition job. Your commission will be sent to your preferred payment method — bKash, Nagad, or Rocket (personal account).",
    },
  ];

  const referralLink =
    "http://localhost:5173/tuition-request/referral/tutor-123";

  return (
    <div className="flex flex-col items-center justify-center gap-5 lg:gap-10 font-Nunito">
      <Heading
        titleParts={[{ text: "Earn Money by Referring Tutors" }]}
        description="Share your unique referral link with students or guardians. When a tutor is hired and completes enrollment, you earn 10% commission — simple, fast, and rewarding!"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {earnSteps?.map((step, index: number) => (
          <div className="bg-white border border-primary-40/10 p-5 rounded-xl">
            <div className="bg-primary-10 size-10 rounded-full text-white font-semibold flex items-center justify-center">
              {index + 1}
            </div>
            <h1 className="text-primary-50 text-lg md:text-xl font-bold leading-6 mt-4">
              {step?.title}
            </h1>
            <p className="text-neutral-45 text-sm mt-2">{step?.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3 md:gap-0 w-full">
        <Link to={"/dashboard/tutor/my-leads"}>
          <Button
            type="button"
            label="My Leads"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex items-center justify-center"
          />
        </Link>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            label="Copy Referral Link"
            variant="tertiary"
            className="py-2 lg:py-2 w-full flex items-center justify-center"
            iconWithoutBg={ICONS.copy}
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              toast.success("Referral link copied to clipboard!");
            }}
          />
          <Button
            type="button"
            label="Add New Lead +"
            variant="quaternary"
            className="py-2 lg:py-2 w-full flex items-center justify-center"
            onClick={() => setIsFormModalOpen(true)}
          />
        </div>
      </div>

      <Modal
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%] h-[90vh] 2xl:h-fit overflow-y-auto"
      >
        <AddLeadFormModal setIsFormModalOpen={setIsFormModalOpen} />
      </Modal>
    </div>
  );
};

export default ReferAndEarn;
