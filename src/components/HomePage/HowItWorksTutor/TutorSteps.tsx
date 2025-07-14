// components/TutorSteps/TutorSteps.tsx

import React from "react";
import TutorStepCard, { type TutorStepCardProps } from "./TutorStepCard";

const steps: TutorStepCardProps[] = [
  {
    step: 1,
    title: "Create Your Free Account",
    description: "Register quickly using your email or social account. It’s 100% free for tutors.",
    align: "left",
  },
  {
    step: 2,
    title: "Complete Your Profile Setup",
    description:
      "Add your educational background, subjects, location, experience, and availability to build trust and visibility.",
    align: "right",
  },
  {
    step: 3,
    title: "Apply To Your Preferred Jobs",
    description:
      "Browse tutor requests that match your expertise. Apply to jobs that suit your timing and location.",
    align: "left",
  },
  {
    step: 4,
    title: "Get Shortlisted by Students / Guardian",
    description:
      "If shortlisted, your profile is shared with the student for review and confirmation.",
    align: "right",
  },
  {
    step: 5,
    title: "Start Your Tutoring Journey",
    description:
      "Once confirmed, begin teaching sessions and make a positive impact. Teach online or at home — your choice.",
    align: "left",
  },
];

const TutorSteps: React.FC = () => {
  return (
    <section className="py-[50px] w-full font-Nunito"
             style={{ background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)" }}>
      <div className="mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            How The System Works For Tutor
          </h2>
          <p className="text-neutral-600 mt-3 max-w-2xl mx-auto">
            Join in 5 easy steps to start your tutoring journey. Help students, grow your career,
            and earn with flexibility.
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-12">
          {/* Vertical dotted line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full z-0" />
          

          {steps.map((step) => (
            <TutorStepCard key={step.step} {...step} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-primary-20 text-white px-6 py-3 rounded-md hover:bg-primary-30 transition">
            Become a Tutor
          </button>
        </div>
      </div>
    </section>
  );
};

export default TutorSteps;
