import HireTutorForm from "../../../../components/Guardian/HireTutorForm/HireTutorForm";

const HireATutor = () => {
  return (
    <div className="font-Nunito">
      <div className="bg-white border border-primary-10/30 rounded-2xl p-5 lg:p-7 flex flex-col gap-6 max-w-[1000px] mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl text-neutral-10">Hire a Tutor</h1>
          <p className="text-sm mt-[6px] text-neutral-10">
            Find expert tutors easily for personalized learning and academic
            success.
          </p>
        </div>

        <HireTutorForm />
      </div>
    </div>
  );
};

export default HireATutor;

// Form values
// title
// tuitionType
// salary
// studentGender
// preferedTutorGender
// class
// noOfStudents
// tutoringTime (time range)
// tutoringDays
// category
// city
// area
// address
// subjects
// otherRequirements
