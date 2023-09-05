import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { Marquee } from "../data";
import { useContext } from "react";
import AppContext from "../AppContext";
import rasterizeHTML from "rasterizehtml";
// @ts-ignore
import CanvasGifEncoder from "@pencil.js/canvas-gif-encoder";

const GifBtn = () => {
  const { marquee, generatingGif, toggleGeneratingGif } =
    useContext(AppContext);

  const handleClick = async () => {
    toggleGeneratingGif();
    try {
      const encoder = new CanvasGifEncoder(300, 150, { quality: 1 });
      for (let i = 0; i < marquee.duration; i += 0.1) {
        await getMarqueeFrame(marquee, i, encoder);
      }
      const gif = encoder.end();
      encoder.flush();
      const blob = new Blob([gif], {
        type: "image/gif",
      });
      const file = URL.createObjectURL(blob);
      window.open(file, "_blank");
    } finally {
      toggleGeneratingGif();
    }
  };

  return (
    <Button
      id="hi"
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleClick}
      disabled={generatingGif}
    >
      GIF
    </Button>
  );
};

export default GifBtn;

const getMarqueeFrame = (
  { bgColor, text, color, font, duration }: Marquee,
  frame: number,
  encoder: CanvasGifEncoder,
) => {
  const html = `
    <body
      style="
        overflow: clip;
        background: ${bgColor};
        flex: 1;
        width: ${window.innerWidth}px;
        height: ${window.innerHeight}px;
        position: fixed;
        margin-top: -4px;
        margin-left: -4px;
      "
    >
        <span
          style="
            color: ${color};
            transform-origin: top left;
            user-select: none;
            white-space: pre;
            position: absolute;
            animation-name: horizontal-rolling;
            animation-duration: ${duration}s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            visibility: visible;
            padding-top: 5px;
            font-size: 80vh;
            line-height: 1;
            animation-play-state: paused;
            animation-delay: -${frame}s
          "
        >${text}</span>
    </body>
    <style>
      @keyframes horizontal-rolling {
        0% {
          transform: translateX(100vw);
          line-height: 1;
          min-width: 100vw;
        }
        100% {
          transform: translateX(-100%);
          line-height: 1;
          min-width: 100vw;
        }
      }
    </style>
  `;

  return rasterizeHTML
    .drawHTML(
      html,
      document.getElementsByTagName("canvas")[0] as HTMLCanvasElement,
    )
    .then(() => {
      const ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
      encoder.addFrame(ctx, 100);
    });
};
