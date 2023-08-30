import { Box, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useContext } from "react";
import MenuDrawer from "./MenuDrawer";
import AppContext from "../../AppContext";

const MenuBtn = () => {
  const { menuOpen, toggleMenu } = useContext(AppContext);

  return (
    <>
      <Box>
        <IconButton onClick={toggleMenu}>
          <MenuIcon />
        </IconButton>
      </Box>
      <MenuDrawer open={menuOpen} onClose={toggleMenu} />
    </>
  );
};

export default MenuBtn;
