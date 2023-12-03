import { useContext, useMemo } from "react";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Theme,
  SxProps,
} from "@mui/material";
import ColorPicker from "../ColorPicker";
import SliderField from "../SliderField";
import AppContext, { FONT_FAMILY } from "../../AppContext";
import {
  LiveTv as LiveTvIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GifBtn from "../GifBtn";

const Panel = () => {
  const {
    marquee: state,
    updateMarquee,
    saveEntry,
    savedEntries,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resultUrl = useMemo(
    () =>
      "/" +
      [
        state.duration,
        encodeURIComponent(state.color),
        encodeURIComponent(state.bgColor),
        encodeURIComponent(state.font),
        encodeURIComponent(
          state.text !== "" ? state.text : "精力善用　自他共榮",
        ),
        encodeURIComponent(btoa(state.bgUrl)),
      ].join("/"),
    [state],
  );

  return (
    <>
      <iframe
        id="showcase"
        src={resultUrl}
        style={{ width: "100%", pointerEvents: "none" }}
        title="demo"
      />
      <TextField
        label={t("Message")}
        value={state.text}
        onChange={(e) => updateMarquee("text", e.target.value)}
        fullWidth
      />
      <Box sx={rowSx}>
        <InputLabel>{t("Duration")}</InputLabel>
        <SliderField
          value={state.duration}
          onChange={(v) => updateMarquee("duration", v)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>{t("Font Color")}</InputLabel>
        <ColorPicker
          value={state.color}
          defaultValue={state.color}
          onChange={(e) => updateMarquee("color", e)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>{t("Background")}</InputLabel>
        <ColorPicker
          value={state.bgColor}
          defaultValue={state.bgColor}
          onChange={(e) => updateMarquee("bgColor", e)}
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>{t("Background URL")}</InputLabel>
        <TextField
          value={state.bgUrl}
          onChange={({target: {value}}) => updateMarquee("bgUrl", value)}
          size="small"
        />
      </Box>
      <Box sx={rowSx}>
        <InputLabel>{t("Font Family")}</InputLabel>
        <Box sx={{ width: "60%" }}>
          <Select
            value={state.font}
            onChange={(e) => updateMarquee("font", e.target.value as string)}
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
              `${window.location.href}${resultUrl.slice(1)}`,
            )
          }
          color="secondary"
          startIcon={<ContentCopyIcon />}
        >
          Share
        </Button>
        <GifBtn />
        <Button
          variant="outlined"
          onClick={() => saveEntry(resultUrl)}
          startIcon={
            savedEntries.includes(resultUrl) ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )
          }
        >
          {t("Bookmark")}
        </Button>
      </Box>
    </>
  );
};

export default Panel;

const rowSx: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
};
