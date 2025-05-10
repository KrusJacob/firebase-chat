import { Grid2, Typography, TextField, Button } from "@mui/material";
import React from "react";
import ProfileCardItem from "../ProfileCardItem";
import { Navigate } from "react-router";
import { format } from "date-fns";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/UI/Loader/Loader";
import Title from "@/components/UI/TItle/Title";
import { toast } from "react-toastify";

const DetailsTabItem = () => {
  const { user, loading } = useAuth();
  const [displayName, setDisplayName] = React.useState(user?.displayName || user?.email);
  const [isUpdating, setIsUpdating] = React.useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleUpdateName = async () => {
    const confirmed = window.confirm("Are you sure you want to change your name?");
    if (user && confirmed) {
      setIsUpdating(true);
      try {
        await toast.promise(updateProfile(user, { displayName }), {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Failed to update profile",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <Grid2 sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Title>Details</Title>
      <Grid2 sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ProfileCardItem title="Your data">
          <Grid2 sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
            <TextField
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              label="Name"
              size="small"
            />
            <TextField type="tel" label="Phone" size="small" defaultValue={user.phoneNumber} />

            <Button disabled={isUpdating} onClick={handleUpdateName} variant="contained">
              Save changes
            </Button>
          </Grid2>
        </ProfileCardItem>
        <ProfileCardItem title="Other info">
          <Grid2>
            {user.metadata.creationTime && (
              <Typography fontSize={16}>
                Registration date: {format(user.metadata.creationTime, "dd.MM.yyyy")}
              </Typography>
            )}
            {user.metadata.lastSignInTime && (
              <Typography fontSize={16}>
                Last signIn: {format(user.metadata.lastSignInTime, "dd.MM.yyyy")}
              </Typography>
            )}
          </Grid2>
        </ProfileCardItem>
      </Grid2>
    </Grid2>
  );
};

export default DetailsTabItem;
