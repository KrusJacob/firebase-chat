import { Box } from "@mui/material";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/UI/Loader/Loader";
import ProfileNavigation from "../components/Profile/ProfileNavigation";
import ProfileTabItem from "../components/Profile/Tabs/ProfileTabItem";
import DetailsTabItem from "../components/Profile/Tabs/DetailsTabItem";
import SecurityTabItem from "../components/Profile/Tabs/SecurityTabItem";
import SettingsTabItem from "../components/Profile/Tabs/SettingsTabItem";

const tabs = [
  {
    name: "Profile",
    component: <ProfileTabItem />,
  },
  {
    name: "Details",
    component: <DetailsTabItem />,
  },
  {
    name: "Security",
    component: <SecurityTabItem />,
  },
  {
    name: "Settings",
    component: <SettingsTabItem />,
  },
];

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: "flex", mt: 4, gap: 4 }}>
      <ProfileNavigation tabs={tabs} />
    </Box>
  );
};

export default ProfilePage;
