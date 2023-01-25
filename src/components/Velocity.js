function Velocity({ velocity, onVelocityChange }) {
  return (
    <input
      className="input-range vertical-slider h-16 w-8"
      orient="vertical"
      type="range"
      step="0.05"
      value={velocity}
      onChange={(e) => onVelocityChange(e.target.value)}
      min="0"
      max="1"
    ></input>
  );
}

export default Velocity;
