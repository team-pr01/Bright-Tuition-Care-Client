/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface DropdownProps {
  label: string;
  options: string[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isRequired?: boolean;
  selected?: boolean;
}

const SelectDropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, error, isRequired = true, selected, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2 font-Nunito w-full">
        {label && (
          <label className="flex flex-row items-center w-full justify-between text-neutral-65">
            <span className="text-neutral-10 leading-[18px] text-[15px] font-medium tracking-[-0.16] ">
              {label}{" "}
              <span className="text-primary-10">{isRequired ? "*" : ""}</span>
            </span>
          </label>
        )}
        <select
          ref={ref}
          defaultChecked={selected}
          required={isRequired}
           className={`w-full px-4 py-[11px] rounded-lg bg-white border leading-[18px] focus:outline-none focus:border-primary-10 transition duration-300 capitalize ${
            error ? "border-red-500" : "border-neutral-45/20"
          }`}
          {...rest}
        >
          <option value="" disabled selected>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="capitalize">
              {option}
            </option>
          ))}
        </select>
        {error && typeof error.message === "string" && (
          <p className="text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;
