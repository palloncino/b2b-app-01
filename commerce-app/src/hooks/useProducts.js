// hooks/useProducts.js
import { useState, useCallback } from "react";
import { request } from "../utils/request"; // Ensure this path is correctly set

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // getProducts
  const [getProductsIsLoading, setGetProductsIsLoading] = useState(false);
  const [getProductsError, setGetProcutsError] = useState(null);

  // addProduct
  const [addProductIsLoading, setAddProductIsLoading] = useState(false);
  const [addProductError, setAddProcutError] = useState(null);

  // editProduct
  const [editProductIsLoading, setEditProductIsLoading] = useState(false);
  const [editProductError, setEditProcutError] = useState(null);

  // editProduct
  const [deleteProductIsLoading, setDeleteProductIsLoading] = useState(false);
  const [deleteProductError, setDeleteProcutError] = useState(null);

  const getProducts = useCallback(async () => {
    setGetProductsIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/get-products`,
      });
      setProducts(data);
      setGetProcutsError(null);
    } catch (err) {
      setGetProcutsError(err);
    } finally {
      setGetProductsIsLoading(false);
    }
  }, []);

  const addProduct = async (newProduct) => {
    setAddProductIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/create-product`,
        method: "POST",
        body: newProduct,
      });
      // Optionally refresh the products list or add directly to state
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setAddProcutError(err);
    } finally {
      setAddProductIsLoading(false);
    }
  };

  const editProduct = async (editedProduct) => {
    setEditProductIsLoading(true);
    try {
      const data = await request({
        url: `${process.env.REACT_APP_API_URL}/products/edit-product`,
        method: "POST",
        body: editedProduct,
      });
      // Update the product in state or refetch products list
      setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      return data;
    } catch (err) {
      setEditProcutError(err);
    } finally {
      setEditProductIsLoading(false);
    }
  };

  const deleteProducts = async (productIds = []) => {
    setDeleteProductIsLoading(true);
    try {
      const response = await request({
        url: `${process.env.REACT_APP_API_URL}/products/delete-products`,
        method: "POST",
        body: { ids: productIds },
      });
      const deletedIds = response.ids;
      setProducts((prev) => prev.filter((p) => !deletedIds.includes(p.id)));
      return response;
    } catch (err) {
      setDeleteProcutError(err);
    } finally {
      setDeleteProductIsLoading(false);
    }
  };

  return {
    products,
    // getProducts
    getProducts,
    getProductsIsLoading,
    getProductsError,
    // addProduct
    addProduct,
    addProductIsLoading,
    addProductError,
    // editProduct
    editProduct,
    editProductIsLoading,
    editProductError,
    // deleteProducts
    deleteProducts,
    deleteProductIsLoading,
    deleteProductError,
  };
};
