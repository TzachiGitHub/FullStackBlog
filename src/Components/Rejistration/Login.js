import React from 'react';
import axios from 'axios';
import '../Stylies/App.css';
import LoginGoogle from "./LoginGoogle";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLogin:null,
            username: null,
            password: null,
            useremail:null,
            // this.changeUsername = this.changeUsername.bind(this);
            // this.changePassword = this.changePassword.bind(this);
            // this.doLogin = this.doLogin.bind(this);
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

    doLoginGoogle = (e) => {
        console.log("eee ==" + e.username)

        const data = {
            username:e.username,
            password:e.password,
            useremail:e.useremail,
        }
        //const Url = "http://localhost:5000/logingoogle";
        const Url = "/logingoogle";

        axios.post(Url, data)
            .then((res) => {
                this.props.onLogin({isLoggedIn: true, userId: res.data.userId ,username:this.state.username,useremail:this.state.useremail,useGoogle:false})
                if (res.status === 200) {
                    this.setState({
                        username: this.state.username,
                        password: this.state.password,
                    });
                    alert("Success: user logged in.")
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                alert("Error: failed to login user try to signup.")
            });
    }


    doLogin = (e) => {

        console.log(this.state.username)
        const data = {
            username:this.state.username,
            password:this.state.password,
        }
       // const Url = "http://localhost:5000/login";
        const Url = "/login";

        axios.post(Url, data)
            .then((res) => {
                // console.log("res from login")
                // console.log(res)
                this.props.onLogin({isLoggedIn: true, userId: res.data.userId ,username:this.state.username,useremail:this.state.useremail,useGoogle:false})
                if (res.status === 200) {
                    this.setState({
                        username: this.state.username,
                        password: this.state.password,
                    });
                    alert("Success: user logged in.")
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                alert("Error: failed to login user try to signup.")
            });
    }


    render(){
        return (
            <div className="container">
                <h2>Login</h2>
                <div>
                    username: <input type="text" onChange={this.changeUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this.changePassword} placeholder="Enter Password" required ></input><br/>
                    <button onClick={this.doLogin}>send</button><br/>
                    {this.state.resp?this.state.resp:null}
                </div>
                {/*<div>*/}
                {/*    <LoginGoogle doLoginGoogle={this.doLoginGoogle}  />*/}
                {/*</div>*/}
            </div>
        );
    }
}

