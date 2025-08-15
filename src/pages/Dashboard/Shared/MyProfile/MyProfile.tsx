import PersonalInfo from "../../../../components/Dashboard/MyProfilePage/PersonalInfo/PersonalInfo";
import TuitionRelatedInfo from "../../../../components/Dashboard/MyProfilePage/TuitionRelatedInfo/TuitionRelatedInfo";

const MyProfile = () => {
  const profile = {
    tuitionRelatedInfo: {
      tutoringMethod: "I take tuition in such a way so that the student whom I am teaching understands what I am teaching.",
      tutoringStyles: ["One to One", "Online Tutoring"],
      availableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      time: "5:00 PM - 8:50 PM",
      location: {
        city: "Cumilla",
        area: "Cumilla Cantonment",
      },
      expectedSalary: 5000,
      preferences: {
        preferredCategories: "",
        preferredClasses: "",
        preferredSubjects: "",
        placeOfTutoring: "",
        preferredLocations: ["Cumilla Cantonment"],
      },
      experience: {
        total: "",
        details: "",
      },
    },
  };

  return (
    <div className="flex gap-5 font-Nunito">
      <PersonalInfo />

      <div className="bg-white border border-primary-40/10 p-5 rounded-2xl w-[75%]">
        <div className="border-b border-neutral-30/20 pb-5">
          <h1 className="text-neutral-5 font-semibold text-2xl">Overview</h1>
          <p className="text-neutral-45 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            modi ad consequuntur ea. Distinctio velit atque corporis labore quis
            commodi est necessitatibus fugiat adipisci dicta consequatur cum
            dignissimos quasi debitis laboriosam doloremque laborum eos
            consequuntur, hic quidem? Mollitia blanditiis, assumenda voluptatem
            velit dolores aut, cumque numquam alias maxime itaque ipsa?
          </p>
        </div>

        <TuitionRelatedInfo tuitionRelatedInfo={profile.tuitionRelatedInfo}/>
      </div>
    </div>
  );
};

export default MyProfile;
