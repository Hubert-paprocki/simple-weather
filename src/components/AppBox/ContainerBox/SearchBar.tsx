import React, { useRef } from "react";
import Button from "../../Buttons/Buttons";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import Input from "../Inputs/Inputs";

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
      <Input search refs={citySearchRef} placeholder="Choose city, country" />
      <Button
        type="button"
        location
        onClick={fetchLocationData}
        ariaLabel="get user location"
      >
        <BiCurrentLocation />
      </Button>
      <Button type="submit" search ariaLabel="search">
        <BiSearch />
      </Button>
    </form>
  );
}

export default SearchBar;
