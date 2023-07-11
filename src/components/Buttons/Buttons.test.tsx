import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Buttons";

describe("Button component", () => {
  test("renders button with text content", () => {
    const buttonText = "Click me";
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("applies search styles when primary prop is true", () => {
    render(<Button search />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("border-l-[3px]");
  });
});
