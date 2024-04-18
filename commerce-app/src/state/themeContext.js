import React, { createContext, useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
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

  // Define custom colors for light and dark themes with a more exotic touch for the light theme
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#26a69a" : "#90caf9", // A vibrant teal for light, calm blue for dark
        light: mode === "light" ? "#64d8cb" : "#e3f2fd", // Lighter teal
        dark: mode === "light" ? "#00796b" : "#42a5f5",  // Darker teal
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      secondary: {
        main: mode === "light" ? "#ff8f00" : "#f48fb1", // Bright amber for light, soft pink for dark
        light: mode === "light" ? "#ffc046" : "#f8bbd0", // Light amber
        dark: mode === "light" ? "#c56000" : "#c2185b",  // Dark amber
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      error: {
        main: mode === "light" ? "#d32f2f" : "#ef9a9a",
      },
      warning: {
        main: mode === "light" ? "#ffa726" : "#ffb74d",
      },
      info: {
        main: mode === "light" ? "#29b6f6" : "#81d4fa",
      },
      success: {
        main: mode === "light" ? "#66bb6a" : "#81c784",
      },
      background: {
        default: mode === "light" ? "#fffde7" : "#121212", // Light yellow background for light theme
        paper: mode === "light" ? "#fff8e1" : "#242424",
      },
      text: {
        primary: mode === "light" ? "#004d40" : "#ffffff", // Dark teal text for light theme
        secondary: mode === "light" ? "#00695c" : "#bcbcbc",
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
