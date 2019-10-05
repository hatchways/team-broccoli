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


// TODO: move function to api file
async function get_presigned_post(filename, filetype) {

  // TODO: change to appropriate values
  const token = "" // Token from login to get the presigned post headers
  var url = new URL("http://127.0.0.1:5000/sign_s3")

  const params = {
    file_name: filename,
    file_type: filetype,
  }
  url.search = new URLSearchParams(params)

  return fetch(url , {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
    return response.json();
  }).then(body => {
    return(body)
  })
}

async function upload_to_s3(file) {
  const presigned_post = await file.presigned_post
  const fields = presigned_post.data.fields
  console.log(presigned_post.data)

  let formData = new FormData();
  Object.keys(fields).forEach(key => {
    formData.append(key, fields[key])
  })

  formData.append('file', file)

  return fetch(presigned_post.data.url, {
    body: formData,
    method: 'POST',
  })
    .then(response => {
      if (!response.ok) {
        // TODO: handle errors from react's side
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return presigned_post.url;
    })
}

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
      acceptedFiles.map(file => {
        const presigned_post = get_presigned_post(file.name,file.type);
        Object.assign(file, {
          presigned_post,
        })
        upload_to_s3(file)
      });
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
