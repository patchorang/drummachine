import { useSelector, useDispatch } from "react-redux";
import { playBeat, pauseBeat, stopBeat } from "../store/slices/controllerSlice";
import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { IoStopOutline } from "react-icons/io5";
import Button from "./Button";

function Controls() {
  const playing = useSelector((state) => state.controller.playing);
  const dispatch = useDispatch();

  const renderedPlayPauseButton = playing ? (
    <Button onClick={() => dispatch(pauseBeat())}>
      <IoPauseOutline size={24} />
    </Button>
  ) : (
    <Button onClick={() => dispatch(playBeat())}>
      <IoPlayOutline size={24} />
    </Button>
  );

  return (
    <div className="flex flex-row space-x-1">
      {renderedPlayPauseButton}
      <Button onClick={() => dispatch(stopBeat())}>
        <IoStopOutline size={24} />
      </Button>
    </div>
  );
}

export default Controls;
