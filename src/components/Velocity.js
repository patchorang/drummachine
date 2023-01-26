function Velocity({ velocity, onVelocityChange }) {
  const minPos = 0;
  const maxPos = 1;

  // make sure we dont go off the controls
  const controlPos = ((100 - velocity * 100) * 88) / 100;

  return (
    <div className="wrapper mt-1 flex center-item">
      <input
        className="input-range vertical-slider h-16 ml-2"
        // orient="vertical"
        type="range"
        step="0.05"
        value={velocity}
        onChange={(e) => onVelocityChange(e.target.value)}
        min={minPos}
        max={maxPos}
      ></input>
      <div className="control-wrapper border-black border-2 rounded ml-2">
        <div className="control bg-black" style={{ top: `${controlPos}%` }} />
      </div>
    </div>
  );
  // return (
  //   <input
  //     className="input-range vertical-slider h-16 w-8"
  //     // orient="vertical"
  //     type="range"
  //     step="0.05"
  //     value={velocity}
  //     onChange={(e) => onVelocityChange(e.target.value)}
  //     min="0"
  //     max="1"
  //   ></input>
  // );
}

export default Velocity;
