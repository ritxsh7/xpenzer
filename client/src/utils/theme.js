import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#83D3E2",
    },
  },
  typography: {
    fontFamily: ["Poppins"],
  },
});

theme = responsiveFontSizes(theme);

export { theme };
