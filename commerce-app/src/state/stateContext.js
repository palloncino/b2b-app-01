import React, { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts.js";

const AppStateContext = createContext();

export function useAppState() {
  return useContext(AppStateContext);
}

export const AppStateProvider = ({ children }) => {
  const {
    products,
    getProducts,
    getProductsIsLoading,
    getProductsError,
    addProduct,
    addProductIsLoading,
    addProductError,
    editProduct,
    editProductIsLoading,
    editProductError,
    deleteProducts,
    deleteProductIsLoading,
    deleteProductError,
  } = useProducts();

  const state = {
    /*
      Products
    */
    products,
    getProducts,
    getProductsIsLoading,
    getProductsError,
    addProduct,
    addProductIsLoading,
    addProductError,
    editProduct,
    editProductIsLoading,
    editProductError,
    deleteProducts,
    deleteProductIsLoading,
    deleteProductError
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
