function Button({ children, ...rest }) {
  const btnClasses =
    "border-black border-2 text-black font-bold py-1 px-3 rounded text-sm";

  return (
    <button {...rest} className={btnClasses}>
      {children}
    </button>
  );
}

export default Button;
