/*
    ./client/index.js
    webpack entry file
*/
import './style/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';



ReactDOM.render(<App />, document.getElementById('root'));
