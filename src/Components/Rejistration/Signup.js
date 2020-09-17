import React from 'react';
import axios from 'axios';
import {UrlSignup} from"../Rejistration/Urls"


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

    doSignup = (e) => {
        const {username, password,useremail,onLogin} = this.state
        if(this.isEmail(useremail) ) {
            // const UrlSignup = "http://localhost:5000/signup";
            //const UrlSignup = "/signup";

            const data = {
                username:username,
                password:password,
                useremail:useremail,
            }
            axios.post(UrlSignup, data)
                .then((res) => {
                    onLogin({isLoggedIn: false, userId: res.data.userId ,username:res.data.username})
                    if (res.status === 200) {
                        this.setState({
                            username: username,
                            password: password,
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
        return (
                <div>
                    <div className="container">
                        <br/>
                    <h2 >signup  </h2>
                    <br/>
                    <p>name:<input type="text" onChange={this.SaveUsername} placeholder={"Enter name"} required></input><br/></p>
                    <p>email:<input type="email" onChange={this.SaveEmail}placeholder = "Enter a valid Email" required></input><br/></p>
                    <p>pass:<input type="password" onChange={this.SavePassword}placeholder="Enter Password" required></input><br/></p>
                <br/>
                    <button onClick={this.doSignup}>send</button><br/>
                    </div>
                </div>
        );
    }
}