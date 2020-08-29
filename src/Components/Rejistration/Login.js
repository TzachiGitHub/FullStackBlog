import React from 'react';
import axios from 'axios';
import '../Stylies/App.css';
import LoginGoogle from "./LoginGoogle";
import FacebookLogin from 'react-facebook-login';
import LoginFacebook from "./LoginFacebook";


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLogin:this.props.onLogin,
            username: null,
            password: null,
            props:this.props,
        }
    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }



    doLogin = (e) => {
        const {username, password,onLogin,useremail,props} = this.state
        const data = {
            username:username,
            password:password,
        }

         const Url = "http://localhost:5000/login";
       // const Url = "/login";

        axios.post(Url, data)
            .then((res) => {
                onLogin({isLoggedIn: true, userId: res.data.userId ,username:username, useremail:useremail,useGoogle:false})
                if (res.status === 200) {
                    this.setState({
                        username:username,
                        password:password,
                    })
                    alert("Success: user logged in.")
                    props.history.push('/')
                }
            })
            .catch((err) => {
                alert("Error: failed to login user try to signup.")
            });
    }


    render(){
        const {props,onLogin} = this.state
        return (
            <div className="container">
                <h2 style={{backgroundColor: "lightblue"}}>Login</h2>
                <div>
                    username: <input type="text" onChange={this.changeUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this.changePassword} placeholder="Enter Password" required ></input><br/>
                    <button onClick={this.doLogin}>send</button><br/>
                    {/*{this.state.resp?this.state.resp:null}*/}
                </div>
                <div>
                    <LoginGoogle props={props} onLogin={onLogin}  />
                </div>
                {/*<div>*/}
                {/*    <LoginFacebook props={props} onLogin={onLogin}  />*/}
                {/*</div>*/}
            </div>
        );
    }
}

