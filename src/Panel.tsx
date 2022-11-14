import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ColorPicker from "./components/ColorPicker";
import { useNavigate } from "react-router-dom";
import SliderField from "./components/SliderField";
import {
  LiveTv as LiveTvIcon,
  RestartAlt as RestartAltIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";

interface PanelState {
  text: string;
  color: string;
  bgColor: string;
  font: string;
  duration: number;
}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CorePanel = () => {
  const [state, setState] = useState<PanelState>(
    JSON.parse(localStorage.getItem("marquee") ?? JSON.stringify(DEFAULT_STATE))
  );
  const navigate = useNavigate();

  const handleChange = useCallback(
    (field: keyof PanelState, v: any) => {
      setState((prev) => ({
        ...prev,
        [field]: v,
      }));
    },
    [setState]
  );

  const resultUrl = useMemo(
    () =>
      "/" +
      [
        state.duration,
        encodeURIComponent(state.color),
        encodeURIComponent(state.bgColor),
        encodeURIComponent(state.font),
        encodeURIComponent(
          state.text !== "" ? state.text : "精力善用　自他共榮"
        ),
      ].join("/"),
    [state]
  );

  useEffect(() => {
    localStorage.setItem("marquee", JSON.stringify(state));
  }, [state]);

  return (
    <Container maxWidth="xs" sx={rootSx}>
      <Typography variant="h3">應援板</Typography>
      <iframe src={resultUrl} style={{ width: "100%" }} title="demo" />
      <TextField
        label={"句子"}
        value={state.text}
        onChange={(e) => handleChange("text", e.target.value)}
        fullWidth
      />
      <Box sx={rowSx}>
        <InputLabel>長度</InputLabel>
        <SliderField
          value={state.duration}
          onChange={(v) => handleChange("duration", v)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>字色</InputLabel>
        <ColorPicker
          value={state.color}
          defaultValue={state.color}
          onChange={(e) => handleChange("color", e)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>底色</InputLabel>
        <ColorPicker
          value={state.bgColor}
          defaultValue={state.bgColor}
          onChange={(e) => handleChange("bgColor", e)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>字體</InputLabel>
        <Box sx={{ width: "80%" }}>
          <Select
            value={state.font}
            onChange={(e) => handleChange("font", e.target.value as string)}
            size="small"
            fullWidth
          >
            {FONT_FAMILY.map(({ label, id }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box sx={{ ...rowSx, justifyContent: "space-around" }}>
        <Button
          variant="contained"
          onClick={() => navigate(resultUrl)}
          startIcon={<LiveTvIcon />}
        >
          Live!
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            window.navigator.clipboard.writeText(
              `${window.location.href}${resultUrl.slice(1)}`
            )
          }
          color="secondary"
          startIcon={<ContentCopyIcon />}
        >
          Copy Url
        </Button>
        <Button
          variant="outlined"
          onClick={() => setState(DEFAULT_STATE)}
          startIcon={<RestartAltIcon />}
        >
          重設
        </Button>
      </Box>
      <Typography
        variant="caption"
        onClick={() => window.open("https://www.flaticon.com/free-icons/fans")}
        sx={captionSx}
      >
        Fans icons created by Good Ware - Flaticon
      </Typography>
    </Container>
  );
};

const Panel = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4844128667931950"
        data-ad-slot="1004241351"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <CorePanel />
    </ThemeProvider>
  );
};

export default Panel;

const rootSx: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const rowSx: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
};

const captionSx: SxProps<Theme> = {
  cursor: "pointer",
};

const FONT_FAMILY: Array<{ label: string; id: string }> = [
  { label: "昭源黑體", id: "Chiron Hei HK WS" },
  { label: "昭源宋體", id: "Chiron Sung HK WS" },
  { label: '"Noto Sans HK" sans-serif', id: '"Noto Sans HK" sans-serif' },
  {
    label: '"Noto Sans Lao Looped" sans-serif',
    id: '"Noto Sans Lao Looped" sans-serif',
  },
];

const DEFAULT_STATE: PanelState = {
  text: "精力善用　自他共榮",
  color: "yellow",
  bgColor: "black",
  duration: 5,
  font: FONT_FAMILY[0].id,
};
