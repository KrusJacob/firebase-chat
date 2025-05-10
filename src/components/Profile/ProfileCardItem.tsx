import { Grid2, Box } from "@mui/material";
import React from "react";

const ProfileCardItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Grid2>
      <Box
        sx={{
          padding: 2,
          fontSize: 20,
          bgcolor: "#537cb1",
          color: "white",
          borderRadius: "8px 8px 0 0",
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          p: { xs: 2, sm: 4 },

          borderRadius: "0 0 8px 8px",
        }}
      >
        {children}
      </Box>
    </Grid2>
  );
};

export default ProfileCardItem;
