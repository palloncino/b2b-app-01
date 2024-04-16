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

  // Define custom colors for light and dark themes
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
        light: mode === "light" ? "#42a5f5" : "#e3f2fd",
        dark: mode === "light" ? "#1565c0" : "#42a5f5",
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      secondary: {
        main: mode === "light" ? "#9c27b0" : "#f48fb1",
        light: mode === "light" ? "#ba68c8" : "#f8bbd0",
        dark: mode === "light" ? "#7b1fa2" : "#c2185b",
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      error: {
        main: mode === "light" ? "#d32f2f" : "#ef9a9a",
      },
      warning: {
        main: mode === "light" ? "#ed6c02" : "#ffa726",
      },
      info: {
        main: mode === "light" ? "#0288d1" : "#81d4fa",
      },
      success: {
        main: mode === "light" ? "#2e7d32" : "#81c784",
      },
      background: {
        default: mode === "light" ? "#f0f2f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#242424",
      },
      text: {
        primary: mode === "light" ? "#2e2e2e" : "#ffffff",
        secondary: mode === "light" ? "#757575" : "#bcbcbc",
      },
      action: {
        active: mode === "light" ? "#6d6d6d" : "#ffffff",
        hover: mode === "light" ? "#f5f5f5" : "#383838",
        selected: mode === "light" ? "#ececec" : "#2d2d2d",
        disabled: mode === "light" ? "#e0e0e0" : "#424242",
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
