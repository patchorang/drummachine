function IconButton({ children, ...rest }) {
  const btnClasses =
    "border-black border-2 text-black font-bold rounded text-sm w-8 h-8 hover:bg-gray-100";

  return (
    <button {...rest} className={btnClasses}>
      {children}
    </button>
  );
}

export default IconButton;
