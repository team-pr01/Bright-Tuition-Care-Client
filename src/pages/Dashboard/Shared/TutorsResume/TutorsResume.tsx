import React from "react";
import { IMAGES } from "../../../../assets";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../../../components/Reusable/Button/Button";

const TutorsResume = () => {
  const location = useLocation();
  const { tutorId } = useParams();
  const profileStatus = "locked";
  const educationData = [
    { label: "Institute Name", value: "Test University" },
    { label: "Degree", value: "BSC in Computer Science" },
    { label: "Major / Group", value: "CSE" },
    { label: "Curriculum", value: "English" },
    { label: "Result", value: "4.00" },
    { label: "Year of Passing", value: "2024" },
  ];

  const tuitionData = [
    { label: "City", value: "New York" },
    { label: "Location", value: "Brooklyn" },
    { label: "Preferred Categories", value: "Mathematics, Science" },
    { label: "Tutoring Method", value: "Online & In-person" },
    { label: "Total Experience", value: "5 Years" },
    {
      label: "Experience Overview",
      value: "Worked with 50+ students in various grades",
    },
  ];

  const personalData = [
    { label: "Gender", value: "Male" },
    { label: "Religion", value: "Christianity" },
    { label: "Nationality", value: "American" },
    { label: "Father's Name", value: "Robert Smith" },
    { label: "Mother's Name", value: "Mary Smith" },
  ];

  const buttonStyle = "py-[6px] lg:py-[6px] px-3 lg:px-2 text-sm lg:text-sm";

  return (
    <div className="bg-white shadow rounded-xl max-w-[1000px] mx-auto p-5 font-Nunito">
      {/* profile and overview */}
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
        <div className="flex gap-5">
          <img
            src={IMAGES.dummyAvatar}
            alt=""
            className="size-20 lg:size-56 object-cover rounded-xl"
          />
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-neutral-10">
                  John Smith
                </h1>
                <p className="text-neutral-10 mt-1 text-sm md:text-base">
                  <strong>Tutor Id:</strong> {tutorId}
                </p>
                <p className="text-neutral-10 mt-1 text-sm md:text-base">
                  <strong>Phone Number:</strong> 01733333333
                </p>
              </div>

              <div className="flex items-center gap-3">
                {location.pathname.startsWith("/dashboard/admin/tutor/") &&
                  (profileStatus === "locked" ? (
                    <Button
                      label="Unlock Profile"
                      variant="tertiary"
                      className={buttonStyle}
                    />
                  ) : (
                    <Button
                      label="Lock Profile"
                      variant="tertiary"
                      className={buttonStyle}
                    />
                  ))}

                {location.pathname.startsWith(
                  "/dashboard/admin/applications/resume"
                ) && (
                  <div className="flex items-center gap-3">
                    <Button
                      label="Shortlist"
                      variant="tertiary"
                      className={`${buttonStyle}`}
                    />

                    <Button
                      label="Appoint"
                      variant="tertiary"
                      className={`${buttonStyle} border-[#9C9700] hover:bg-[#9C9700] text-[#9C9700] hover:text-white`}
                    />

                    <Button
                      label="Confirm"
                      variant="tertiary"
                      className={`${buttonStyle} border-green-600 hover:bg-green-600 text-green-600 hover:text-white`}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className="text-neutral-20 mt-3 hidden lg:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus
              incidunt eum asperiores quisquam omnis facilis voluptates iste
              dolorum nam cumque esse sit doloribus temporibus fugit a commodi,
              dicta error ratione! Esse tempore asperiores nam. Eos et quas
              possimus mollitia itaque! Aliquam cum dolor laboriosam praesentium
              cumque omnis, rerum accusamus?
            </p>
          </div>
        </div>
        <p className="text-neutral-20 mt-3 block lg:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus
          incidunt eum asperiores quisquam omnis facilis voluptates iste dolorum
          nam cumque esse sit doloribus temporibus fugit a commodi, dicta error
          ratione! Esse tempore asperiores nam. Eos et quas possimus mollitia
          itaque! Aliquam cum dolor laboriosam praesentium cumque omnis, rerum
          accusamus?
        </p>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-5 pb-2 border-b border-neutral-55/50">
          Education
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-0">
          <div>
            <h2 className="font-bold text-neutral-10 mt-4">• BSC</h2>
            <div className="text-neutral-20 grid grid-cols-[150px_20px_1fr] gap-y-2 mt-3">
              {educationData.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="font-medium">{item.label}</span>
                  <span className="text-neutral-10">:</span>
                  <span>{item.value}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold text-neutral-10 mt-4">• BSC</h2>
            <div className="text-neutral-20 grid grid-cols-[150px_20px_1fr] gap-y-2 mt-3">
              {educationData.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="font-medium">{item.label}</span>
                  <span className="text-neutral-10">:</span>
                  <span>{item.value}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tuition Related Information Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-8 pb-2 border-b border-neutral-55/50">
          Tuition Related Information
        </h2>

        <div className="text-neutral-20 grid grid-cols-[180px_20px_1fr] gap-y-2 mt-4">
          {tuitionData.map((item, index) => (
            <React.Fragment key={index}>
              <span className="font-medium">{item.label}</span>
              <span className="text-neutral-10">:</span>
              <span>{item.value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Personal Information Section */}
      <div>
        <h2 className="text-xl lg:text-2xl font-semibold text-neutral-10 mt-8 pb-2 border-b border-neutral-55/50">
          Personal Information
        </h2>

        <div className="text-neutral-20 grid grid-cols-[180px_20px_1fr] gap-y-2 mt-4">
          {personalData.map((item, index) => (
            <React.Fragment key={index}>
              <span className="font-medium">{item.label}</span>
              <span className="text-neutral-10">:</span>
              <span>{item.value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsResume;
