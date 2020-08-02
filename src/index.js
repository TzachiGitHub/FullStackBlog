import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./Components/Stylies/index.css"
import GoogleLogin from "./Components/Rejistration/LoginGoogle";
const responseGoogle = (response) => {
    console.log(response);
}
ReactDOM.render(
    <App />,
  document.getElementById('root')
    // <

    //
    // document.getElementById('googleButton')

);

