interface ButtonProps {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: "button" | "submit" | "reset" | undefined;
  readonly primary?: boolean;
  readonly lang?: boolean;
  readonly disabled?: boolean;
  readonly search?: boolean;
  readonly location?: boolean;
  readonly switchsBtn?: boolean;
  readonly activeBtn?: boolean;
  readonly ariaLabel?: string;
}

function Button({
  children,
  type,
  onClick,
  primary,
  disabled,
  search,
  location,
  switchsBtn,
  activeBtn,
  ariaLabel,
}: ButtonProps): JSX.Element {
  let classes;
  let active =
    "hover:text-teal-500 hover:bg-teal-50 duration-200 active:duration-50 active:text-teal-400 active:bg-teal-100";
  if (primary) {
    classes = "";
  }
  if (search) {
    classes = `text-stone-700/80 h-10 text-2xl bg-slate-50 border-l-[3px] px-4 lg:rounded-r-md ${active}`;
  }
  if (disabled) {
    classes =
      "bg-slate-500 hover:translate-y-0 active:translate-y-0 cursor-default";
  }
  if (location) {
    classes = `text-stone-700/80 h-10 text-2xl bg-slate-50 border-l-[5px] px-4 ${active}`;
  }
  if (switchsBtn) {
    classes = `bg-slate-50 text-stone-700/60 px-4 py-2 first:rounded-l-md last:rounded-r-md font-medium ${active}`;
  }
  if (activeBtn) {
    classes += ` bg-teal-100`;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      style={{ WebkitTapHighlightColor: "transparent" }}
      disabled={disabled || false}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default Button;
