/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";
import toast from "react-hot-toast";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import { FiTrash2 } from "react-icons/fi";
import { useUpdateProfileMutation } from "../../../../redux/Features/User/userApi";

const degreeOptions: string[] = [
  "SSC  / Dakhil/ O Level",
  "HSC / Alim / A Level / Fazil / Kamil",
  "Diploma (Polytechnic)",
  "Honours/ Masters",
  "BBA / MBA",
  "BSc / MSc",
  "BA / MA/ Bsc Engineering /  Diploma Engineering",
  "Medical MBBS / Medical BDS/ BSS / MSS",
];

const levelOfEducationOptions: string[] = [
  "Secondary",
  "Higher Secondary",
  "Diploma",
  "Bachelor",
  "Honors",
  "Masters",
  "Doctoral",
];

const curriculumTypes: string[] = [
  "Bangla Medium",
  "English Version",
  "Cambridge",
  "Ed-Excel",
  "IB",
];

const academicGroups: string[] = [
  "Science",
  "Business Studies",
  "Commerce",
  "Humanities",
  "Arts",
  "Home Economics",
  "Mujabbid",
  "Hifjul Qur’an",
  "Islamic Studies",
];

const educationBoards: string[] = [
  "Dhaka Board",
  "Chattogram Board",
  "Rajshahi Board",
  "Cumilla Board",
  "Jashore Board",
  "Barishal Board",
  "Sylhet Board",
  "Dinajpur Board",
  "Mymensingh Board",
  "Bangladesh Madrasah Education Board",
  "Bangladesh Technical Education Board",
];

const departmentsOrSubjects: string[] = [
  // Engineering & Technology
  "Computer Science & Engineering (CSE)",
  "Software Engineering",
  "Information Technology",
  "Electrical & Electronic Engineering (EEE)",
  "Civil Engineering",
  "Mechanical Engineering",
  "Industrial & Production Engineering (IPE)",
  "Electronics & Communication Engineering (ECE)",
  "Architecture",
  "Management Information Systems (MIS)",
  "Medical Technology",
  "Agricultural Engineering",

  // Science
  "Physics",
  "Chemistry",
  "Mathematics",
  "Statistics",
  "Applied Mathematics",
  "Environmental Science",
  "Biotechnology",
  "Genetic Engineering",
  "Microbiology",
  "Biochemistry",
  "Molecular Biology",
  "Botany",
  "Zoology",
  "Food & Nutrition",
  "Public Health",
  "Pharmacy",

  // Business & Management
  "Accounting",
  "Finance",
  "Marketing",
  "Management",
  "HRM (Human Resource Management)",
  "Banking & Insurance",
  "International Business",
  "Tourism & Hospitality Management",
  "Supply Chain Management",

  // Arts & Humanities
  "English",
  "Bangla",
  "History",
  "Philosophy",
  "Islamic History & Culture",
  "Arabic",
  "Islamic Studies",
  "World Religion",
  "Fine Arts",
  "Theatre & Performance Studies",
  "Music",

  // Social Sciences
  "Economics",
  "Political Science",
  "Sociology",
  "Anthropology",
  "Public Administration",
  "Social Work",
  "International Relations (IR)",
  "Criminology",
  "Peace & Conflict Studies",
  "Development Studies",
  "Mass Communication & Journalism",

  // Law
  "LLB",
  "LLM",

  // Agriculture & Allied
  "Agriculture",
  "Agronomy",
  "Fisheries",
  "Animal Science",
  "Horticulture",
  "Forestry",
];

export type FormEducation = {
  levelOfEducation?: string;
  instituteName?: string;
  curriculum?: string;
  degree?: string;

  group?: string;
  board?: string;

  department?: string;
  idCardNo?: number;
  semester?: number;

  result?: string;
  passingYear?: string;

  from?: string;
  to?: string;

  isCurrentInstitute?: boolean;
};

type TFormData = {
  educationalInformation: FormEducation[];
};

const emptyEducation = (): FormEducation => ({
  levelOfEducation: "",
  instituteName: "",
  curriculum: "",
  degree: "",

  group: "",
  board: "",

  department: "",
  idCardNo: undefined,
  semester: undefined,

  result: "",
  passingYear: "",
  from: "",
  to: "",

  isCurrentInstitute: false,
});

