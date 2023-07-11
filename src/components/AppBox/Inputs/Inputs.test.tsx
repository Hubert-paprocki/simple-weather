import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "./Inputs";

describe("Input component", () => {
  const placeholderText = "Enter your search query";
  test("renders input element with placeholder", () => {
    render(<Input search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test("applies search styles when search prop is true", () => {
    render(<Input search placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toHaveClass("bg-slate-50");
  });
});
