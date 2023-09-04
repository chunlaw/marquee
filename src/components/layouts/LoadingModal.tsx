import { Box, CircularProgress, Modal } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../AppContext";

const LoadingModal = () => {
  const { generatingGif } = useContext(AppContext);
  return (
    <Modal open={generatingGif}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={82} />
      </Box>
    </Modal>
  );
};

export default LoadingModal;
