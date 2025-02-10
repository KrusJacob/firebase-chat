import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ProfileCardItem from "../ProfileCardItem";
import { Navigate } from "react-router";
import useChangePassword from "./useChangePassword";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/UI/Loader/Loader";
import Title from "@/components/UI/TItle/Title";

const SecurityTabItem = () => {
  const { user, loading } = useAuth();
  const [changedPassword, setChangedPassword] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Grid2 sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Title>Security</Title>
      <Grid2 sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <ProfileCardItem title="Password">
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              We recommend that you periodically update your password to increase account security.
            </Typography>
            <Button
              onClick={() => setChangedPassword(!changedPassword)}
              sx={{ alignSelf: "flex-start" }}
              variant="contained"
              color={changedPassword ? "error" : "primary"}
            >
              {changedPassword ? "Cancel" : "Change password"}
            </Button>
            {changedPassword && <ChangePasswordModal />}
          </Grid2>
        </ProfileCardItem>
        <ProfileCardItem title="Authenticator">
          <Grid2 sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>Status: {user.emailVerified ? "Enabled" : "Disabled"}</Typography>
            <Button sx={{ alignSelf: "flex-start" }} variant="contained" color="primary">
              enable Authenticator
            </Button>
          </Grid2>
        </ProfileCardItem>
      </Grid2>
    </Grid2>
  );
};

const ChangePasswordModal = () => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isUpdating,
  } = useChangePassword();

  return (
    <Box sx={{ alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <TextField
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        type="password"
        size="small"
        label="Current password"
        sx={{ width: "260px" }}
      />

      <TextField
        slotProps={{ htmlInput: { minLength: 6 } }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        size="small"
        label="New password"
      />
      <TextField
        slotProps={{ htmlInput: { minLength: 6 } }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        size="small"
        label="Repeat the new password"
      />
      <Button disabled={isUpdating} onClick={handleUpdatePassword} variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default SecurityTabItem;
