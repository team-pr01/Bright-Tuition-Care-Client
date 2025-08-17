import { useState } from "react";
import { ICONS } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import Heading from "../../../../components/Reusable/Heading/Heading";
import Modal from "../../../../components/Reusable/Modal/Modal";
import AddLeadFormModal from "../../../../components/Dashboard/Tutor/AddLeadFormModal/AddLeadFormModal";

const ReferAndEarn = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const earnSteps = [
    {
      title: "Get Your Referral Link",
      description:
        "Log in to your account and go to the 'Refer & Earn' or 'Referral Program' section. Copy your unique referral link provided there.",
    },
    {
      title: "Share Your Referral Link",
      description:
        "Share your referral link on platforms like Facebook, WhatsApp, Instagram, TikTok, YouTube, or any other platform where your audience is.",
    },
    {
      title: "Submit Leads Manually",
      description:
        "You can manually submit a tutor request on behalf of someone using the 'Lead' option. Make sure the person is genuinely interested in hiring a tutor.",
    },
    {
      title: "Lead Confirmation Process",
      description:
        "If your referred student or guardian hires a tutor and the tutor successfully completes platform enrollment with payment, your lead will be considered a 'Confirmed Lead'.",
    },
    {
      title: "Receive Your 10% Commission",
      description:
        "For every confirmed lead, you will earn 10% of the tutor’s platform enrollment fee. The commission will be sent to you via your chosen payment method like bKash, Nagad, Rocket, or bank transfer.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 font-Nunito">
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
            <h1 className="text-neutral-10 text-lg md:text-xl font-bold leading-6 mt-4">
              {step?.title}
            </h1>
            <p className="text-neutral-45 text-sm mt-2">{step?.description}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          label="Copy Referral Link"
          variant="tertiary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          iconWithoutBg={ICONS.copy}
        />
        <Button
          type="button"
          label="Add New lead +"
          variant="quaternary"
          className="py-2 lg:py-2 w-full flex items-center justify-center"
          onClick={() => setIsFormModalOpen(true)}
        />
      </div>

      <Modal
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[25%] h-fit overflow-y-auto"
      >
        <AddLeadFormModal />
      </Modal>
    </div>
  );
};

export default ReferAndEarn;
