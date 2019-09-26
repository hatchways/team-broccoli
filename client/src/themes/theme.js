import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  overrides: {
    MuiFormLabel : {
      root: {
        color: "black",
        fontWeight: "700",
        fontFamily: '"Roboto"',
        fontSize: "1.2rem"
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
  },
  solidButton: {
    backgroundColor: "black",
    border: "1px solid rgb(202, 202, 202)",
    borderRadius: "20px",
    color: "white",
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "20px",
    marginBottom: "50px",
    width: "200px",
    cursor: "pointer"
  },
  opaqueButton: {
    backgroundColor: "gray",
    border: "1px solid rgb(202, 202, 202)",
    borderRadius: "20px",
    color: "white",
    opacity: 0.7,
    padding: "10px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "70px",
    marginLeft: "400px",
    width: "200px",
    cursor: "pointer"
  }
});
