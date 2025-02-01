import { Avatar, Box, Container, Typography } from "@mui/material";

import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/UI/Loader/Loader";

const defaultUrlAvatar =
  "https://w7.pngwing.com/pngs/812/462/png-transparent-account-avatar-profile-user-avatars-icon.png";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(user);

  return (
    <Container>
      <Box marginTop={4} display={"flex"} alignItems={"center"} gap={2}>
        <Avatar sx={{ width: 80, height: 80 }} alt={String(user.email)} src={user.photoURL || defaultUrlAvatar} />
        <Typography fontSize={20}> {user.displayName || user.email}</Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;
