interface ButtonProps {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset" | undefined;
  readonly primary?: boolean;
  readonly lang?: boolean;
  readonly disabled?: boolean;
  readonly search?: boolean;
  readonly location?: boolean;
}

function Button({
  children,
  type,
  onClick,
  primary,
  disabled,
  search,
  location,
}: ButtonProps): JSX.Element {
  let classes;
  if (primary) {
    classes =
      "px-5 py-2 bg-yellow-800 bg-opacity-20 rounded-bl-lg rounded-tl-lg rounded-br-lg rounded-tr-lg duration-200 border-r-4 border-l-4 border-stone-800 text-stone-300 hover:text-stone-50 md:min-w-[217px] hover:min-w-[250px] uppercase tracking-wider";
  }
  if (search) {
    classes +=
      " h-10 text-2xl bg-slate-50 border-l-[3px] px-4 rounded-r-md hover:text-teal-500 hover:bg-teal-50 duration-200";
  }
  if (disabled) {
    classes += " opacity-40 hover:translate-y-0 active:translate-y-0";
  }
  if (location) {
    classes +=
      "h-10 text-2xl bg-slate-50 border-l-[5px] px-4 hover:text-teal-500 hover:bg-teal-50 duration-200";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      style={{ WebkitTapHighlightColor: "transparent" }}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}

export default Button;
