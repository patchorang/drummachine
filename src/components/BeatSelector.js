function BeatSelector({ currentSelection, setSelection }) {
  const btnClasses =
    "border-black border-2 text-black font-bold py-1 px-3 rounded text-sm";

  return (
    <div className="flex space-x-1 items-center">
      <div className="font-bold text-sm">Track {currentSelection}</div>

      <button
        className={btnClasses}
        onClick={() => setSelection(currentSelection - 1)}
      >
        Prev
      </button>
      <button
        className={btnClasses}
        onClick={() => setSelection(currentSelection + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default BeatSelector;
