import { ICONS } from "../assets";
import {
  FaUserPlus,
  FaUserCheck,
  FaBriefcase,
  FaUsers,
  FaPlayCircle,
} from "react-icons/fa";

export const studentOrGuardianSteps = [
  {
    step : 1,
    icon: ICONS.send,
    title: "Request A Tutor",
    description:
      "Fill out a simple form with your subject, class, location, and preferred tutoring method. It takes less than 2 minutes!",
  },
   {
    step : 2,
    icon: ICONS.receive,
    title: "Receive the Best Tutor CVs",
    description:
      "Within 24 hours, you will get up to 3 CVs of the best tutors who applied your posted tuition job.",
  },
  {
    step : 3,
    icon: ICONS.choose,
    title: "Chose the Right One",
    description:
      "Browse tutor profiles, compare experience, read reviews and select the best tutor from the shortlist.",
  },
 
  {
    step : 4,
    icon: ICONS.getStarted,
    title: "Get Started Learning",
    description:
      "Confirm your tutor by verifying their experience through trial classes and start learning.",
  },
];

export const tutorSteps = [
  {
    step: 1,
    title: "Create Your Free Account",
    description:
      'Click the "Become A Tutor" button & fill out all required information.',
    icon: <FaUserPlus />,
    iconBg: "#007bff",
  },
  {
    step: 2,
    title: "Complete Your Profile Setup",
    description:
      "Complete your profile by including your personal, educational, and tuition-related details along with any necessary documentation.",
    icon: <FaUserCheck />,
    iconBg: "#007bff",
  },
  {
    step: 3,
    title: "Apply To Your Preferred Jobs",
    description:
      "Check the job board regularly and apply for your preferred tuition jobs.",
    icon: <FaBriefcase />,
    iconBg: "#007bff",
  },
  {
    step: 4,
    title: "Get Shortlisted by Guardian/Students",
    description:
      "Be shortlisted by guardians/students based on the information provided in your profile.",
    icon: <FaUsers />,
    iconBg: "#007bff",
  },
  {
    step: 5,
    title: "Start Your Tutoring Journey",
    description:
      "Take trial classes to confirm your desired tuition job and teaching.",
    icon: <FaPlayCircle />,
    iconBg: "#007bff",
  },
];
