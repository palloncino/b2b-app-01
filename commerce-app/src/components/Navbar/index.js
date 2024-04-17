import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../state/authContext.js";
import { useThemeContext } from "../../state/themeContext.js";

function Navbar() {
  const { user } = useAuthContext();
  const { toggleTheme, themeMode } = useThemeContext();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    // Navigate based on role
    if (user && user.role === "admin") {
      navigate("/user-management");
    } else {
      navigate("/profile");
    }
  };

  const renderVisitorLinks = () => (
    <>
      <Button color="inherit" component={RouterLink} to="/login">
        Login
      </Button>
      <Button color="inherit" component={RouterLink} to="/signup">
        Sign Up
      </Button>
    </>
  );

  const renderUserLinks = () => (
    <>
      <Button color="inherit" component={RouterLink} to="/product-archive">
        Product Archive
      </Button>
      <IconButton onClick={handleAvatarClick} color="inherit">
        <Avatar sx={{ width: 36, height: 36 }}>
          {user ? user.username.charAt(0) : ""}
        </Avatar>
      </IconButton>
    </>
  );

  const renderAdminLinks = () => (
    <>
      {renderUserLinks()}
      <Button color="inherit" component={RouterLink} to="/create-product">
        Create Product
      </Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            🏠 b2b-app-01
          </Button>
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!user && renderVisitorLinks()}
          {user && user.role === "customer" && renderUserLinks()}
          {user && user.role === "admin" && renderAdminLinks()}
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
