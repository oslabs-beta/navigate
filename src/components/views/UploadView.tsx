import React from 'react';
import {useDropzone} from 'react-dropzone';

export default function UploadView() {
  const onDrop = React.useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
    // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log(JSON.stringify(binaryStr));
    }
    acceptedFiles.forEach((file: File) =>{
      reader.readAsText(file);
    })

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
          <div>
            //some logo here
          <p>Click here to upload your YAML config files and begin using Navigate...</p>
          </div>
      }
    </div>
  );
}