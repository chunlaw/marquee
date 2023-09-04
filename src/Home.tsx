import {
  Container,
  createTheme,
  CssBaseline,
  SxProps,
  Theme,
  ThemeProvider,
} from "@mui/material";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Panel from "./components/panel/Panel";
import LoadingModal from "./components/layouts/LoadingModal";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Home = () => {
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
      <Container maxWidth="xs" fixed sx={rootSx}>
        <Header />
        <Panel />
        <Footer />
        <LoadingModal />
      </Container>
    </ThemeProvider>
  );
};

export default Home;

const rootSx: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
