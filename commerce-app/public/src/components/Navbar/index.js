import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../state/themeContext.js";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  const { toggleTheme, themeMode } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            BUSINESS LOGO
          </Button>
        </Typography>
        <Button color="inherit" component={RouterLink} to="/user-management">
          User Management
        </Button>
        <Button color="inherit" component={RouterLink} to="/client-management">
          Client Management
        </Button>
        <Button color="inherit" component={RouterLink} to="/create-preventive">
          Create Preventive
        </Button>
        <Button color="inherit" component={RouterLink} to="/preventive-archive">
          Preventive Archive
        </Button>
        <Button color="inherit" component={RouterLink} to="/product-archive">
          Product Archive
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
        {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
