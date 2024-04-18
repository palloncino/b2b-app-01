import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../state/authContext";
import { useThemeContext } from "../../state/themeContext";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Navbar() {
  const { user, logout } = useAuthContext();
  const { toggleTheme, themeMode } = useThemeContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/user-management");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  const renderVisitorLinks = () => (
    <>
      <Button color="inherit" component={RouterLink} to="/login">Login</Button>
      <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
    </>
  );

  const renderUserLinks = () => (
    <>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Avatar sx={{ width: 36, height: 36 }}>
          {user ? user.username.charAt(0) : ""}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>View Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
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
            HOME
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
