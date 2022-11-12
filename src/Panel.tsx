import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  InputLabel,
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
      `/${state.duration}/${encodeURIComponent(
        state.color
      )}/${encodeURIComponent(state.bgColor)}/${state.text}`,
    [state]
  );

  useEffect(() => {
    localStorage.setItem("marquee", JSON.stringify(state));
  }, [state]);

  return (
    <Container maxWidth="xs" sx={rootSx}>
      <Typography variant="h1">應援板</Typography>
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
      <Box sx={{ ...rowSx, justifyContent: "space-around" }}>
        <Button
          variant="contained"
          onClick={() => navigate(resultUrl)}
          startIcon={<LiveTvIcon />}
        >
          Go Live!
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
          複製網址
        </Button>
        <Button
          variant="outlined"
          onClick={() => setState(DEFAULT_STATE)}
          startIcon={<RestartAltIcon />}
        >
          重設預設值
        </Button>
      </Box>
    </Container>
  );
};

const Panel = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
};

const DEFAULT_STATE: PanelState = {
  text: "精力善用　自他共榮",
  color: "yellow",
  bgColor: "black",
  duration: 5,
};
