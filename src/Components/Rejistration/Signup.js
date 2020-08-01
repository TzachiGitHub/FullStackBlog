import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            userId:null,
            useremail:null,
        };
    }

    SaveUsername = (e) => {
        this.setState({
            username: e.target.value,
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
        if(this.isEmail(this.state.useremail)) {
            const Url = "http://localhost:5000/signup";
            //const Url = "/signup";
            const data = {
                username: this.state.username,
                password: this.state.password,
                useremail:this.state.useremail,
            }
            axios.post(Url, data)
                .then((res) => {
                    this.props.onLogin({isLoggedIn: true, userId: res.data.userId ,username:res.data.username})
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
        return (
                <div>
                    <h2>signup</h2>
                    name: <input type="text" onChange={this.SaveUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this. SavePassword} placeholder="Enter Password" required></input><br/>
                    email: <input type="email" onChange={this. SaveEmail} placeholder = "Enter a valid Email" required></input><br/>
                    <button onClick={this.doSignup}>send</button><br/>
                </div>
        );
    }
}