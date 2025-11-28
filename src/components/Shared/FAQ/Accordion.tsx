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
      title: "How can I create tutor account in Bright Tuition Care?",
      description: (
        <p>
          Click the <strong>“Become a Tutor”</strong> button, complete the
          signup form, and fill in your{" "}
          <strong>Personal, Education, Credential,</strong> and{" "}
          <strong>Tuition</strong> details to achieve{" "}
          <strong>100% profile completion.</strong>
          <br />
          You can view your profile anytime from the{" "}
          <strong>profile section</strong> to see exactly how it appears to
          students and guardians.
        </p>
      ),
    },
    {
      title: "Can I update my profile after registration?",
      description: (
        <p>
          Yes, you can update your profile anytime. However, if you are a
          verified tutor, you’ll need to send us an{" "}
          <strong>unlock request</strong> before <strong>edit</strong> your
          profile.
        </p>
      ),
    },
    {
      title: "What should I do before applying?",
      description: (
        <p>
          Make your CV minimum <strong>80% complete</strong> before applying.
          Then, choose the tuition job that best matches your CV from the{" "}
          <strong>job board</strong>. If the location, days, time and salary
          match your preferences, click the <strong>apply</strong> button.
        </p>
      ),
    },
    {
      title: "How can I apply?",
      description: (
        <p>
          From your tutor account, go to <strong>“Job Board”</strong>, select
          your <strong>city</strong> and <strong>tutoring type</strong> to find
          home tuition opportunities in your area.
          <br />
          For <strong>online tutoring</strong>, location matching is not
          required—if the job category fits your profile, you can apply for
          positions anywhere in Bangladesh or abroad.
        </p>
      ),
    },
    {
      title: "What should I do after applying?",
      description: (
        <p>
          After applying, your <strong>CV</strong> will be reviewed by our
          system. If your profile matches the tuition requirements, our{" "}
          <strong>Customer Care Team</strong> will contact you.
          <br />
          And if you agree to our <strong>Terms & Conditions</strong>, you will
          be shortlisted. Your CV will then be shared with the guardian. If the
          guardian likes your <strong>CV</strong> you will be appointed and you
          will receive the guardian’s <strong>Contact number</strong> to
          communicate directly and update us afterward.
        </p>
      ),
    },
    {
      title:
        "Do I have to pay any charges for getting tuition jobs through Bright Tuition Care?",
      description: (
        <div>
          <p>
            Yes. For each confirmed tuition job, we charge a one-time service
            fee of <strong>60%</strong> of the tutor’s first month’s salary,{" "}
            <strong>payable within 10 days of confirmation.</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              For <strong>short-term tuition jobs (2–3 months)</strong>, the
              service charge percentage will be set through mutual negotiation.
            </li>
            <li>
              For <strong>online tutoring</strong> the service charge remains{" "}
              <strong>60%</strong>. We collect the full first month’s salary
              from the guardian/student in advance on your behalf. After the
              first month ends, we deduct the service charge and transfer the
              remaining amount to you.
            </li>
            <li>
              From the <strong>second month onward</strong>, the
              guardian/student will pay you directly in advance within the first
              week of each month.
            </li>
          </ul>
        </div>
      ),
    },

    {
      title: "What is the refund policy of Bright Tuition Care?",
      description: (
        <div>
          <p>
            At Bright Tuition Care, we maintain a clear and fair{" "}
            <strong>refund policy</strong> for our tutors. If a tutor loses a
            tuition job for a valid reason, they may apply for a partial refund
            of the paid service charge under the following conditions:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Valid Reason:</strong> The discontinuation must be due to
              a genuine issue from the guardian/student’s side
            </li>
            <li>
              <strong>Refund Amount:</strong> If a confirmed tuition is canceled
              by the guardian within the first month, the tutor may receive{" "}
              <strong>30%</strong> of the paid service charge.
            </li>
            <li>
              <strong>Immediate Notification:</strong> Tutors must inform our
              team immediately by calling our helpline:{" "}
              <strong>09617-785588</strong>
            </li>
            <li>
              <strong>Investigation Process:</strong> Our team will review the
              case. If cancellation occurs due to the tutor’s fault, negligence,
              or failure to fulfill responsibilities no refund will be issued.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How do I get paid?",
      description: (
        <div>
          <p>
            <strong>Offline Tuition:</strong>
          </p>
          <p>
            When a tuition is confirmed through Bright Tuition Care, the tutor
            provides lessons for one full month. After that, the guardian
            directly pays the agreed tuition fee to the tutor.
            <br />
            In this case, Bright Tuition Care will{" "}
            <strong>not involved in any financial transactions</strong> between
            the guardian and the tutor.
          </p>
          <p className="mt-3">
            <strong>Online Tuition:</strong>
          </p>
          <p>
            For online tuition, the guardian must pay the agreed tuition fee to
            Bright Tuition Care within <strong>7 days of confirmation</strong>{" "}
            via bKash or Nagad. We deduct the applicable service charge and
            transfer the remaining amount to the tutor. From the following month
            the guardian pays the <strong>tutor directly</strong> during the{" "}
            <strong>first week of each month.</strong>
          </p>
        </div>
      ),
    },
    {
      title:
        "What actions will be taken if a tutor does anything harmful to the platform or guardians/students?",
      description: (
        <div>
          <p>
            <strong>Ban Policy for Unethical Conduct:</strong>
            <br />
            Bright Tuition Care is committed to maintaining a{" "}
            <strong>safe, professional, and ethical environment.</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              The tutor will be <strong>permanently banned</strong> from the
              Bright Tuition Care platform.
            </li>
            <li>
              A <strong>formal complaint</strong> will be recorded to their
              future access to other tuition platforms.
            </li>
            <li>
              Bright Tuition Care will provide full <strong>assistance</strong>{" "}
              to any guardian or student who raises a complaint against the
              connected tutor.
            </li>
            <li>
              The safety and trust of our users are our top priorities, and we
              are committed to taking strict action against any form of
              unethical conduct.
            </li>
          </ul>
        </div>
      ),
    },

    {
      title: "How can I deactivate my account?",
      description: (
        <p>
          To deactivate your tutor account, kindly send us your{" "}
          <strong>"Tutor Id"</strong> at{" "}
          <strong>support@brighttuitioncare.com</strong> or contact our helpline
          at <strong>(09617785588)</strong>.
        </p>
      ),
    },
    {
      title: "Why do I need to upload credentials?",
      description: (
        <div>
          <p>
            <strong>Security & Background Verification Policy:</strong>
          </p>
          <p>
            At Bright Tuition Care, we collect certain documents to verify tutor
            identities and ensure safety on our platform.
          </p>
          <p className="mt-2">
            <strong>Required Documents:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>National ID / Birth Certificate / Passport</li>
            <li>Student ID/ Pay slip of the current educational institution</li>
          </ul>
          <p className="mt-2">
            These documents are <strong>mandatory</strong> for applying to{" "}
            <strong>tuition</strong> jobs and <strong>can not</strong> be
            deleted once a tuition is confirmed.
          </p>
          <p className="mt-2">
            <strong>Privacy:</strong>
            <br />
            All information is stored with the highest level of security and
            confidentiality. Bright Tuition Care is deeply committed to
            protecting <strong>tutors privacy and safety.</strong>
          </p>
        </div>
      ),
    },
    {
      title: "How can I Benefited by verifying my profile?",
      description: (
        <div>
          <p>
            Verifying your profile assures guardians and students that your
            information is <strong>authentic and trustworthy.</strong>
            <br />
            After verification, a <strong>verification badge</strong> will
            appear on your profile.
          </p>
          <p className="mt-2">
            <strong>Benefits of the Verification Badge:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Increased Credibility:</strong> Guardians trust verified
              profiles more.
            </li>
            <li>
              <strong>Higher Shortlisting Chances:</strong> Verified profiles
              are more likely to be shortlisted, giving you a competitive
              advantage in receiving tuition offers.
            </li>
            <li>
              <strong>Secure Profile Status:</strong> Your profile is marked as
              trusted and authentic.
            </li>
          </ul>
          <p className="mt-2">
            A verified profile not only boosts your chances of getting tuition
            jobs but also enhances your professional reputation.
          </p>
        </div>
      ),
    },
    {
      title: "Is profile verification mandatory for getting tuition jobs?",
      description:
        "Profile verification is not mandatory to apply for tuition jobs, but it provides significant advantages.",
    },

    {
      title: "Why do I need a confirmation letter?",
      description:
        "A confirmation letter acts as a written agreement between you and the guardian/student. It helps prevent misunderstandings and ensures transparency in your tuition arrangement.",
    },
    {
      title: "How can I become “The Best Tutor of the Month”?",
      description: (
        <p>
          Each month, tutors who confirm tuition jobs are shortlisted based on{" "}
          <strong>cooperation</strong>, <strong>professionalism</strong>,{" "}
          <strong>punctuality</strong>, <strong>guardian feedback</strong>, and{" "}
          <strong>profile rating</strong>. From the shortlisted tutors, one is
          selected through a lottery as the{" "}
          <strong>“Best Tutor of the Month”</strong> and is awarded a
          certificate and a gift.
        </p>
      ),
    },
    {
      title:
        "Is it safe to share my personal information with Bright Tuition Care?",
      description: (
        <p>
          Yes. Bright Tuition Care stores all tutor information on a{" "}
          <strong>secure, protected server.</strong> Your basic details (such as
          phone number or student ID card) are shared only after a{" "}
          <strong>tuition</strong> is confirmed and never with any third party.
          Providing accurate information is <strong>mandatory</strong> for
          verification and maintaining platform integrity.
        </p>
      ),
    },
  ];

  const faqForGuardianOrStudents: FAQItem[] = [
    {
      title: "How to post a tutor request on Bright Tuition Care?",
      description: (
        <p>
          Guardians or students can easily post their tutor request. Simply
          click <strong>“Hire a Tutor”</strong> button on our homepage, enter
          your contact number, then fill in your requirements, and click on the{" "}
          <strong>“Submit”</strong> button — done!
        </p>
      ),
    },
    {
      title: "What’s next after your request?",
      description: (
        <p>
          Our expert team will review your requirements and publish them on our
          job board. Within 24 hours, our smart system will shortlist the{" "}
          <strong>top 3 best-matched tutors</strong> and deliver their CVs
          straight to your account.
        </p>
      ),
    },
    {
      title: "How to choose the best tutor?",
      description: (
        <p>
          Review each tutor’s profile, teaching method, education, and
          experience. Shortlist your preferred tutor and arrange{" "}
          <strong>two trial classes</strong>. If their expertise meets your
          expectations, confirm the hiring. Always maintain respect and
          professionalism throughout the service period.
        </p>
      ),
    },
    {
      title: "Does Bright Tuition Care verify tutor profiles?",
      description:
        "Yes. We verify each tutor’s profile to ensure data authenticity. If you wish, you may request a photocopy of their latest or current educational qualification, which you can keep for the entire service period.",
    },
    {
      title: "What is a Confirmation letter & Is it necessary?",
      description:
        "A Confirmation Letter is like an appointment letter for your tutor — a written agreement confirming that you will take tuition services from your chosen tutor. This document helps both parties avoid any confusion regarding the service terms.",
    },
    {
      title: "Does Bright Tuition Care only help with Academic tutors?",
      description: (
        <div>
          <p>
            No. We connect learners with verified tutors in{" "}
            <strong>13 categories</strong>, including English Medium, Bangla
            Medium, English Version, Arts, Religious Studies, Test Preparation,
            Admission Test, Professional Skills, Special Skills, Language
            Learning, Madrasa Medium, University Help, and Special Child
            Education.
          </p>
          <p className="mt-2">
            Bright Tuition Care is an online tutor-matching platform that helps
            you find the right tutor for any learning need. Just post your
            requirements and start learning!
          </p>
        </div>
      ),
    },
    {
      title: "Do I need to pay any Platform charge?",
      description: (
        <p>
          No — guardians and students can hire tutors through our platform{" "}
          <strong>free of charge.</strong> You only pay the agreed tuition fee
          directly to the tutor, based on the salary you set when posting your
          requirements on our job board.
        </p>
      ),
    },
    {
      title: "What is the Payment Process after Hiring a tutor in Bangladesh?",
      description: (
        <div>
          <p>Payment Policy (Bangladesh)</p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
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
          </ul>
        </div>
      ),
    },
    {
      title:
        "What is the Payment Method after Hiring a tutor?  I am from Abroad.",
      description: (
        <div>
          <p>
            Guardian/Students who are living abroad (Bangladeshi descent) and
            confirm a tutor by using our platform, must pay the assigned tutor's
            salary <strong>in advance for every month.</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>
              In the first month, the Guardian/Student needs to pay us the full
              salary via his/her local relative from Bangladesh. The local
              relative will pay Bright Tuition Care through mobile banking along
              with transaction charges and we will pay the assigned tutor.
            </li>
            <li>
              From the second month onward, the guardian/student will pay the
              tutor directly in advance between the 1st and 10th of each
              respective month.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How can I become the “Best Guardian of the Month”?",
      description: (
        <div>
          <p>
            Every month, we celebrate the guardians who make our tutoring
            community shine! Guardians who have confirmed tutors during the
            month are carefully reviewed based on how well they:
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>
              Collaborate with our Bright Tuition Care support team and tutors
            </li>
            <li>Receive positive feedback from their tutors</li>
            <li>Maintain professionalism in communication and conduct</li>
          </ul>
          <p className="mt-2">
            From this special group, one lucky guardian is chosen through a fun
            lottery draw to be named the{" "}
            <strong>“Best Guardian of the Month”</strong>. The winner receives a
            beautiful <strong>certificate and exciting gifts</strong> as a token
            of appreciation!
          </p>
          <p className="mt-2">
            So, keep being supportive, communicative, and professional — your
            efforts could be rewarded next!
          </p>
        </div>
      ),
    },
    {
      title: "When can a Student/Guardian get banned from the Platform?",
      description: (
        <div>
          <p>
            A guardian or student may be banned from Bright Tuition Care for
            specific reasons, either temporarily or permanently, following a
            thorough investigation of any complaints. Once banned, their tutor
            requests will no longer be approved or posted on our job board.
          </p>
          <p className="mt-2">Common reasons for banning include :</p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
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
          </ul>
          <p className="mt-2">
            We are committed to maintaining a{" "}
            <strong>respectful, safe and professional environment</strong> for
            both tutors and guardians/students.
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
          className={`bg-white rounded-xl shadow border border-neutral-45/10 p-5 hover:border-primary-10 transform duration-300 ${
            isAccordingOpen === index
              ? "border-primary-10"
              : "border-neutral-45/10"
          }`}
          variants={itemVariants}
          layout
        >
          <motion.div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleClick(index)}
          >
            <h2
              className={`text-neutral-10 font-medium leading-[22px] ${
                isAccordingOpen === index && "text-primary-10"
              }`}
            >
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
