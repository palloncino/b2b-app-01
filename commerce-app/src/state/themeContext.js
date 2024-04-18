import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Define custom colors for a classic black and white theme with an accent color
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#000000" : "#ffffff", // Black for light, white for dark
        light: "#555555", // Light gray for hover states in light mode
        dark: "#000000", // Black for dark mode
        contrastText: mode === "light" ? "#ffffff" : "#000000",
      },
      secondary: {
        main: mode === "light" ? "#8aacc8" : "#607d8b", // Blue-grey for a subtle accent
        light: "#cfd8dc", // Lighter blue-grey
        dark: "#455a64", // Darker blue-grey
        contrastText: mode === "light" ? "#ffffff" : "#ffffff",
      },
      error: {
        main: "#d32f2f",
      },
      warning: {
        main: "#ffa726",
      },
      info: {
        main: "#2979ff",
      },
      success: {
        main: "#2e7d32",
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#303030", // White background for light, dark grey for dark
        paper: mode === "light" ? "#fafafa" : "#424242",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff", // Black text on light, white text on dark
        secondary: mode === "light" ? "#757575" : "#bcbcbc",
      },
      action: {
        active: mode === "light" ? "#000000" : "#ffffff",
        hover: mode === "light" ? "#f5f5f5" : "#383838",
        selected: mode === "light" ? "#e0e0e0" : "#4f4f4f",
        disabled: mode === "light" ? "#f5f5f5" : "#424242",
        disabledBackground: mode === "light" ? "#f9f9f9" : "#616161",
      },
    },
  });

  const theme = createTheme(getDesignTokens(themeMode));

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};