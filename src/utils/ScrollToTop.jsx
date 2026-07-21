import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This moves the window to the top (0,0) every time the path changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Gives it that premium smooth sliding feel
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;