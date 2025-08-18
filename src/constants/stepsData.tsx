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
    icon: ICONS.choose,
    title: "Chose The Right One",
    description:
      "Browse tutor profiles, compare experience, read reviews, and choose the best fit for your child.",
  },
  {
    step : 3,
    icon: ICONS.receive,
    title: "Receive the Best Tutors",
    description:
      "Top-rated and verified tutors will respond to your request. We filter based on quality, reviews, and availability.",
  },
  {
    step : 4,
    icon: ICONS.getStarted,
    title: "Get Started Learning",
    description:
      "Schedule your first session and begin a productive learning journey — at home or online, as you prefer.",
  },
];

export const tutorSteps = [
  {
    step: 1,
    title: "Create Your Free Account",
    description:
      "Register quickly using your email or social account. It's 100% free for tutors.",
    icon: <FaUserPlus />,
    iconBg: "#007bff",
  },
  {
    step: 2,
    title: "Complete Your Profile Setup",
    description:
      "Add your educational background, subjects, location, experience, and availability to build trust and visibility.",
    icon: <FaUserCheck />,
    iconBg: "#007bff",
  },
  {
    step: 3,
    title: "Apply To Your Preferred Jobs",
    description:
      "Browse tuition requests that match your expertise. Apply to jobs that suit your timing and location.",
    icon: <FaBriefcase />,
    iconBg: "#007bff",
  },
  {
    step: 4,
    title: "Get Shortlisted by Students / Guardian",
    description:
      "If selected, your profile will be shared with the student/guardian for review and confirmation.",
    icon: <FaUsers />,
    iconBg: "#007bff",
  },
  {
    step: 5,
    title: "Start Your Tutoring Journey",
    description:
      "Once confirmed, begin tutoring sessions and make a positive impact. Teach online or at home — your choice.",
    icon: <FaPlayCircle />,
    iconBg: "#007bff",
  },
];
