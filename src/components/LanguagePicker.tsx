import React, { useCallback, useState } from "react";
import { Box, IconButton, Menu, MenuItem, SxProps, Theme } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";

const LanguagePicker = ({ sx }: { sx: SxProps<Theme> }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
      handleClose();
    },
    [i18n, handleClose]
  );

  return (
    <Box sx={sx}>
      <IconButton
        id="language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {Object.entries(LANG).map(([key, label]) => (
          <MenuItem key={key} onClick={() => changeLanguage(key)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguagePicker;

const LANG = {
  en: "English",
  ja: "日本語",
  th: "ไทย",
  zh: "中文",
};
