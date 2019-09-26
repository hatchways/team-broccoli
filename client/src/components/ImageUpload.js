import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Container, Grid } from '@material-ui/pickers';
import { Typography, Paper } from '@material-ui/core';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  //flexWrap: 'wrap',
  marginTop: 16,
  border: '1px solid #eaeaea',

};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  // width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  //overflow: 'hidden'
};

const img = {
  display: 'inline-block',
  // width: 'auto',
  verticalAlign: 'top',
  height: '100%'
};


export default function ImageUpload(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (

    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <p align={"center"}>
        <img
          src={file.preview}
          style={img}
          />
        Click the image to preview it. Or drag another image below to replace it.</p>

      </div>
    </div>

  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <Paper backgroundColor="black">
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div {...getRootProps({className: 'dropzone'})} style={{ padding:"5em"}}>
        <input {...getInputProps()} />
        <Typography variant = "colorTextSecondary" padding={2}>
          Drag and drop your image here, or click to select one
        </Typography>
      </div>

      </Paper>
    </section>
  );
}