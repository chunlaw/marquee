import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({});

const CorePanel = () => {
  return <></>;
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
