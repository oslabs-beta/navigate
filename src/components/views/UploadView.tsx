import React from 'react';
import {useDropzone} from 'react-dropzone';
import App from '../App';

export default function UploadView() {
  const yamlFiles: Array<string | ArrayBuffer> = [];
  const [responseArray, setArray] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
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
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop, multiple: true});

  function postUpload(upload: Array<string | ArrayBuffer>) {
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upload)
    })
      .then(response => response.json())
      .then(data => {
        setArray(data);
        //show App, pass the data down as props
        setLoaded(true);
      })
      .catch(error => console.log('POST ERROR: ' + error));
  }

  return (  
    loaded ? 
    <App jsonFiles={responseArray}/> :
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