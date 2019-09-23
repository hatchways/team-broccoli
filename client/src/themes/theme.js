import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiFormLabel : {
      root: {
        color: "black",
        fontWeight: "700"
      }
    }
  },
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: "#f04040",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6",
  formLabel: {
    color: "black"
  }
});
