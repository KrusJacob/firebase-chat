import { Grid2, Modal } from "@mui/material";
import { ReactNode } from "react";

const style = {
  position: "absolute",
  display: "flex",
  gap: 2,
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 8,
  borderRadius: 2,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MyModal = ({ children, open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Grid2 sx={style}>{children}</Grid2>
    </Modal>
  );
};

export default MyModal;
