function Velocity({ velocity, onVelocityChange }) {
  const changeVelocity = (e) => {
    onVelocityChange(e.target.value);
  };

  return (
    <input
      className="input-range vertical-slider h-16 w-8"
      orient="vertical"
      type="range"
      step="0.05"
      value={velocity}
      onChange={changeVelocity}
      min="0"
      max="1"
    ></input>
  );
}

export default Velocity;