const UpdateEducationalInfoModal = ({
  setIsFormModalOpen,
  defaultValues,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: any;
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { register, control, handleSubmit, reset, watch } = useForm<TFormData>({
    defaultValues: { educationalInformation: [emptyEducation()] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationalInformation",
  });

  // Pre-fill when defaultValues provided
  useEffect(() => {
    if (Array.isArray(defaultValues)) {
      const mapped: FormEducation[] = defaultValues.map((edu) => ({
        levelOfEducation: edu.levelOfEducation ?? "",
        instituteName: edu.instituteName ?? "",
        curriculum: edu.curriculum ?? "",
        degree: edu.degree ?? "",

        group: edu.group ?? "",
        board: edu.board ?? "",

        department: edu.department ?? "",
        idCardNo: edu.idCardNo ?? "",
        semester: edu.semester ?? "",

        result: edu.result ?? "",
        passingYear: edu.passingYear ?? "",

        from: edu.from ?? "",
        to: edu.to ?? "",

        isCurrentInstitute: !!edu.isCurrentInstitute,
      }));

      reset({
        educationalInformation: mapped.length ? mapped : [emptyEducation()],
      });
    }
  }, [defaultValues, reset]);

  /* -------- SUBMIT -------- */

  const onSubmit = async (data: TFormData) => {
    try {
      const payload = {
        educationalInformation: data.educationalInformation,
        profileCompleted: 20,
      };

      const res = await updateProfile(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Education updated successfully");
        setIsFormModalOpen(false);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // Watch all educationalInformation entries for isCurrentInstitute to hide fields
  const watched = watch("educationalInformation");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="space-y-4">
        {fields.map((field, index) => {
          const isCurrent = watched?.[index]?.isCurrentInstitute;
          const currentLevelOfEducation = watched?.[index]?.levelOfEducation;

          const shouldShowHigherEducationFields =
            currentLevelOfEducation !== "Secondary" &&
            currentLevelOfEducation !== "Higher Secondary";

          const shouldShowSchoolLevelFields =
            currentLevelOfEducation === "Secondary" ||
            currentLevelOfEducation === "Higher Secondary";

          return (
            <div
              key={field.id}
              className="p-4 border border-neutral-30/30 rounded-md bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium"></h3>
                <div className="flex gap-2">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 cursor-pointer"
                      title="Remove Education"
                    >
                      <FiTrash2 className="mb-[2px]" /> Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SelectDropdown
                  label="Level of Education"
                  options={levelOfEducationOptions}
                  {...register(
                    `educationalInformation.${index}.levelOfEducation` as const
                  )}
                  isRequired={false}
                />

                <TextInput
                  label="Institute Name"
                  placeholder="Enter institute name"
                  {...register(
                    `educationalInformation.${index}.instituteName` as const,
                    {
                      required: true,
                    }
                  )}
                  error={undefined}
                  isRequired={false}
                />
                <SelectDropdown
                  label="Curriculum"
                  options={curriculumTypes}
                  {...register(
                    `educationalInformation.${index}.curriculum` as const
                  )}
                  isRequired={false}
                />

                <SelectDropdown
                  label="Exam / Degree Title"
                  options={degreeOptions}
                  {...register(
                    `educationalInformation.${index}.degree` as const
                  )}
                  isRequired={false}
                />

                {shouldShowSchoolLevelFields && (
                  <SelectDropdown
                    label="Group"
                    options={academicGroups}
                    {...register(
                      `educationalInformation.${index}.group` as const
                    )}
                    isRequired={false}
                  />
                )}

                {shouldShowSchoolLevelFields && (
                  <SelectDropdown
                    label="Board"
                    options={educationBoards}
                    {...register(
                      `educationalInformation.${index}.board` as const
                    )}
                    isRequired={false}
                  />
                )}

                {shouldShowHigherEducationFields && (
                  <SelectDropdown
                    label="Department / Subject"
                    options={departmentsOrSubjects}
                    {...register(
                      `educationalInformation.${index}.department` as const
                    )}
                    isRequired={false}
                  />
                )}

                {shouldShowHigherEducationFields && (
                  <TextInput
                    label="ID Card No"
                    placeholder="e.g., 12345"
                    {...register(
                      `educationalInformation.${index}.idCardNo` as const,
                      { valueAsNumber: true }
                    )}
                    error={undefined}
                    isRequired={false}
                  />
                )}

                {shouldShowHigherEducationFields && (
                  <TextInput
                    label="Year / Semester"
                    placeholder="e.g., 5"
                    type="number"
                    {...register(
                      `educationalInformation.${index}.semester` as const,
                      { valueAsNumber: true }
                    )}
                    error={undefined}
                    isRequired={false}
                  />
                )}

                <TextInput
                  label="Result"
                  placeholder="e.g., 3.75 GPA/CGPA"
                  {...register(
                    `educationalInformation.${index}.result` as const,
                    {
                      required: true,
                    }
                  )}
                  error={undefined}
                  isRequired={false}
                />

                {/* Time inputs - hidden/disabled when isCurrentInstitute is true */}
                {!isCurrent && (
                  <>
                    <TextInput
                      label="From"
                      type="date"
                      {...register(
                        `educationalInformation.${index}.from` as const
                      )}
                      isRequired={false}
                    />

                    <TextInput
                      label="To"
                      type="date"
                      {...register(
                        `educationalInformation.${index}.to` as const
                      )}
                      isRequired={false}
                    />
                  </>
                )}

                {/* passingYear - hide when current */}
                {!isCurrent && (
                  <div>
                    <TextInput
                      label="Passing Year"
                      placeholder="e.g., 2023"
                      {...register(
                        `educationalInformation.${index}.passingYear` as const
                      )}
                      error={undefined}
                      isRequired={false}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <input
                    id={`current-${index}`}
                    type="checkbox"
                    {...register(
                      `educationalInformation.${index}.isCurrentInstitute` as const
                    )}
                    defaultChecked={field.isCurrentInstitute}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor={`current-${index}`}
                    className="text-sm cursor-pointer"
                  >
                    Currently studying here
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => append(emptyEducation())}
        className="text-primary-10 text-sm font-medium italic underline cursor-pointer"
      >
        Add More Education
      </button>

      <div className="flex items-center gap-4 justify-end mt-4">
        <Button
          type="button"
          label="Cancel"
          variant="tertiary"
          className="py-2 lg:py-2 w-full md:w-auto"
          onClick={() => setIsFormModalOpen(false)}
        />
        <Button
          type="submit"
          label="Submit"
          variant="quaternary"
          className="py-2 lg:py-2 w-full md:w-auto"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default UpdateEducationalInfoModal;
