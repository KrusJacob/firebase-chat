import { Box, Drawer, IconButton, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useState } from "react";

const navigateLinks = [
  { name: "Home", path: "/" },
  { name: "Chat", path: "/chat" },
];
const Navigation = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const drawer = (
    <Box
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: 250, py: 2, bgcolor: "#94ced8", height: "100%" }}
    >
      <List>
        {navigateLinks.map((link) => (
          <ListItem
            sx={{ cursor: "pointer", justifyContent: "center", ":hover": { bgcolor: "#ffffff" } }}
            component={"li"}
            key={link.name}
            onClick={() => navigate(link.path)}
          >
            <Typography fontSize={24}>{link.name}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }} display={"flex"} alignItems={"center"} gap={4}>
      <IconButton
        onClick={toggleDrawer(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      {navigateLinks.map((link) => (
        <Link
          sx={{ display: { xs: "none", md: "block", cursor: "pointer" } }}
          key={link.name}
          onClick={() => navigate(link.path)}
          color="inherit"
          fontSize={24}
          underline="none"
        >
          {link.name}
        </Link>
      ))}

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navigation;
