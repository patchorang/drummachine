import Beat from "./Beat";
import { IoClose, IoVolumeMediumOutline } from "react-icons/io5";
import sampleLibrary from "../utils/samplesLibrary";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBeat,
  setVelocity,
  setInstrument,
  removeChannel,
} from "../store/slices/beatSlice";
var classnames = require("classnames");

function Channel({ instrument, channelData, channelIndex }) {
  const activeBeatIndex = useSelector(
    (state) => state.controller.activeBeatIndex
  );
  const currentBeat = useSelector((state) => state.controller.currentBeat);
  const dispatch = useDispatch();

  const [showVelocity, setShowVelocity] = useState(false);

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
      showVelocity={showVelocity}
    />
  ));
  const classes = classnames("flex mb-1 group");

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
      className="border-black border-2 text-black font-bold h-8 rounded text-sm w-24"
    >
      {instrumentSelectorOptions}
    </select>
  );

  return (
    <div className={classes}>
      <div className="flex flex-row items-start pr-1 space-x-1 mr-4">
        {renderedInstrumentselector}

        <button
          className="border-black border-2 text-black font-bold rounded text-sm w-8  h-8 "
          onClick={() => setShowVelocity(!showVelocity)}
        >
          <div>
            {showVelocity ? (
              "hide"
            ) : (
              <IoVolumeMediumOutline className="mx-auto" size={16} />
            )}
          </div>
        </button>
      </div>
      {renderedChannel}
      <button
        onClick={handleRemoveChannel}
        className="border-black border-2 text-black font-bold rounded w-8 h-8 ml-4"
      >
        <IoClose className="mx-auto" size={16} />
      </button>
    </div>
  );
}

export default Channel;
