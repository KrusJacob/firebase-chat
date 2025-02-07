import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import Title from "../../UI/TItle/Title";
import ProfileCardItem from "../ProfileCardItem";
import Loader from "../../UI/Loader/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../../firebase";

const SecurityTabItem = () => {
  const { user, loading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const checkPassword = async () => {
    const isAuthenticated = await reauthenticateUser(currentPassword);
    if (!isAuthenticated) {
      return false;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return false;
    }
    return true;
  };

  const reauthenticateUser = async (currentPassword: string) => {
    const user = auth.currentUser;

    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error("Error reauthenticating user:", error);
        alert("Failed to reauthenticate. Please check your current password.");
        return false;
      }
    }
    return false;
  };

  const handleUpdatePassword = async () => {
    const isError = await checkPassword();
    if (isError) {
      setIsUpdating(true);
      try {
        await updatePassword(user, newPassword);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      } finally {
        setIsUpdating(false);
        resetPassword();
      }
    }
  };

  const resetPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

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
              onClick={() => {
                setChangedPassword(!changedPassword);
                resetPassword();
              }}
              sx={{ alignSelf: "flex-start" }}
              variant="contained"
              color={changedPassword ? "error" : "primary"}
            >
              {changedPassword ? "Cancel" : "Change password"}
            </Button>
            {changedPassword && (
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
            )}
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

export default SecurityTabItem;
