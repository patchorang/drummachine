import { useState } from "react";
import Velocity from "./Velocity";
var classnames = require("classnames");

function Beat({
  isOn,
  index,
  velocity,
  isActive,
  highlight,
  handleToggle,
  showVelocity,
  onVelocityChange,
}) {
  const toggle = () => {
    handleToggle();
  };

  // TODO: FIGURE OUT HOW TO SET COLOR BASED ON VELOCITY
  let colorDepth = Math.round(((Math.round(velocity * 10) / 10) * 10) / 2);
  const indigoColorVariants = [
    "bg-indigo-100",

    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
  ];
  const tealColorVariants = [
    "bg-teal-100",
    "bg-teal-200",
    "bg-teal-300",
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
  ];

  const classes = classnames(
    "w-8",
    "h-8",
    "rounded",
    "mr-1",
    "cursor-pointer",
    {
      "border-black border-2": isActive && highlight,
    },
    {
      "border-black border-2": isActive && !highlight,
    },

    {
      "bg-indigo-50": highlight && !isOn,
    },
    {
      "bg-teal-50": !highlight && !isOn,
    },
    {
      [indigoColorVariants[colorDepth]]: isOn && highlight,
    },
    {
      [tealColorVariants[colorDepth]]: isOn && !highlight,
    }
  );

  const handleVelocityChange = (velocity) => {
    onVelocityChange(index, velocity);
  };

  return (
    <div>
      <div onClick={toggle} className={classes} />
      {showVelocity && isOn ? (
        <Velocity velocity={velocity} onVelocityChange={handleVelocityChange} />
      ) : null}
    </div>
  );
}

export default Beat;
