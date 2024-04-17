import React from "react";
import { useAuthContext } from "../state/authContext";
import { Box, Card, CardActionArea, CardContent, Grid, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group'; // Icon for User Management
import ListAltIcon from '@mui/icons-material/ListAlt'; // Icon for Product Listing

function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome to Your Dashboard</Typography>
      <Typography variant="subtitle1">
        Hello, <strong>{user ? user.username : "Guest"}</strong>! You have <strong>{user ? user.role : "N/A"}</strong> access.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleNavigation('/user-management')}>
              <CardMedia>
                <GroupIcon style={{ fontSize: 60, color: '#1976d2', margin: '20px' }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  User Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage user accounts including roles, permissions, and more.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleNavigation('/product-archive')}>
              <CardMedia>
                <ListAltIcon style={{ fontSize: 60, color: '#1976d2', margin: '20px' }} />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Product Listing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage product inventory including prices, descriptions, and more.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
