import React from 'react';
import axios from 'axios';
import '../Stylies/App.css';
//resp dont work
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
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

    doLogin = (e) => {

        console.log(this.state.username)
        const data = {
            username:this.state.username,
            password:this.state.password,
        }
        const Url = "http://localhost:5000/login";
        //const Url = "/login";

        axios.post(Url, data)
            .then((res) => {
                console.log("res from login")
                console.log(res)
                this.props.onLogin({isLoggedIn: true, userId: res.data.userId ,username:this.state.username})
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
            </div>
        );
    }
}

