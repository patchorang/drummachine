import { useSelector, useDispatch } from "react-redux";
import { setSelectedBeat } from "../store/slices/controllerSlice";
import Button from "./Button";

function BeatSelector() {
  const selectedBeat = useSelector((state) => state.controller.currentBeat);
  const numBeats = useSelector((state) => state.beat.length);
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (selectedBeat - 1 >= 0) {
      dispatch(setSelectedBeat(selectedBeat - 1));
    }
  };

  const handleIncrement = () => {
    if (selectedBeat + 1 < numBeats) {
      dispatch(setSelectedBeat(selectedBeat + 1));
    }
  };

  return (
    <div className="flex space-x-1 items-center">
      <div className="font-bold text-sm">Track {selectedBeat}</div>
      <Button onClick={handleDecrement}>Prev</Button>
      <Button onClick={handleIncrement}>Next</Button>
    </div>
  );
}

export default BeatSelector;
