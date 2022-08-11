import { useEffect, useState } from "react";

/*
  Returns the width of the current viewport.
  Useful for conditional rendering depending 
  on screen size
*/
const useViewport = () => {
  const [screenWidth, setsScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setsScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { screenWidth };
};

export default useViewport;
