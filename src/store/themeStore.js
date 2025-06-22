import { create } from "zustand";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4facfe",
      light: "#00f2fe",
      dark: "#11998e",
    },
    secondary: {
      main: "#667eea",
      light: "#764ba2",
      dark: "#5a3a7a",
    },
    background: {
      default: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      paper: "rgba(255, 255, 255, 0.08)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
    },
    success: {
      main: "#11998e",
      light: "#38ef7d",
    },
    warning: {
      main: "#fa709a",
      light: "#fee140",
    },
    error: {
      main: "#ff6b6b",
      light: "#ee5a24",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 15px 45px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          border: "none",
          color: "#ffffff",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
          },
        },
        outlined: {
          background: "transparent",
          border: "2px solid #4facfe",
          color: "#4facfe",
          "&:hover": {
            background: "rgba(79, 172, 254, 0.1)",
            border: "2px solid #00f2fe",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#ffffff",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4facfe",
      light: "#00f2fe",
      dark: "#11998e",
    },
    secondary: {
      main: "#667eea",
      light: "#764ba2",
      dark: "#5a3a7a",
    },
    background: {
      default: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      paper: "rgba(0, 0, 0, 0.2)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    success: {
      main: "#11998e",
      light: "#38ef7d",
    },
    warning: {
      main: "#fa709a",
      light: "#fee140",
    },
    error: {
      main: "#ff6b6b",
      light: "#ee5a24",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#ffffff",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 15px 45px rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          border: "none",
          color: "#ffffff",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
          },
        },
        outlined: {
          background: "transparent",
          border: "2px solid #4facfe",
          color: "#4facfe",
          "&:hover": {
            background: "rgba(79, 172, 254, 0.1)",
            border: "2px solid #00f2fe",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#ffffff",
        },
      },
    },
  },
});

export const themeStore = create((set) => ({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () =>
    set((state) => ({
      theme: state.isDarkMode ? lightTheme : darkTheme,
      isDarkMode: !state.isDarkMode,
    })),
}));
