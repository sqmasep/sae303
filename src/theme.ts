import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#033",
  //   },
  // },
  palette: {
    mode: "light",
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
