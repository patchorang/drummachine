function Button({ children, square, ...rest }) {
  let btnClasses =
    "border-black border-2 text-black font-bold h-8 rounded text-sm hover:bg-gray-200";

  if (square) {
    btnClasses += " w-8 flex items-center justify-center";
  } else {
    btnClasses += " px-3";
  }

  return (
    <button {...rest} className={btnClasses}>
      {children}
    </button>
  );
}

export default Button;
