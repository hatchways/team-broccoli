import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: "#f04040",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6",
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
