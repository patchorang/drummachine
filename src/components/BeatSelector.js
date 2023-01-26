import { useSelector, useDispatch } from "react-redux";
import { setSelectedBeat } from "../store/slices/controllerSlice";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
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
      <Button onClick={handleDecrement} square>
        <IoChevronBack size={20} />
      </Button>
      <div className="font-bold text-sm">Pattern {selectedBeat + 1}</div>

      <Button onClick={handleIncrement} square>
        <IoChevronForward size={20} />
      </Button>
    </div>
  );
}

export default BeatSelector;
