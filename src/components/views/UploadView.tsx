import React from 'react';
import {useDropzone} from 'react-dropzone';
import App from '../App';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NetworkPolicyView from './NetworkPolicyView';

export default function UploadView() {
  const yamlFiles: Array<string | ArrayBuffer> = [];
  const [responseArray, setArray] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [showLoading, setLoading] = React.useState(false);
  const onDrop = React.useCallback(acceptedFiles => {
    setLoading(true);
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
      .catch(error => {console.log('POST ERROR: ' + error)});
  }

  return (  
    loaded ? 
    <div>
      <Router>
      <NavBar></NavBar>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <App 
            jsonFiles={responseArray}
            />
          </Route>
          <Route exact path="/networkPolicy">
            <NetworkPolicyView 
            jsonFiles={responseArray}
            />
          </Route>
        </Switch>
      </div>
      </Router>
    </div>
    :
    !showLoading ?
    <div className="inputView">
    <img src="https://i.ibb.co/CVcHh4G/unnamed.png"></img>
      <div className="inputContainer" {...getRootProps()}>
        <input {...getInputProps()} />
        {
          //some logo here
            <div style={styles.container}>
            <p className="uploadButton" >Click here to upload your YAML config files!</p>
            </div>
        }
      </div>
    </div>
    :
    <div className="inputContainer">
      <div className="text">Loading...</div>
        <div className="animation">
          <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div>
      </div>
    </div>

  );
}

const styles = {
  container: {
    width: '120%'
  }
}