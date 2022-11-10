import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

const Marquee = () => {
  const {
    duration = 5,
    text = "精力善用　自他共榮",
    color = "yellow",
    bgColor = "black",
  } = useParams();

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      overflow: "hidden",
      background: bgColor,
      flex: 1,
    }),
    [bgColor]
  );

  const textStyle = useMemo<React.CSSProperties>(
    () => ({
      color: color,
      fontSize: "83vw",
      transformOrigin: "bottom left",
      userSelect: "none",
      whiteSpace: "pre",
      position: "absolute",
      animationName: "rolling",
      animationDuration: `${duration}s`,
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
      overflow: "hidden",
    }),
    [color, duration]
  );

  return (
    <div style={containerStyle}>
      <span style={textStyle} id="text">
        {text}
      </span>
    </div>
  );
};

export default Marquee;
