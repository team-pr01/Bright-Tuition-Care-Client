import { ICONS } from "../../../assets";

import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search by job title or id...",
}) => {
  return (
    <div className="relative w-full lg:w-[400px]">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-8 pr-2 py-[10px] rounded-lg bg-white border border-primary-30 leading-[18px] focus:outline-none focus:border-primary-10 transition duration-300"
      />
      <img
        src={ICONS.search}
        alt=""
        className="size-5 absolute top-3 bottom-0 left-2"
      />
    </div>
  );
};

export default SearchInput;
