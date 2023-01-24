import Beat from "./Beat";
import { useState } from "react";
var classnames = require("classnames");

function Channel({ track, activeBeat, label, toggleBeat, onVelocityChange }) {
  const [showVelocity, setShowVelocity] = useState(false);

  const handleToggle = (index) => {
    toggleBeat(index);
  };

  const renderedChannel = track.map((c, i) => (
    <Beat
      key={track.toString() + i}
      index={i}
      isOn={c.on}
      velocity={c.velocity}
      isActive={i === activeBeat}
      highlight={(i / 8.0) % 1 >= 0.5}
      handleToggle={() => handleToggle(i)}
      showVelocity={showVelocity}
      onVelocityChange={onVelocityChange}
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
