import { Box, Typography, SxProps, Theme } from "@mui/material";
import LanguagePicker from "../components/layouts/LanguagePicker";
import { useTranslation } from "react-i18next";
import MenuBtn from "../components/layouts/MenuBtn";

const Header = () => {
  const { t } = useTranslation();

  return (
    <Box sx={headerSx}>
      <MenuBtn />
      <Typography variant="h3">{t("App Name")}</Typography>
      <LanguagePicker sx={langSx} />
    </Box>
  );
};

export default Header;

const headerSx: SxProps<Theme> = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
};

const langSx: SxProps<Theme> = {
  display: "flex",
  height: "100%",
  py: 1,
};
