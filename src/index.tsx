import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
const styles = require('./scss/styles.scss');
import UploadView from './components/views/UploadView';
render (
  <UploadView />,
  document.getElementById('root')
);