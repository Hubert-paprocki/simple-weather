import React, { RefObject } from "react";
interface inputsProps {
  search: boolean;
  refs?: RefObject<HTMLInputElement>;
  placeholder?: string;
}
function Input({ search, refs, placeholder }: inputsProps) {
  let inputClasses;
  if (search) {
    inputClasses =
      "h-full text-xl px-3 py-4 flex-grow bg-slate-50 lg:rounded-l-md outline-none text-stone-700/80 placeholder:text-stone-700/40";
  }
  return (
    <input
      ref={refs}
      type="search"
      className={inputClasses}
      placeholder={placeholder}
    />
  );
}

export default Input;
