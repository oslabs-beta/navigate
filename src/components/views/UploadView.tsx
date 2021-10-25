import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function UploadView() {
  const yamlFiles: Array<string | ArrayBuffer> = [];
  const onDrop = React.useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: File, index: Number, array: Array<File>) => {
      let isLastElement = false;
      const reader = new FileReader();

      //when last element is done, make a POST request
      isLastElement = (index === array.length - 1)
      
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const data = reader.result;
        if(data)
          yamlFiles.push(data);
        if(isLastElement)
        {
          postUpload(yamlFiles);
        }
      }
      reader.readAsText(file);
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop, multiple: true})

  function postUpload(upload: Array<string | ArrayBuffer>) {
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(upload)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log('POST ERROR: ' + error));
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        //some logo here
          <div>
          <p>Click here to upload your YAML config files and begin using Navigate...</p>
          </div>
      }
    </div>
  );
}