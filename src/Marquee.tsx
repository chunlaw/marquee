import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import AppContext from "./AppContext";

const Marquee = () => {
  const {
    duration = 5,
    text = "精力善用　自他共榮",
    color = "yellow",
    bgColor = "black",
    font = '"Noto Sans HK" sans-serif',
  } = useParams();
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "horizontal",
  );
  const [show, setShow] = useState<boolean>(false);
  const { logEntry } = useContext(AppContext);
  const navigate = useNavigate();

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      overflow: "hidden",
      background: bgColor,
      flex: 1,
      width: "100vw",
      height: "100vh",
      position: "fixed",
    }),
    [bgColor],
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
      visibility: show ? "visible" : "hidden",
      lineHeight: 1,
      fontFamily: font,
      fontSize: `80${direction === "horizontal" ? "vh" : "vw"}`,
    }),
    [color, duration, direction, show, font],
  );

  const handleResize = useMemo(
    () =>
      debounce(() => {
        setDirection(() =>
          window.innerHeight < window.innerWidth ? "horizontal" : "vertical",
        );
        setShow(true);
      }, 200),
    [setDirection, setShow],
  );

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    if (!inIframe()) {
      logEntry(window.location.pathname);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleDoubleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div style={containerStyle} onDoubleClick={handleDoubleClick}>
      <span style={textStyle} id="text">
        {text}
      </span>
    </div>
  );
};

export default Marquee;

const inIframe = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
