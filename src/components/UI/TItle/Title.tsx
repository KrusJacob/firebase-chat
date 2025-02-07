import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

const Title = ({ children, center }: { children: ReactNode; center?: boolean }) => {
  return (
    <Typography variant="h4" fontWeight={600} textAlign={center ? "center" : "left"}>
      {children}
    </Typography>
  );
};

export default Title;
