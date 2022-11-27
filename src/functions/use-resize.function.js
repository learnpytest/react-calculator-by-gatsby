import { useEffect, useState } from "react";

const useResize = () => {
  const [size, setSize] = useState({width: null});

  useEffect(() => {
    const updateSize = () => {
      setSize({
        ...size,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return size;
};

export default useResize;
