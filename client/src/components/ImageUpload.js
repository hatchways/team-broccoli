import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

// TODO: move function to api file
async function get_presigned_post(filename, filetype) {

  const token = localStorage.getItem("access_token")
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
    } else {
    return response.json()};
  }).then(body => {
    return(body)
  })//.catch((err) => {return err})
}

export var ImageUpload = ({imageUrlHandler}) => {

  const getUploadParams = async ({ meta: { name, type } }) => {
    const { data, fileUrl } = await get_presigned_post(name, type)
      .catch(err => {
        "return null to let react-dropzone-uploader handle the error"
        console.log(err)
        return {
          data: {fields: null, url: null},
          fileUrl: null,
        }
      })

    console.log(data)
    console.log( {
      fields: data['fields'],
      meta: { fileUrl },
      url: data['url'],
    })
    return {
      fields: data['fields'],
      meta: { fileUrl },
      url: data['url']
    }
  }

  const handleChangeStatus = ({ meta }, status) => {
    if (status == "error_upload_params" | "exception_upload" | "error_upload") {
      console.log('error! ' + status)
    }
    if (status == "headers_received" | "done") {
      imageUrlHandler(meta.fileUrl)
    }
  }


  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      styles={{
        dropzone: {
          minHeight: 200,
          maxHeight: 250,
        }
      }}
    />
  )
}
