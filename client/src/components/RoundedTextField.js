import React from "react";
import { TextField, OutlinedInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTextField = withStyles({
  notchedOutline: { borderRadius: "2em" },
  input: { marginLeft: "1em" }
})(OutlinedInput);

export default function RoundedTextField(props) {
  return (
    <StyledTextField fullWidth variant="outlined" {...props}></StyledTextField>
  );
}
