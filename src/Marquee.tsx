import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

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
      display: "flex",
      height: "100vh",
      width: "100vw",
    }),
    [bgColor]
  );

  console.log(`rolling -${duration} linear infinite`);

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
