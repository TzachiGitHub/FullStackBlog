import React from 'react';
import axios from 'axios';
import Login from "./Login";
import LoginGoogle from "./LoginGoogle";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLogin:this.props.onLogin,
            username: null,
            password: null,
            userId:null,
            useremail:null,
            useGoogle:false,
        };
        console.log("this, state from signup ==")
        console.log(this.state)
    }

    SaveUsername = (e) => {
        this.setState({
            username: e.target.value,
            useGoogle:false,
        });
    }

    SavePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }
    SaveEmail = (e) => {

            this.setState({
                useremail: e.target.value,
            })

    }

     isEmail = (str) => {
        const re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(str);
    }
    doSignupOrLoginGoogle = (res) =>{
        alert("abc")
        console.log("res ==" + res)
        console.log("res.useGoogle ==" + res.useGoogle)
        console.log("res.username ==" + res.username)
        console.log("res.useremail ==" + res.useremail)

            this.setState({
                useGoogle:res.useGoogle,
                isLoggedIn: res.isLoggedIn,
                userId: res.userId,
                username:res.username,
                useremail:res.useremail,
                password:res.userId,

            });
        this.doSignup(this.state);

        console.log("this state from sugnup ==")
        console.log(this.state)
     }

    doSignup = (e) => {
        if(this.isEmail(this.state.useremail) || this.state.useGoogle) {
            console.log("this.state.useGoogle==" + this.state.useGoogle)
            const Url = "http://localhost:5000/signup";
            //const Url = "/signup";
            const data = {
                username: this.state.username,
                password: this.state.password,
                useremail:this.state.useremail,
            }
            axios.post(Url, data)
                .then((res) => {
                    !this.state.useGoogle && this.props.onLogin({isLoggedIn: true, userId: res.data.userId ,username:res.data.username})
                    if (res.status === 200) {
                        this.setState({
                            username: this.state.username,
                            password: this.state.password,
                        });
                        alert("Success: user signup.")
                        this.props.history.push('/login')
                    }
                })
                .catch((err) => {
                    alert("Error: a username with that name exists already - try logging in or change username.")
                });
        }else{
            alert("Please enter a valid email")
        }

    }
    render() {
        const {onLogin} = this.state
        return (
                <div>
                    <div>
                    <h2>signup</h2>
                    name: <input type="text" onChange={this.SaveUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this. SavePassword} placeholder="Enter Password" required></input><br/>
                    email: <input type="email" onChange={this. SaveEmail} placeholder = "Enter a valid Email" required></input><br/>
                    <button onClick={this.doSignup}>send</button><br/>
                    </div>
                    <div>
                        <LoginGoogle doSignupOrLoginGoogle={this.doSignupOrLoginGoogle} onLogin={onLogin} />
                    </div>
                </div>
        );
    }
}