import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/index.js";
import Dashboard from "./pages/dashboard-page.js";
import CreateProduct from "./pages/product/create-product-page.js";
import ProductListPage from "./pages/product/product-list-page.js";
import ProductPage from "./pages/product/product-page.js";
import EditProduct from "./pages/product/edit-product-page.js";
import UserManagement from "./pages/user-management-page.js";
import { AppStateProvider } from "./state/stateContext.js";
import { ThemeProvider } from "./state/themeContext.js";
import { Container } from "@mui/material";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <ThemeProvider>
          <Navbar />
          <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/product-archive" element={<ProductListPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route
                path="/edit-product/:productId"
                element={<EditProduct />}
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </AppStateProvider>
  );
}

export default App;
