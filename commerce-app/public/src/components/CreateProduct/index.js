import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct({
  product,
  handleSubmit,
  handleChange,
  handleImageChange,
  fileInputRef,
}) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
            >
              <CardMedia
                component="img"
                image={product.imgUrl || "path/to/default/image"}
                alt="Product Image"
                sx={{
                  width: 250,
                  height: "auto",
                  margin: 2,
                  "&:hover": { opacity: 0.7 },
                }}
              />
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={product.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit} sx={{ mr: 2 }}>
              Create Product
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CreateProduct;
