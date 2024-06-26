import { Container, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import FilterBar from "../../components/FilterBar/index.js";
import FlashMessage from "../../components/FlashMessage/index.js";
import Loading from "../../components/Loading/index.js";
import ProductList from "../../components/ProductList/index.js";
import { PRODUCTS_FILTERS_CONFIG } from "../../constants/index.js";
import { useAppState } from "../../state/stateContext.js";
import applyFilters from "../../utils/apply-filters.js";

function ProductListPage() {
  const { products, deleteProducts, getProducts, loadingProducts } = useAppState();
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts])

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleDeleteProducts = async (id) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete? Click 'OK' to continue or 'Cancel' to abort."
      );

      if (userConfirmed) {
        const response = await deleteProducts([id]);
        const { message } = response;
        setSuccessMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = useMemo(() => {
    return loadingProducts || products.length === 0
      ? []
      : applyFilters(products, filters);
  }, [loadingProducts, products, filters]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {successMessage && (
        <FlashMessage message={successMessage} type="success" />
      )}
      {loadingProducts ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>

          
          
          <Grid item xs={12}>
            <FilterBar
              filtersConfig={PRODUCTS_FILTERS_CONFIG}
              caseSensitive={false}
              onFilterChange={handleFilterChange}
            />
            <ProductList
              products={filteredItems}
              handleDeleteProducts={handleDeleteProducts}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ProductListPage;
