import { Box, Button, Grid2, Typography } from "@mui/material";
import { deleteUser } from "firebase/auth";
import { Navigate } from "react-router";
import ProfileCardItem from "../ProfileCardItem";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/UI/Loader/Loader";
import Title from "@/components/UI/TItle/Title";
import { toast } from "react-toastify";

const SettingsTabItem = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  const handerDeleteUser = async () => {
    if (user) {
      try {
        const confirmed = window.confirm("Are you sure you want to delete your account?");
        if (!confirmed) return;
        await toast.promise(deleteUser(user), {
          pending: "Deleting user...",
          success: "User deleted successfully",
          error: "Failed to delete user",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Grid2 sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Title>Details</Title>
      <ProfileCardItem title="Settings">
        <Grid2 sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Once you delete a account there is no going back. Please be certain.</Typography>
          <Button sx={{ alignSelf: "flex-start" }} variant="contained" color="error" onClick={handerDeleteUser}>
            Delete account
          </Button>
        </Grid2>
      </ProfileCardItem>
    </Grid2>
  );
};

export default SettingsTabItem;
