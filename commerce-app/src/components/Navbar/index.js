import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box, Divider } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../state/themeContext.js';

function Navbar() {
  const { toggleTheme, themeMode } = useThemeContext();
  const navigate = useNavigate(); // Hook to handle navigation

  const handleAvatarClick = () => {
    navigate('/user-management');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            BUSINESS LOGO
          </Button>
        </Typography>
        <Button color="inherit" component={RouterLink} to="/product-archive">
          Product Archive
        </Button>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleAvatarClick} color="inherit">
            <Avatar sx={{ width: 36, height: 36 }} src="/broken-image.jpg" />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
