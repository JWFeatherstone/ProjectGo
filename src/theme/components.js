export const components = (palette) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "unset",
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent",
      },
    },
  },
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },
});