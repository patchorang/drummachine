import Beat from "./Beat";
import { useDispatch, useSelector } from "react-redux";
import { toggleBeat, setVelocity } from "../store/slices/beatSlice";
import { useState } from "react";
var classnames = require("classnames");

function Channel({ channelData, channelIndex, label }) {
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

  return (
    <div className={classes}>
      <div className="flex flex-col items-end pr-1">
        <div className="w-16 text-right text-xs font-bold">{label}</div>
        <button
          className="text-xs"
          onClick={() => setShowVelocity(!showVelocity)}
        >
          <div className="hidden group-hover:block">
            {showVelocity ? "hide" : "volume"}
          </div>
        </button>
      </div>
      {renderedChannel}
    </div>
  );
}

export default Channel;
