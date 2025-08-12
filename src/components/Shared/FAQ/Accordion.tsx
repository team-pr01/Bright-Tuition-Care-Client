import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const Accordion = ({ activeTab }: { activeTab: string }) => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  type FAQItem = {
    title: string;
    description: string | React.ReactNode;
  };

  const faqForTutor: FAQItem[] = [
    {
      title: "How can I create TUTOR ACCOUNT in Bright Tuition Care? ",
      description: (
        <p>
          Click <strong>“Become a Tutor”</strong> button, complete the signup
          form, and fill in your{" "}
          <strong> Personal, Education, Credential,</strong> and
          <strong> Tuition</strong> details to achieve{" "}
          <strong>100% profile completion.</strong> <br></br>You can view your
          profile anytime from the <strong> PROFILE </strong> section to see
          exactly how it appears to students and guardians.
        </p>
      ),
    },
    {
      title: "Can I UPDATE my profile after registration?",
      description: (
        <p>
          Yes. You can update your profile anytime. However, if you are a{" "}
          <strong>verified tutor</strong> , you’ll need to send us an{" "}
          <strong>unlock request </strong> before edit your profile.
        </p>
      ),
    },
    {
      title: "What should I do before Applying??",
      description: (
        <p>
          Make your cv minimum 80% complete before applying. Then choose the
          tuition job that matches your cv from the job board. If the location,
          days, time and salary mentioned in the tuition match your requirements
          then apply by clicking the <strong> Apply button</strong>
        </p>
      ),
    },
    {
      title: "How can I APPLY?",
      description: (
        <p>
          From your tutor account, go to <strong>“JOB BOARD”</strong>, select
          your <strong>city</strong> and <strong>tutoring type</strong> to find
          home tuition opportunities in your area.<br></br>
          For <strong> online tutoring</strong>, location matching is not
          required—if the job category fits your profile, you can apply for
          positions <strong>anywhere in Bangladesh or abroad.</strong>
        </p>
      ),
    },
    {
      title: "What should I do after applying?",
      description: (
        <p>
          After applying, your cv will be reviewed from our system. If your CV
          matches your applied tuition then you will be called by our customer
          care. And if you agree to our <strong> Terms & Conditions</strong> you
          will be shortlisted. Then Your cv will be suggested to student parent.
          If the parent likes your cv you will be confirmed and the parent's
          phone number will be given and then you will talk to the parents and
          update us.
        </p>
      ),
    },
    {
      title:
        "Do I Have to Pay Any Charges for Getting Tuition Jobs Through Bright Tuition Care?",
      description: (
        <div>
          <p>
            Yes. For each confirmed tuition job, we charge a{" "}
            <strong>one-time service fee of 60% </strong>of the tutor’s{" "}
            <strong>first month’s salary</strong>. This amount must be paid{" "}
            <strong>within 10 days</strong> of confirmation.
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              <strong>Short-term tuition jobs (2–3 months):</strong> The service
              charge percentage will be set through mutual negotiation.
            </li>
            <li>
              <strong>Online tutoring:</strong> The service charge remains{" "}
              <strong> 60% </strong>. We collect the{" "}
              <strong> full first month’s salary</strong> from the
              guardian/student in advance on your behalf. After the first month
              ends, we deduct the service charge and transfer the remaining
              amount to you.
            </li>
            <li>
              From the <strong> second month onward,</strong> the
              guardian/student will pay you directly in advance within the{" "}
              <strong>first week </strong>of each month.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: "What is the Refund Policy of Bright Tuition Care?",
      description: (
        <div>
          <p>
            At Bright Tuition Care, we maintain a{" "}
            <strong>clear and fair refund policy</strong> for our tutors. If a
            tutor loses a tuition job for a valid reason, they may apply for a
            <strong> partial refund </strong>of the paid service charge under
            the following conditions:
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              <strong>Valid Reason:</strong> The discontinuation must be due to
              a genuine issue from the<strong> guardian/student’s side </strong>
              (e.g., tuition canceled for personal or unavoidable reasons).
            </li>
            <li>
              <strong>Refund Amount:</strong> If a confirmed tuition is canceled
              by the guardian within the<strong> first month </strong>, the
              tutor may receive <strong>30% of the paid amount</strong> from the
              standard<strong> 60% service charge.</strong>
            </li>
            <li>
              <strong>Immediate Notification:</strong> Tutors must inform our{" "}
              <strong> immediately </strong>, by calling our helpline:{" "}
              <strong>09617-785588.</strong>
            </li>
            <li>
              {" "}
              <strong>Investigation Process:</strong>
              Our team will review the case. If cancellation is due to the
              <strong>
                tutor’s fault, negligence, or failure to fulfill
                responsibilities,
              </strong>
              no refund will be issued.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: "How do I get PAID?",
      description: (
        <div>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              <strong>Offline Tuition:</strong> When a tuition is confirmed
              through Bright Tuition Care, the tutor will provide lessons to the
              student for one full month. After that, the guardian will directly
              pay the agreed tuition fee to the tutor.<br></br>
              In this case, Bright Tuition Care will not be involved in any
              financial transaction between the guardian and the tutor.
            </li>
            <li>
              <strong>Online Tuition:</strong>¬¬¬For online tuition, the
              guardian must pay the agreed tuition fee to Bright Tuition Care
              within 7 days of confirmation by bKash or Nagad. Bright Tuition
              Care will deduct the applicable service charge and pay the
              remaining amount to the tutor. From the following month the
              guardian will directly pay the tutor the monthly tuition fee
              during the first week of each month.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title:
        "What will be ACTION if the tutor does anything harmful with the platform and the guardian / student?",
      description: (
        <div>
          <p>
            {" "}
            <strong>Ban Policy for Unethical Conduct:</strong> <br></br> Bright
            Tuition Care is committed to maintaining a safe, professional, and
            ethical environment at all times. To uphold this commitment, if any
            tutor engages in any harmful, inappropriate, or unethical behavior
            with the platform or any guardian/student,{" "}
            <strong>
              violate platform rules, misleading us with wrong information,
            </strong>{" "}
            the following actions will be taken:
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              The tutor will be permanently banned from the Bright Tuition Care
              platform.
            </li>
            <li>
              A formal complaint will be recorded against the tutor to ensure
              that they are considered ineligible for tuition opportunities on
              any other tuition platforms in the future.
            </li>
            <li>
              If any guardian or student seeks support or raises a complaint
              about the concerned tutor in the future, the Bright Tuition Care
              team will provide full assistance.
            </li>
            <li>
              The safety and trust of our users are our top priorities, and we
              are committed to taking strict action against any form of
              unethical conduct.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: "How can I DEACTIVATE my account?",
      description: (
        <p>
          To deactivate your tutor account, kindly send us
          <strong>"TUTOR ID"</strong> at{" "}
          <a href="mailto:support@brighttuitioncare.com">
            support@brighttuitioncare.com
          </a>{" "}
          or take support from our helpline{" "}
          <a href="tel:09617785588">09617785588</a>.
        </p>
      ),
    },
    {
      title: "Why do I need to upload CREDENTIALS?",
      description: (
        <div>
          <p>
            {" "}
            <strong>Security & Background Verification Policy:</strong>{" "}
            <br></br> At Bright Tuition Care, we collect and store certain
            important documents to verify tutor identities and ensure a safe
            environment on our platform. This is a key part of our security and
            background check process.<br></br>
            <strong>Required Documents:</strong>
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>National ID / Birth Certificate / Passport</li>
            <li>Student ID of the current educational institution</li>
          </ol>
          <p>
            These documents are collected solely to verify the tutor’s identity
            and to ensure a safe and trustworthy experience for guardians.
          </p>
          <p>
            If you wish to apply for any tuition job, uploading the above
            documents is mandatory. Once a tuition job is confirmed, you will
            not be allowed to delete the submitted documents.
          </p>
          <p>
            {" "}
            <strong>Privacy:</strong>
            <br></br>All your information is stored with the highest level of
            security and confidentiality. Bright Tuition Care is deeply
            committed to protecting the privacy and safety of all tutors on the
            platform.{" "}
          </p>
        </div>
      ),
    },
    {
      title: "How can I Benefited by VERIFYING my profile?",
      description: (
        <div>
          <p>
            By verifying your profile, you are assuring guardians and students
            that the information you have provided is accurate, authentic, and
            trustworthy. The Bright Tuition Care team will verify your
            information and add a verification badge to your profile, indicating
            that your profile has been officially verified.
          </p>
          <strong>Benefits of the Verification Badge:</strong>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              Increased Credibility: Guardians and students will trust and value
              your profile more.
            </li>
            <li>
              Higher Chance of Getting Shortlisted: Verified profiles are more
              likely to be shortlisted, giving you a competitive advantage in
              receiving tuition offers.
            </li>
            <li>
              Secure Profile Status: Through the verification process, your
              profile will be marked as a secure and trusted tutor profile on
              our platform.
            </li>
          </ol>
          <p>
            As a verified tutor, you won’t just have a higher chance of getting
            tuition jobs — you’ll also earn greater trust from guardians.
          </p>
        </div>
      ),
    },
    {
      title:
        "Is profile verification MANDATORY for getting tuition job from Bright Tuition Care?",
      description: (
        <div>
          <p>
            At Bright Tuition Care, profile verification is not mandatory to
            apply for tuition jobs. However, it offers you preferential
            advantages.
            <br></br>
            You may apply for tuition jobs without verifying your profile if you
            choose.<br></br>
            If your profile closely matches a guardian’s or student’s
            requirements, a verified profile builds greater trust, increasing
            your chances of being shortlisted.
          </p>
          <p>
            <strong>When Verification is Mandatory: </strong>
            If you are confirmed for a tuition job, then profile verification
            becomes compulsory.<br></br>A verified profile not only enhances
            your chances of getting tuition jobs, but also presents you as a
            professional and trustworthy tutor.
          </p>
        </div>
      ),
    },
    {
      title: "Why need CONFIRMATION letter?",
      description: (
        <div>
          <p>
            It is a type of appointment letter that serves as a written
            agreement between you and the guardian/student. It plays an
            important role in avoiding any future misunderstandings.
          </p>
        </div>
      ),
    },
    {
      title: "How can I become “The Best Tutor of The Month”?",
      description: (
        <div>
          <p>
            Each month, selected tutors who confirmed tuition jobs are
            shortlisted based on cooperation, professionalism, punctuality,
            guardian feedback, and profile rating. From the shortlisted tutors,
            one is chosen through a lottery as the "Best Tutor of the Month" and
            is honored with a certificate and a gift.
          </p>
        </div>
      ),
    },
    {
      title:
        "Is it SAFE to share my personal information with Bright Tuition Care?",
      description: (
        <div>
          <p>
            Bright Tuition Care stores tutors' personal information with the
            highest level of security on a protected server. A tutor's basic
            details (such as phone number and student ID card) are shared only
            after a tuition is confirmed with the guardian/student.
            <br></br>
            Moreover, this information is never shared with any third party.
            <br></br>
            Providing the necessary information for profile verification is
            mandatory.
          </p>
        </div>
      ),
    },
  ];

  const faqForGuardianOrStudents: FAQItem[] = [
    {
      title: "How to Post a Tutor Request on Bright Tuition Care?",
      description:
        "Guardians or students can easily post their tutor request. Simply click “Hire a Tutor” button on our homepage, enter your contact number, then fill in your requirements, and hit on the “Submit” button — done!",
    },
    {
      title: "What’s Next After Your Request?",
      description:
        "Our expert team will review your requirements and publish them on our job board. Within 48 hours, our smart system will shortlist the top 3 best-matched tutors and deliver their CVs straight to your account. Fast. Simple. Reliable.",
    },
    {
      title: "How to Choose the Best Tutor? ",
      description:
        "Review each tutor’s profile, teaching method, education, and experience. Shortlist your preferred tutor and arrange two trialclasses. If their expertise meets your expectations, confirm the hiring. Always maintain respect and professionalism throughout the service period.",
    },
    {
      title: "Does Bright Tuition Care Verify Tutor Profiles?",
      description:
        "Yes. We verify each tutor’s profile to ensure data authenticity. If you wish, you may request a photocopy of their latest or current educational qualification, which you can keep for the entire service period.",
    },
    {
      title: "What is a Confirmation Letter & Is It Necessary?",
      description:
        "A Confirmation Letter is like an appointment letter for your tutor — a written agreement confirming that you will take tuition services from your chosen tutor. This document helps both parties avoid any confusion regarding the service terms.",
    },
    {
      title: "Does Bright Tuition Care Only Help with Academic Tutors?",
      description: (
        <div>
          <p>
            No. We connect learners with verified tutors in 13 categories,
            including English Medium, Bangla Medium, English Version, Arts,
            Religious Studies, Test Preparation, Admission Test, Professional
            Skills, Special Skills, Language Learning, Madrasa Medium,
            University Help, and Special Child Education.
            <br></br>
            Bright Tuition Care is an online tutor-matching platform that helps
            you find the right tutor for any learning need. Just post your
            requirements and start learning!
          </p>
        </div>
      ),
    },
    {
      title: "Do I Need To Pay Any Platform Charge?",
      description:
        "No — guardians and students can hire tutors through our platform free of charge. You only pay the agreed tuition fee directly to the tutor, based on the salary you set when posting your requirements on our job board.",
    },
    {
      title: "What Is The Payment Process After Hiring A Tutor In Bangladesh?",
      description: (
        <div>
          <p>Payment Policy (Bangladesh)</p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              The tutor’s salary will be calculated from the date of hiring.
            </li>
            <li>
              For local physical tutoring (Home Tutoring, Group Tutoring, and
              Package Tutoring), Bright Tuition Care will not be involved in any
              financial transactions. The guardian/student and tutor will
              mutually decide the payment method and schedule.
            </li>
            <li>
              For online tutoring, guardians/students must pay the first month’s
              salary in advance to Bright Tuition Care after confirming their
              chosen tutor. From the second month onward, payment should be made
              directly to the tutor in advance between the 1st and 10th of each
              month.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title:
        "What Is The Payment Method After Hiring A Tutor?  I Am From Abroad.",
      description: (
        <div>
          <p>
            Guardian/Students who are living abroad (Bangladeshi descent) and
            confirm a tutor by using our platform, must pay the assigned tutor's
            salary in advance for every month.
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              In the first month, the Guardian/Student needs to pay us the full
              salary via his/her local relative from Bangladesh. The local
              relative will pay Bright Tuition Care through mobile banking along
              with transaction charges and we will pay the assigned tutor.
            </li>
            <li>
              And after the following month, the guardian/student will pay in
              advance directly to the tutor within the 1-10 days of the
              respective month.
            </li>
          </ol>
        </div>
      ),
    },
    {
      title: "How Can I Become The “Best Guardian Of The Month”?",
      description: (
        <div>
          <p>
            Every month, we celebrate the guardians who make our tutoring
            community shine! Guardians who have confirmed tutors during the
            month are carefully reviewed based on how well they:
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>
              Collaborate with our Bright Tuition Care support team and tutors
            </li>
            <li>Receive positive feedback from their tutors</li>
            <li>Maintain professionalism in communication and conduct</li>
          </ol>
          <p>
            From this special group, one lucky guardian is chosen through a fun
            lottery draw to be named the “Best Guardian of the Month.” The
            winner receives a beautiful certificate and exciting gifts as a
            token of appreciation!<br></br>
            So, keep being supportive, communicative, and professional — your
            efforts could be rewarded next!
          </p>
        </div>
      ),
    },
    {
      title: "When Can A Student/Guardian Get Banned From The Platform?",
      description: (
        <div>
          <p>
            A guardian or student may be banned from Bright Tuition Care for
            specific reasons, either temporarily or permanently, following a
            thorough investigation of any complaints. Once banned, their tutor
            requests will no longer be approved or posted on our job board.
          </p>
          <ol className="list-disc space-y-1  pl-5 mt-2">
            <li>Common reasons for banning include</li>
            <li>Lack of consistent cooperation with Bright Tuition Care</li>
            <li>Maintain professionalism in communication and conduct</li>
            <li>Lack of consistent cooperation with Bright Tuition Care</li>
            <li>Misbehavior toward tutors</li>
            <li>Inappropriate conduct, especially toward female tutors</li>
            <li>
              Any harmful or unethical actions involving the platform or tutors
            </li>
            <li>
              Creating conflicts with tutors after signing the confirmation
              letter
            </li>
          </ol>
          <p>
            We are committed to maintaining a respectful, safe, and professional
            environment for both tutors and guardians/students.
          </p>
        </div>
      ),
    },
  ];

  const accordionData =
    activeTab === "For Tutors" ? faqForTutor : faqForGuardianOrStudents;

  return (
    <motion.div
      className="flex gap-3 flex-col w-full mt-16"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {accordionData?.map((according, index) => (
        <motion.article
          key={index}
          className="border-b border-neutral-45/30 py-5 hover:border-primary-10 transform duration-300"
          variants={itemVariants}
          layout
        >
          <motion.div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleClick(index)}
          >
            <h2 className="text-neutral-10 font-medium leading-[22px]">
              {according.title}
            </h2>
            <p>
              <IoChevronDownSharp
                className={`text-[1.2rem] text-text transition-all duration-300 ${
                  isAccordingOpen === index && "rotate-[180deg] text-primary-10"
                }`}
              />
            </p>
          </motion.div>

          <AnimatePresence initial={false}>
            {isAccordingOpen === index && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto", marginTop: "16px" },
                  collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <p className="text-neutral-30 text-sm leading-5">
                  {according.description}
                </p>
              </motion.section>
            )}
          </AnimatePresence>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default Accordion;
