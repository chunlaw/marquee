import { SxProps, Theme, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="caption"
      onClick={() => window.open("https://www.flaticon.com/free-icons/fans")}
      sx={captionSx}
    >
      Fans icons created by Good Ware - Flaticon
    </Typography>
  );
};

export default Footer;

const captionSx: SxProps<Theme> = {
  cursor: "pointer",
};
