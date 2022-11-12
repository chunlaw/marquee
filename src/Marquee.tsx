import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";

const Marquee = () => {
  const {
    duration = 5,
    text = "精力善用　自他共榮",
    color = "yellow",
    bgColor = "black",
  } = useParams();
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "vertical"
  );

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      overflow: "hidden",
      background: bgColor,
      flex: 1,
      width: "100vw",
      height: "100vh",
      position: "fixed",
    }),
    [bgColor]
  );

  const textStyle = useMemo<React.CSSProperties>(
    () => ({
      color: color,
      transformOrigin: "top left",
      userSelect: "none",
      whiteSpace: "pre",
      position: "absolute",
      animationName: `${direction}-rolling`,
      animationDuration: `${duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    }),
    [color, duration, direction]
  );

  const handleResize = useMemo(
    () =>
      debounce(() => {
        setDirection(() =>
          window.innerHeight < window.innerWidth ? "horizontal" : "vertical"
        );
      }, 200),
    [setDirection]
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div style={containerStyle}>
      <span style={textStyle} id="text">
        {text}
      </span>
    </div>
  );
};

export default Marquee;
