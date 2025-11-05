/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../../Reusable/Button/Button";
import TextInput from "../../../Reusable/TextInput/TextInput";
import { useUpdateTutorProfileInfoMutation } from "../../../../redux/Features/Tutor/tutorApi";
import toast from "react-hot-toast";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import { FiTrash2 } from "react-icons/fi";

type Degree =
  | "SSC / O Level"
  | "HSC / A Level"
  | "Diploma"
  | "Bachelor"
  | "Honours"
  | "Masters"
  | "Doctorate";

const degreeOptions: Degree[] = [
  "SSC / O Level",
  "HSC / A Level",
  "Diploma",
  "Bachelor",
  "Honours",
  "Masters",
  "Doctorate",
];

type FormEducation = Omit<any, "from" | "to"> & {
  // form keeps time fields as strings for inputs, then we convert to Date on submit
  from?: string | null;
  to?: string | null;
};

type TFormData = {
  educationalInformation: FormEducation[];
};

const emptyEducation = (): FormEducation => ({
  degree: "Bachelor",
  instituteName: "",
  medium: "",
  group: "",
  department: "",
  semester: undefined,
  year: "",
  result: "",
  from: "",
  to: "",
  passingYear: "",
  isCurrentInstitute: false,
});

const UpdateEducationalInfoModal = ({
  setIsFormModalOpen,
  defaultValues,
}: {
  setIsFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues?: any; // expected to be TTutor-like with educationalInformation: TEducation[]
}) => {
    console.log(defaultValues);
  const [updateTutorProfileInfo, { isLoading }] =
    useUpdateTutorProfileInfoMutation();

  const { register, control, handleSubmit, reset, watch } = useForm<TFormData>({
    defaultValues: { educationalInformation: [emptyEducation()] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationalInformation",
  });

  // Pre-fill when defaultValues provided
  useEffect(() => {
    if (defaultValues && Array.isArray(defaultValues)) {
      const mapped: FormEducation[] = defaultValues?.map(
        (edu: any) => ({
          degree: edu.degree ?? "Bachelor",
          instituteName: edu.instituteName ?? "",
          medium: edu.medium ?? "",
          group: edu.group ?? "",
          department: edu.department ?? "",
          semester: edu.semester ?? undefined,
          year: edu.year ?? "",
          result: edu.result ?? "",
          // convert Date -> HH:MM string (works if edu.from/to are Date or ISO strings)
          from: edu.from,
          to: edu.to,
          passingYear: edu.passingYear ?? "",
          isCurrentInstitute: !!edu.isCurrentInstitute,
        })
      );
      reset({
        educationalInformation: mapped.length ? mapped : [emptyEducation()],
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (formData: TFormData) => {
    try {
      // map formData (time strings) to TEducation[] with Date objects for from/to
      const payloadEducational: any[] = formData.educationalInformation.map(
        (edu) => ({
          degree: edu.degree,
          instituteName: edu.instituteName,
          medium: edu.medium,
          group: edu.group,
          department: edu.department,
          semester: edu.semester,
          year: edu.year,
          result: edu.result,
          from: edu.from,
          to: edu.to,
          passingYear: edu.passingYear,
          isCurrentInstitute: !!edu.isCurrentInstitute,
        })
      );

      const payload = { educationalInformation: payloadEducational, profileCompleted: 20};

      const response = await updateTutorProfileInfo(payload).unwrap();
      if (response.success) {
        toast.success(
          response.message || "Educational info updated successfully"
        );
        setIsFormModalOpen(false);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error updating info. Please try again."
      );
    }
  };

  // Watch all educationalInformation entries for isCurrentInstitute to hide fields
  const watched = watch("educationalInformation");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <div className="space-y-4">
        {fields.map((field, index) => {
          const isCurrent = watched?.[index]?.isCurrentInstitute;
          return (
            <div
              key={field.id}
              className="p-4 border border-neutral-30/30 rounded-md bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Education #{index + 1}</h3>
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
                  label="Degree"
                  options={degreeOptions}
                  {...register(
                    `educationalInformation.${index}.degree` as const
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

                <TextInput
                  label="Medium"
                  placeholder="e.g., Bangla / English"
                  {...register(
                    `educationalInformation.${index}.medium` as const
                  )}
                  error={undefined}
                  isRequired={false}
                />

                <TextInput
                  label="Group"
                  placeholder="e.g., Science / Arts"
                  {...register(
                    `educationalInformation.${index}.group` as const
                  )}
                  error={undefined}
                  isRequired={false}
                />

                <TextInput
                  label="Department"
                  placeholder="Department"
                  {...register(
                    `educationalInformation.${index}.department` as const
                  )}
                  error={undefined}
                  isRequired={false}
                />

                <TextInput
                  label="Semester (number)"
                  placeholder="e.g., 5"
                  type="number"
                  {...register(
                    `educationalInformation.${index}.semester` as const,
                    {
                      valueAsNumber: true,
                    }
                  )}
                  error={undefined}
                  isRequired={false}
                />

                <TextInput
                  label="Year"
                  placeholder="e.g., 3rd"
                  {...register(`educationalInformation.${index}.year` as const)}
                  error={undefined}
                  isRequired={false}
                />

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
