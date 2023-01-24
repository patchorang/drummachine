import { useRef, useEffect } from "react";

export const useSetInterval = (cb, time) => {
  const cbRef = useRef(null);

  useEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    const interval = setInterval(() => cbRef.current(), time);
    return () => clearInterval(interval);
  }, [time]);
};
