import { Container } from "@mui/material";
import React, { useEffect } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/login-page.js";
import Signup from "./pages/auth/signup-page.js";
import Dashboard from "./pages/dashboard-page.js";
import CreateProduct from "./pages/product/create-product-page.js";
import EditProduct from "./pages/product/edit-product-page.js";
import ProductListPage from "./pages/product/product-list-page.js";
import ProductPage from "./pages/product/product-page.js";
import UserManagement from "./pages/user/user-management-page.js";
import { AuthProvider, useAuth } from "./state/authContext.js";
import { AppStateProvider } from "./state/stateContext.js";
import { ThemeProvider } from "./state/themeContext.js";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (!allowedRoles.includes(user.role)) {
      navigate("/", { replace: true });
    }
  }, [user, navigate, allowedRoles]);

  return user && allowedRoles.includes(user.role) ? <Outlet /> : null;
};

function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <ThemeProvider>
          <Router>
            <Navbar />
            <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Dashboard />} />

                {/* Routes accessible by both customers and admins */}
                <Route
                  element={
                    <ProtectedRoute allowedRoles={["customer", "admin"]} />
                  }
                >
                  <Route
                    path="/product-archive"
                    element={<ProductListPage />}
                  />
                  <Route path="/product/:productId" element={<ProductPage />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/user-management" element={<UserManagement />} />
                  <Route path="/create-product" element={<CreateProduct />} />
                  <Route
                    path="/edit-product/:productId"
                    element={<EditProduct />}
                  />
                </Route>
              </Routes>
            </Container>
          </Router>
        </ThemeProvider>
      </AppStateProvider>
    </AuthProvider>
  );
}

export default App;
