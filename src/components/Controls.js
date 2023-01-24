import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { IoStopOutline } from "react-icons/io5";

function Controls({ onPlay, onPause, onStop, playing }) {
  const btnClasses =
    "border-black border-2 text-black font-bold py-1 px-3 rounded text-sm";

  return (
    <div className="flex flex-row space-x-1">
      {!playing ? (
        <button className={btnClasses} onClick={onPlay}>
          <IoPlayOutline size={24} />
        </button>
      ) : (
        <button className={btnClasses} onClick={onPause}>
          <IoPauseOutline size={24} />
        </button>
      )}
      <button className={btnClasses} onClick={onStop}>
        <IoStopOutline size={24} />
      </button>
    </div>
  );
}

export default Controls;
