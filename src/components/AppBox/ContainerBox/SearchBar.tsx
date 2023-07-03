import React from "react";
import Button from "../Buttons";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

interface SearchBarProps {
  readonly searchRef: React.RefObject<HTMLInputElement>;
  readonly fetchWeatherData: (e: React.FormEvent<HTMLFormElement>) => void;
  readonly fetchLocationData: () => void;
}

function SearchBar({
  searchRef,
  fetchWeatherData,
  fetchLocationData,
}: SearchBarProps) {
  return (
    <form className="w-3/4 max-w-5xl flex h-10 " onSubmit={fetchWeatherData}>
      <input
        ref={searchRef}
        type="search"
        className="h-full text-xl px-3 py-4 flex-grow bg-slate-50 rounded-l-md outline-none"
        placeholder="Choose city"
      />
      <Button
        type="button"
        location
        onClick={() => {
          fetchLocationData();
        }}
      >
        <BiCurrentLocation />
      </Button>
      <Button type="submit" search>
        <BiSearch />
      </Button>
    </form>
  );
}

export default SearchBar;
