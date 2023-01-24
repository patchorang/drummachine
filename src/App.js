import { useState } from "react";
import Track from "./components/Track";

function App() {
  const [inited, setInited] = useState(false);

  const btnClasses =
    "border-black border-2 text-black font-bold py-1 px-3 rounded text-sm";

  const rendered = inited ? (
    <Track />
  ) : (
    <button className={btnClasses} onClick={() => setInited(true)}>
      Get started
    </button>
  );
  return rendered;
}

export default App;
