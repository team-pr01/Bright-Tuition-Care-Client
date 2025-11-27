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
      title: "How can I create a Tutor Account in Bright Tuition Care?",
      description: (
        <p>
          Click <strong>“Become a Tutor”</strong> button, complete the signup
          form, and fill in your{" "}
          <strong>Personal, Education, Credential,</strong> and
          <strong> Tuition</strong> details to achieve{" "}
          <strong>100% profile completion.</strong>
          <br />
          You can view your profile anytime from the <strong>
            Profile
          </strong>{" "}
          section to see exactly how it appears to students and guardians.
        </p>
      ),
    },
    {
      title: "Can I Update My Profile After Registration?",
      description:
        "Yes, you can update your profile anytime. However, if you are a verified tutor, you’ll need to send us an unlock request before editing your profile.",
    },
    {
      title: "What Should I Do Before Applying?",
      description:
        "Make your CV minimum 80% complete before applying. Then choose the tuition job that best matches your CV from the job board. If the location, days, time, and salary match your preferences, click the apply button.",
    },
    {
      title: "How Can I Apply?",
      description: (
        <p>
          From your tutor account, go to <strong>“Job Board”</strong>, select
          your city and tutoring type to find home tuition opportunities in your
          area.
          <br />
          For online tutoring, location matching is not required—if the job
          category fits your profile, you can apply for positions anywhere in
          Bangladesh or abroad.
        </p>
      ),
    },
    {
      title: "What Should I Do After Applying?",
      description: (
        <p>
          After applying, your CV will be reviewed by our system. If your
          profile matches the tuition requirements, our Customer Care Team will
          contact you.
          <br />
          If you agree to our <strong>Terms & Conditions</strong>, you will be
          shortlisted and your CV will be shared with the guardian. If the
          guardian likes your CV, you will be appointed and receive the
          guardian’s contact number to communicate directly and update us
          afterward.
        </p>
      ),
    },
    {
      title: "Do I Have to Pay Any Charges for Getting Tuition Jobs?",
      description: (
        <div>
          <p>
            Yes. For each confirmed tuition job, we charge a one-time service
            fee of <strong>60% of the tutor’s first month’s salary</strong>,
            payable within <strong>10 days</strong> of confirmation.
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>
              For short-term tuition jobs (2–3 months), the service charge
              percentage will be set through mutual negotiation.
            </li>
            <li>
              For online tutoring, the service charge remains 60%. We collect
              the full first month’s salary from the guardian/student in advance
              on your behalf. After the first month ends, we deduct the service
              charge and transfer the remaining amount to you.
            </li>
            <li>
              From the second month onward, the guardian/student will pay you
              directly in advance within the first week of each month.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "What Is the Refund Policy of Bright Tuition Care?",
      description: (
        <div>
          <p>
            At Bright Tuition Care, we maintain a clear and fair refund policy
            for tutors. If a tutor loses a tuition job for a valid reason, they
            may apply for a partial refund of the paid service charge under the
            following conditions:
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>
              <strong>Valid Reason:</strong> Discontinuation must be due to a
              genuine issue from the guardian/student’s side.
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
              <strong>Investigation Process:</strong> If cancellation occurs due
              to the tutor’s fault, negligence, or failure to fulfill
              responsibilities, no refund will be issued.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How Do I Get Paid?",
      description: (
        <div>
          <p>
            <strong>Offline Tuition:</strong>
          </p>
          <p>
            After a tuition is confirmed through Bright Tuition Care, the tutor
            provides lessons for one full month. After that, the guardian
            directly pays the agreed tuition fee to the tutor. Bright Tuition
            Care will not be involved in any financial transactions.
          </p>
          <p className="mt-2">
            <strong>Online Tuition:</strong>
          </p>
          <p>
            For online tuition, the guardian must pay the agreed tuition fee to
            Bright Tuition Care within 7 days of confirmation via bKash or
            Nagad. We deduct the applicable service charge and transfer the
            remaining amount to the tutor. From the following month, the
            guardian pays the tutor directly during the first week of each
            month.
          </p>
        </div>
      ),
    },
    {
      title:
        "What Actions Will Be Taken If a Tutor Does Anything Harmful or Unethical?",
      description: (
        <div>
          <p>
            <strong>Ban Policy for Unethical Conduct:</strong> Bright Tuition
            Care is committed to maintaining a safe, professional, and ethical
            environment.
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>
              The tutor will be permanently banned from the Bright Tuition Care
              platform.
            </li>
            <li>
              A formal complaint will be recorded affecting future access to
              tutoring platforms.
            </li>
            <li>
              Bright Tuition Care will provide full assistance to any guardian
              or student who raises a complaint.
            </li>
            <li>
              We take strict action to protect the safety and trust of all
              users.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "How Can I Deactivate My Account?",
      description:
        'To deactivate your tutor account, kindly send your "Tutor ID" to support@brighttuitioncare.com or contact our helpline at 09617-785588.',
    },
    {
      title: "Why Do I Need to Upload Credentials?",
      description: (
        <div>
          <p>
            <strong>Security & Background Verification Policy:</strong> We
            collect documents to verify tutor identities and ensure platform
            safety.
          </p>
          <p className="mt-2">
            <strong>Required Documents:</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>National ID / Birth Certificate / Passport</li>
            <li>Student ID / Pay slip of current educational institution</li>
          </ul>
          <p className="mt-2">
            These documents are mandatory for applying to tuition jobs and
            cannot be deleted once a tuition is confirmed.
          </p>
          <p className="mt-2">
            <strong>Privacy:</strong> All information is stored with the highest
            level of security and confidentiality.
          </p>
        </div>
      ),
    },
    {
      title: "How Can I Benefit by Verifying My Profile?",
      description: (
        <div>
          <p>
            Verifying your profile assures guardians and students that your
            information is authentic and trustworthy. After verification, a
            verification badge will appear on your profile.
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2">
            <li>Increased Credibility</li>
            <li>Higher Shortlisting Chances</li>
            <li>Secure and Trusted Profile Status</li>
          </ul>
          <p className="mt-2">
            A verified profile boosts your tuition opportunities and
            professional reputation.
          </p>
        </div>
      ),
    },
    {
      title: "Is Profile Verification Mandatory for Getting Tuition Jobs?",
      description:
        "Profile verification is not mandatory to apply for tuition jobs, but it provides significant advantages. Once a tuition job is confirmed, profile verification becomes compulsory.",
    },
    {
      title: "Why Do I Need a Confirmation Letter?",
      description:
        "A confirmation letter acts as a written agreement between you and the guardian/student. It helps prevent misunderstandings and ensures transparency in your tuition arrangement.",
    },
    {
      title: "How Can I Become “The Best Tutor of the Month”?",
      description:
        "Each month, tutors are shortlisted based on cooperation, professionalism, punctuality, guardian feedback, and profile rating. One tutor is selected through a lottery and awarded a certificate and a gift.",
    },
    {
      title: "Is It Safe to Share My Personal Information?",
      description:
        "Yes. All tutor information is stored on secure servers. Personal details are shared only after tuition confirmation and never with third parties. Accurate information is mandatory for verification and platform security.",
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
        "Our expert team will review your requirements and publish them on our job board. Within 24 hours, our smart system will shortlist the top 3 best-matched tutors and deliver their CVs straight to your account.",
    },
    {
      title: "How to Choose the Best Tutor? ",
      description:
        "Review each tutor’s profile, teaching method, education, and experience. Shortlist your preferred tutor and arrange two trial classes. If their expertise meets your expectations, confirm the hiring. Always maintain respect and professionalism throughout the service period.",
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
            <br />
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
          <ol className="list-disc space-y-1 pl-5 mt-2">
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
        "What Is The Payment Method After Hiring A Tutor? (For Guardians/Students Living Abroad)",
      description: (
        <div>
          <p>
            Guardian/Students who are living abroad (Bangladeshi descent) and
            confirm a tutor by using our platform, must pay the assigned tutor's
            salary in advance for every month.
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
      title: "How Can I Become the “Best Guardian of the Month”?",
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
            lottery draw to be named the “Best Guardian of the Month”. The
            winner receives a beautiful certificate and exciting gifts as a
            token of appreciation! So, keep being supportive, communicative, and
            professional — your efforts could be rewarded next!
          </p>
        </div>
      ),
    },
    {
      title: "When Can a Student or Guardian Get Banned from the Platform?",
      description: (
        <div>
          <p>
            A guardian or student may be banned from Bright Tuition Care for
            specific reasons, either temporarily or permanently, following a
            thorough investigation of any complaints. Once banned, their tutor
            requests will no longer be approved or posted on our job board.
          </p>
          <p className="mt-2">Common reasons for banning include:</p>
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
