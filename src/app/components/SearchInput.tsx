"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SearchResultModel } from "../model/SearchResultModel";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import useSWR from "swr";
import OutsideClickHandler from "react-outside-click-handler";

type SearchInputProps = {
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  setLocation: Dispatch<SetStateAction<{ lat: number; lon: number }>>;
  setName: Dispatch<SetStateAction<string>>;
  firstLoaded?: boolean;
};

const fetcher = async (params: [url: string, searchInput: string]) => {
  const [url, searchInput] = params;
  if (searchInput != "") {
    const result = () => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          console.log("hi");

          const { data } = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}`
          );
          resolve(data.results);
        }, 600);
      });
    };

    let searchResult = (await result()) as SearchResultModel[];

    return { searchResult };
  }
};

function SearchInput({
  setIsSearchOpen,
  setLocation,
  setName,
  firstLoaded = false,
}: SearchInputProps) {
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, error } = useSWR(["search", searchInput], fetcher);

  useEffect(() => {
    searchRef?.current?.focus();

    if (searchRef != undefined && firstLoaded) {
      setTimeout(() => {
        searchRef.current!.placeholder = "Search by location";
      }, 50);
    } else {
      searchRef.current!.placeholder = "Search by location";
    }
  }, []);

  if (error) return error;

  return (
    <div className="w-full relative">
      <OutsideClickHandler onOutsideClick={() => setIsSearchOpen(false)}>
        <div className="flex w-full cursor-pointer border p-2 rounded-lg gap-1 border-white ">
          <BiSearchAlt size="30" color="#fff" />
          <input
            ref={searchRef}
            className="w-full bg-transparent outline-none font-medium placeholder-slate-200"
            type="text"
            placeholder=""
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {data?.searchResult && (
          <div className="absolute left-0 top-[60px] text-black bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg z-[99] w-full p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
            {data?.searchResult?.map((search, i) => (
              <div
                key={search?.id}
                className="flex w-[100%] items-center gap-2 p-3 border-b last:border-none  border-gray-400 cursor-pointer hover:bg-blue-100 hover:rounded-lg hover:border-blue-100 "
                onClick={() => {
                  search.latitude &&
                    search.longitude &&
                    setLocation({
                      lat: search.latitude,
                      lon: search.longitude,
                    });
                  setName(search?.name || search?.country || "");
                  setIsSearchOpen(false);
                }}
              >
                <HiOutlineLocationMarker size="30" color="#000" />

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
      </OutsideClickHandler>
    </div>
  );
}

export default SearchInput;
