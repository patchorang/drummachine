import { useRef, useEffect } from "react";
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useSetInterval = (callback, time) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (time !== null) {
      let id = setInterval(tick, time);
      return () => clearInterval(id);
    }
  }, [time]);
};
