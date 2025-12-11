/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";
import toast from "react-hot-toast";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import { useUpdateEducationMutation } from "../../../../redux/Features/Tutor/tutorApi";

const degreeOptions: string[] = [
  "SSC",
  "Dakhil",
  "O Level",
  "HSC",
  "Alim",
  "A Level",
  "Fazil",
  "Kamil",
  "Diploma (Polytechnic)",
  "Honours",
  "Masters",
  "BBA",
  "MBA",
  "BSc",
  "MSc",
  "BA",
  "MA",
  "BSc Engineering",
  "Diploma Engineering",
  "Medical MBBS",
  "Medical BDS",
  "BSS",
  "MSS",
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
  "Accounting",
  "Finance",
  "Marketing",
  "Management",
  "HRM (Human Resource Management)",
  "Banking & Insurance",
  "International Business",
  "Tourism & Hospitality Management",
  "Supply Chain Management",
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
  "LLB",
  "LLM",
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
  idCardNo?: number | string;
  semester?: number | string;

  result?: string;
  passingYear?: string;

  from?: string;
  to?: string;

  isCurrentInstitute?: boolean;
};

type TFormData = {
  educationalInformation: FormEducation;
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
  const [updateEducation, { isLoading }] = useUpdateEducationMutation();

  // single-entry form (educationalInformation is an object)
  const { register, handleSubmit, reset, watch } = useForm<TFormData>({
    defaultValues: { educationalInformation: emptyEducation() },
  });

  // Normalize incoming defaultValues (single object) and reset the form
  useEffect(() => {
    if (!defaultValues) return;

    // If parent passed { educationalInformation: { ... } }, unwrap it.
    const src =
      defaultValues.educationalInformation &&
      !Array.isArray(defaultValues.educationalInformation)
        ? defaultValues.educationalInformation
        : defaultValues;

    // helper: convert ISO/full datetime to yyyy-mm-dd (for <input type="date">)
    const toDateInput = (val: any) => {
      if (!val) return "";
      const d = new Date(val);
      if (Number.isNaN(d.getTime())) return "";
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    const mapped: FormEducation = {
      levelOfEducation: src?.levelOfEducation ?? "",
      instituteName: src?.instituteName ?? "",
      curriculum: src?.curriculum ?? "",
      degree: src?.degree ?? "",
      group: src?.group ?? "",
      board: src?.board ?? "",
      department: src?.department ?? "",
      // keep null/undefined -> undefined so number inputs behave; convert string numbers if present
      idCardNo:
        src?.idCardNo ??
        src?.id_card_no ??
        (typeof src?.idCardNo === "string" && src.idCardNo !== ""
          ? Number(src.idCardNo)
          : undefined),
      semester:
        src?.semester ??
        (typeof src?.semester === "string" && src.semester !== ""
          ? Number(src.semester)
          : undefined),
      result: src?.result ?? "",
      passingYear: src?.passingYear ?? src?.passing_year ?? "",
      from: toDateInput(src?.from ?? src?.startDate ?? ""),
      to: toDateInput(src?.to ?? src?.endDate ?? ""),
      isCurrentInstitute: !!src?.isCurrentInstitute,
    };

    reset({ educationalInformation: mapped });
  }, [defaultValues, reset]);

  /* -------- SUBMIT -------- */
  const onSubmit = async (data: TFormData) => {
    try {
      // keep API payload shape identical to before (array)
      const payload = {
        educationalInformation: data.educationalInformation,
        profileCompleted: 20,
      };

      const res = await updateEducation({
        data: payload,
        id: defaultValues?._id,
      }).unwrap();

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

  // watch single object fields
  const watched = watch("educationalInformation") || {};
  const isCurrent = watched?.isCurrentInstitute;
  const currentLevelOfEducation = watched?.levelOfEducation;

  const shouldShowHigherEducationFields =
    currentLevelOfEducation !== "Secondary" &&
    currentLevelOfEducation !== "Higher Secondary";

  const shouldShowSchoolLevelFields =
    currentLevelOfEducation === "Secondary" ||
    currentLevelOfEducation === "Higher Secondary";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="p-4 border border-neutral-30/30 rounded-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SelectDropdown
            label="Level of Education"
            options={levelOfEducationOptions}
            {...register("educationalInformation.levelOfEducation" as const)}
            isRequired={false}
          />

          <TextInput
            label="Institute Name"
            placeholder="Enter institute name"
            {...register("educationalInformation.instituteName" as const, {
              required: true,
            })}
            error={undefined}
            isRequired={false}
          />

          <SelectDropdown
            label="Curriculum"
            options={curriculumTypes}
            {...register("educationalInformation.curriculum" as const)}
            isRequired={false}
          />

          <SelectDropdown
            label="Exam / Degree Title"
            options={degreeOptions}
            {...register("educationalInformation.degree" as const)}
            isRequired={false}
          />

          {shouldShowSchoolLevelFields && (
            <SelectDropdown
              label="Group"
              options={academicGroups}
              {...register("educationalInformation.group" as const)}
              isRequired={false}
            />
          )}

          {shouldShowSchoolLevelFields && (
            <SelectDropdown
              label="Board"
              options={educationBoards}
              {...register("educationalInformation.board" as const)}
              isRequired={false}
            />
          )}

          {shouldShowHigherEducationFields && (
            <SelectDropdown
              label="Department / Subject"
              options={departmentsOrSubjects}
              {...register("educationalInformation.department" as const)}
              isRequired={false}
            />
          )}

          {shouldShowHigherEducationFields && (
            <TextInput
              label="ID Card No"
              placeholder="e.g., 12345"
              {...register("educationalInformation.idCardNo" as const, {
                valueAsNumber: true,
              })}
              error={undefined}
              isRequired={false}
            />
          )}

          {shouldShowHigherEducationFields && (
            <TextInput
              label="Year / Semester"
              placeholder="e.g., 5"
              type="number"
              {...register("educationalInformation.semester" as const, {
                valueAsNumber: true,
              })}
              error={undefined}
              isRequired={false}
            />
          )}

          <TextInput
            label="Result"
            placeholder="e.g., 3.75 GPA/CGPA"
            {...register("educationalInformation.result" as const, {
              required: true,
            })}
            error={undefined}
            isRequired={false}
          />

          {/* Time inputs - hidden/disabled when isCurrentInstitute is true */}
          {!isCurrent && (
            <>
              <TextInput
                label="From"
                type="date"
                {...register("educationalInformation.from" as const)}
                isRequired={false}
              />

              <TextInput
                label="To"
                type="date"
                {...register("educationalInformation.to" as const)}
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
                {...register("educationalInformation.passingYear" as const)}
                error={undefined}
                isRequired={false}
              />
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <input
              id={`current-single`}
              type="checkbox"
              {...register(
                "educationalInformation.isCurrentInstitute" as const
              )}
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor={`current-single`}
              className="text-sm cursor-pointer"
            >
              Currently studying here
            </label>
          </div>
        </div>
      </div>

      {/* single-entry form only; 'Add More' removed */}

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
