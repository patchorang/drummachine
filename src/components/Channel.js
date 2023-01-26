import Beat from "./Beat";
import { IoClose, IoOptions } from "react-icons/io5";
import Button from "./Button";
import sampleLibrary from "../utils/samplesLibrary";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBeat,
  setVelocity,
  setInstrument,
  removeChannel,
} from "../store/slices/beatSlice";
import {
  setActiveVelocityChannel,
  hideVelocity,
} from "../store/slices/controllerSlice";
var classnames = require("classnames");

function Channel({ instrument, channelData, channelIndex }) {
  const activeBeatIndex = useSelector(
    (state) => state.controller.activeBeatIndex
  );
  const currentBeat = useSelector((state) => state.controller.currentBeat);
  const activeVelocityChannel = useSelector(
    (state) => state.controller.activeVelocityChannel
  );
  const dispatch = useDispatch();

  const handleVelocityToggle = () => {
    if (activeVelocityChannel === channelIndex) {
      dispatch(hideVelocity());
    } else {
      dispatch(setActiveVelocityChannel(channelIndex));
    }
  };

  const handleToggle = (index) => {
    dispatch(
      toggleBeat({
        beatIndex: currentBeat,
        channelIndex: channelIndex,
        noteIndex: index,
      })
    );
  };

  const handleChangeVelocity = (index, velocity) => {
    dispatch(
      setVelocity({
        beatIndex: currentBeat,
        channelIndex: channelIndex,
        noteIndex: index,
        velocity: velocity,
      })
    );
  };

  const handleChangeInstrument = (instrument) => {
    dispatch(
      setInstrument({
        beatIndex: currentBeat,
        channelIndex: channelIndex,
        instrument: instrument,
      })
    );
  };

  const handleRemoveChannel = () => {
    dispatch(
      removeChannel({
        beatIndex: currentBeat,
        channelIndex: channelIndex,
      })
    );
    dispatch(hideVelocity());
  };

  const renderedChannel = channelData.map((c, i) => (
    <Beat
      key={channelData.toString() + i}
      index={i}
      isOn={c.on}
      velocity={c.velocity}
      isActive={i === activeBeatIndex}
      highlight={(i / 8.0) % 1 >= 0.5}
      handleToggle={() => handleToggle(i)}
      onVelocityChange={(v) => handleChangeVelocity(i, v)}
      showVelocity={activeVelocityChannel === channelIndex}
    />
  ));

  const classes = classnames("flex mb-1 group", {
    "mb-4": activeVelocityChannel === channelIndex,
  });

  const instrumentSelectorOptions = sampleLibrary.map((instrument, index) => {
    return (
      <option key={index} value={index}>
        {instrument.label}
      </option>
    );
  });

  const renderedInstrumentselector = (
    <select
      name="instrument"
      value={instrument}
      onChange={(e) => handleChangeInstrument(e.target.value)}
      className="border-black border-2 text-black font-bold h-8 rounded text-sm w-24 cursor-pointer"
    >
      {instrumentSelectorOptions}
    </select>
  );

  return (
    <div className={classes}>
      <div className="flex flex-row items-start pr-1 space-x-1 mr-4">
        {renderedInstrumentselector}

        <div>
          {activeVelocityChannel === channelIndex ? (
            <button
              className="border-black border-2 text-black font-bold rounded text-sm w-8 h-8 bg-black hover:bg-gray-800"
              onClick={handleVelocityToggle}
            >
              <IoOptions
                color="white"
                style={{ transform: "rotate(90deg)" }}
                className="mx-auto"
                size={20}
              />
            </button>
          ) : (
            <button
              className="border-black border-2 text-black font-bold rounded text-sm w-8 h-8 hover:bg-gray-200"
              onClick={handleVelocityToggle}
            >
              <IoOptions
                style={{ transform: "rotate(90deg)" }}
                className="mx-auto"
                size={20}
              />
            </button>
          )}
        </div>
      </div>
      {renderedChannel}
      <div className="ml-4">
        <Button onClick={handleRemoveChannel} square>
          <IoClose size={20} />
        </Button>
      </div>
    </div>
  );
}

export default Channel;
