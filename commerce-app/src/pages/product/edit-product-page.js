import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditProduct from "../../components/EditProduct/index.js";
import FlashMessage from "../../components/FlashMessage/index.js";
import Loading from "../../components/Loading/index.js";
import { useAppState } from "../../state/stateContext.js";

function EditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, editProduct, editProductIsLoading, getProductsIsLoading, getProducts } = useAppState();
  const [theProduct, setTheProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    const _product = products.find(({ id }) => id.toString() === productId);
    setTheProduct(_product);
  }, [productId, products]);

  if (!theProduct) {
    if (getProductsIsLoading || editProductIsLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <Box my={2}>
          <FlashMessage
            message={`The product with ID: ${productId} could not be found.`}
            type="error"
          />
        </Box>
        <Button component={MuiLink} to="/product-archive">
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleSave = async (editedProduct) => {
    editedProduct.dateLastUpdate = new Date().toISOString();
    try {
      const data = await editProduct(editedProduct);
      setMessage(`Edited successfully item ${data.name}, ID: ${data.id}`);
    } catch (error) {
      console.error({ error });
      setErrorMessage(`Failed to edit product: ${error.message}`);
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <Container maxWidth="lg">
      {errorMessage && (
        <Box my={2}>
          <FlashMessage message={errorMessage} type="error" />
        </Box>
      )}
      {message && (
        <Box my={2}>
          <FlashMessage message={message} type="success" />
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Editing Product
      </Typography>
      <Typography component="p">
        {theProduct.name}, ID: {theProduct.id}.{" "}
        <Link to={`/product/${theProduct.id}`}>View product.</Link>
      </Typography>
      <EditProduct
        product={theProduct}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Container>
  );
}

export default EditProductPage;
