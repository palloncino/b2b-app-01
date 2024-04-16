import React, { createContext, useContext } from "react";
import { useProducts } from "../hooks/useContextProducts.js";
import { usePreventives } from "../hooks/useContextPreventives.js";

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
  const {
    preventives,
    loadingPreventives,
    preventivesError,
    getPreventives,
  } = usePreventives();

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
    deleteProductError,
    /*
      Preventives
    */
    preventives,
    loadingPreventives,
    preventivesError,
    getPreventives,
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
