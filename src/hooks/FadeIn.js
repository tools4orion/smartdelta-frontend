import React, { useState, useEffect } from "react";
import Fade from "@mui/material/Fade";

function FadeIn({ children, delay = 100, duration = 1200 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay]);

  return (
    <Fade in={isVisible} timeout={duration}>
      {children}
    </Fade>
  );
}

export default FadeIn;
