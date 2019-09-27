import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, Paper } from "@material-ui/core";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  marginTop: 16,
  border: "1px solid #eaeaea"
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  height: 200,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0
};

const img = {
  display: "inline-block",
  verticalAlign: "top",
  height: "100%"
};

export default function ImageUpload(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <p align={"center"}>
          <img src={file.preview} style={img} />
        </p>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <Paper>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{ padding: "5em" }}
        >
          <input {...getInputProps()} inputVariant="outlined" />
          <Typography
            variant="h6"
            align="center"
            padding={2}
            style={{ color: "#a5a5a5", fontWeight: "400" }}
          >
            Drag and drop your image here, or click to select one
          </Typography>
        </div>
      </Paper>
    </section>
  );
}
