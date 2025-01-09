import { Box, IconButton, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} display={"flex"} alignItems={"center"} gap={4}>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Link onClick={() => navigate("/")} color="inherit" fontSize={24} underline="none" href="#">
        Home
      </Link>
      <Link onClick={() => navigate("/chat")} color="inherit" fontSize={24} underline="none" href="#">
        Chat
      </Link>
    </Box>
  );
};

export default Navigation;
