import { Box, Avatar, Grid2, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { defaultUrlAvatar } from "../../../constant/defaultUserAvatar";
import { Navigate } from "react-router";
import Loader from "../../UI/Loader/Loader";
import Title from "../../UI/TItle/Title";
import ProfileCardItem from "../ProfileCardItem";

const ProfileTabItem = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Grid2 sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
      <Title>Profile</Title>
      <ProfileCardItem title="Your data">
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            sx={{ width: { xs: 80, sm: 140 }, height: { xs: 80, sm: 140 } }}
            alt={String(user.email)}
            src={user.photoURL || defaultUrlAvatar}
          />
          <Grid2 sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "0 20px" }}>
            <Typography sx={{ color: "#7c7c7c" }} fontSize={20}>
              Email
            </Typography>
            {user.email}
            <Typography sx={{ color: "#7c7c7c" }} fontSize={20}>
              Name
            </Typography>
            {user.displayName || user.email}
            <Typography sx={{ color: "#7c7c7c" }} fontSize={20}>
              Phone number
            </Typography>
            {user.phoneNumber}
          </Grid2>
        </Box>
      </ProfileCardItem>
    </Grid2>
  );
};

export default ProfileTabItem;
