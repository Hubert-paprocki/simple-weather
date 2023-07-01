import React from "react";
import Button from "../Buttons";
import { BiSearch } from "react-icons/bi";

interface SearchBarProps {
  searchRef: React.RefObject<HTMLInputElement>;
  fetchWeatherData: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ searchRef, fetchWeatherData }: SearchBarProps) {
  return (
    <form className="w-full flex h-10" onSubmit={fetchWeatherData}>
      <input
        ref={searchRef}
        type="search"
        className="h-full text-xl px-3 py-4 flex-grow bg-stone-50 rounded-l-md outline-none"
        placeholder="Choose city"
      />
      <Button type="submit" search>
        <BiSearch />
      </Button>
    </form>
  );
}

export default SearchBar;
