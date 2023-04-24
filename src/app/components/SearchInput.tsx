"use client";

import { useClickOutside } from "@/util";
import { UilSearch } from "@iconscout/react-unicons";
import { useRef } from "react";

type SearchInputProps = {
  setIsSearchOpen: () => void;
};

function SearchInput({ setIsSearchOpen }: SearchInputProps) {
  const inputRef = useRef(null);

  useClickOutside(inputRef, () => {
    setIsSearchOpen(false);
  });

  return (
    <div className="flex w-full cursor-pointer border p-2 rounded-lg gap-1 border-white ">
      <UilSearch size="30" color="#fff" />
      <input
        ref={inputRef}
        className="w-full bg-transparent outline-none font-medium placeholder-slate-200"
        type="text"
        placeholder="Search by location or coordinates"
        onChange={(e) => {}}
      />
    </div>
  );
}

export default SearchInput;
