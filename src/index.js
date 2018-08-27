import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getPixels } from './Firebase';
import './index.css';

const appRoot = document.getElementById('root');


getPixels().then((pixels) => {
  ReactDOM.render(<App pixels={ pixels }/>, appRoot);
});

ReactDOM.render(<div className="loading" />, appRoot);

registerServiceWorker();
