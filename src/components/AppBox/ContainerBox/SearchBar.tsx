import React, { useRef } from "react";
import Button from "../Buttons";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

interface SearchBarProps {
  readonly fetchWeatherDataWithSearch: (city: string) => void;
  readonly fetchLocationData: () => void;
}

function SearchBar({
  fetchWeatherDataWithSearch,
  fetchLocationData,
}: SearchBarProps) {
  const citySearchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (citySearchRef.current) {
      fetchWeatherDataWithSearch(
        citySearchRef.current.value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );
      citySearchRef.current.value = "";
    }
  };

  return (
    <form className="flex h-10" onSubmit={handleSubmit}>
      <input
        ref={citySearchRef}
        type="search"
        className="h-full text-xl px-3 py-4 flex-grow bg-slate-50 lg:rounded-l-md outline-none text-stone-700/80 placeholder:text-stone-700/40"
        placeholder="Choose city, country"
      />
      <Button type="button" location onClick={fetchLocationData}>
        <BiCurrentLocation />
      </Button>
      <Button type="submit" search>
        <BiSearch />
      </Button>
    </form>
  );
}

export default SearchBar;
