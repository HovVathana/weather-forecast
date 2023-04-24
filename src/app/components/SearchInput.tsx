"use client";

import { useClickOutside } from "@/util";
import { UilLocationPoint, UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SearchResultModel } from "../model/SearchResultModel";

type SearchInputProps = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<SetStateAction<{ lat: number; lon: number }>>;
};

function SearchInput({ setIsSearchOpen, setLocation }: SearchInputProps) {
  const inputRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultModel[]>([]);

  useClickOutside(inputRef, () => {
    setIsSearchOpen(false);
  });

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}`
      );
      setSearchResult(data.results);
      return data;
    };
    getSearchData();
  }, [searchInput]);

  console.log(searchResult);

  return (
    <>
      <div className="w-full relative" ref={inputRef}>
        <div className="flex w-full cursor-pointer border p-2 rounded-lg gap-1 border-white ">
          <UilSearch size="30" color="#fff" />
          <input
            className="w-full bg-transparent outline-none font-medium placeholder-slate-200"
            type="text"
            placeholder="Search by location or coordinates"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {searchResult?.length > 0 && (
          <div className="absolute left-0 top-[60px] text-black bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg z-[99] w-full p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
            {searchResult?.map((search, i) => (
              <div
                key={search?.id}
                className="flex w-[100%] items-center gap-2 p-3 border-b last:border-none  border-gray-400 cursor-pointer hover:bg-blue-100 hover:rounded-lg hover:border-blue-100 "
                onClick={() => {
                  setLocation({
                    lat: search?.latitude || 13,
                    lon: search?.longitude || 104,
                  });
                  setIsSearchOpen(false);
                }}
              >
                <UilLocationPoint size="30" color="#000" />

                <div>
                  <h3 className="md:text-md text-sm">{search?.name}</h3>
                  <p className="md:text-md text-sm">
                    {search.admin1} {search.country_code} ({search.country}),
                    elevation {search.elevation} m
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchInput;
