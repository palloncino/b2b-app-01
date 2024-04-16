import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";

function EditProduct({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);
  const fileInputRef = useRef(); // Reference to the hidden file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setEditedProduct({ ...editedProduct, imgUrl: e.target.result });
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  // Function to trigger the hidden file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          width: 250,
          height: "auto",
          margin: 2,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={triggerFileInput}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            "&:hover": { opacity: 0.7 }, // Dim the image on hover
          }}
          image={editedProduct.imgUrl}
          alt="Product Image"
        />
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={editedProduct.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => onSave(editedProduct)}
              sx={{ mr: 2 }}
            >
              Save Changes
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EditProduct;
