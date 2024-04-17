import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductView from "../../components/ProductView/index.js";
import Loading from "../../components/Loading/index.js";
import { useAppState } from "../../state/stateContext.js";

function ProductPage() {
  const { productId } = useParams();
  const { getProducts, getProductsIsLoading, products } = useAppState();
  const [theProduct, setTheProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const theProduct = products.find(({ id }) => id.toString() === productId);
    setTheProduct(theProduct);
  }, [productId, products]);

  if (!theProduct) {
    if (getProductsIsLoading) {
      return <Loading />;
    } else {
      return (
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            404 Product Not Found
          </Typography>
          <Typography variant="subtitle1">
            The product with ID: {productId} could not be found in our listing.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/product-archive"
          >
            Back to Products
          </Button>
        </Container>
      );
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {theProduct.name}
      </Typography>
      <Typography component="p">ID: {theProduct.id}</Typography>
      <Card sx={{ width: "100%", maxWidth: 1200 }}>
        <CardContent>
          <ProductView product={theProduct} />
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={handleCancel}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/edit-product/${productId}`}
          >
            Edit Product
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default ProductPage;
