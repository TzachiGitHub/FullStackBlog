import React from "react";
import axios from "axios";
import {GoogleLogin} from 'react-google-login';
export default class LoginGoogle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: null,
            username:null,
            useremail:null,
            usercheck:false,
            password:null,
            props:this.props,
            onLogin:this.props.onLogin,
        };


    }
    responsGoogle = (res) =>{
        this.setState({
            password: res.googleId,
            username:res.profileObj.name,
            useremail:res.profileObj.email,
        })
        this.userExists(this.state.useremail)
    }

    userExists = (useremail) =>{
       const Url = "http://localhost:5000/usercheck/" + useremail ;
       // const Url = "/usercheck/" + useremail ;
        axios.get(Url)
            .then((res) => {
                if (res.status === 200) {
                   this.doLoginGoogle(this.state)
                }
            })
            .catch((err) => {
                this.doSignupGoogle(this.state)
            });
    }

        doLoginGoogle = (e) => {
        const {onLogin,username,useremail} = this.state
        const data = {
            username: e.username,
            password: e.password,
            useremail: e.useremail,
        }
        const Url = "http://localhost:5000/logingoogle";
        //const Url = "/logingoogle";

        axios.post(Url, data)
            .then((res) => {
                onLogin({isLoggedIn: true, userId: res.data.userId,username:username,useremail:useremail})
                if (res.status === 200) {
                    alert("Success: user logged in.")
                    this.props.props.history.push('/')
                }
            })
            .catch((err) => {
                alert(err)
                 alert("Error: failed to login user try to signup.")
            });

    }

    doSignupGoogle = (e) => {
        const {username,password,useremail,onLogin} = this.state
        const Url = "http://localhost:5000/signupgoogle";
        //const Url = "/signupgoogle";
        const data = {
            username: username,
            password: password,
            useremail:useremail,
        }
        axios.post(Url, data)
            .then((res) => {
                if (res.status === 200) {
                    onLogin({isLoggedIn: true, userId: res.data.userId,username:username,useremail:useremail})
                    this.setState({
                        username: username,
                        password: password,
                    });
                    alert("Success: user logged in.")
                    this.props.props.history.push('/')
                }
            })
            .catch((err) => {
                alert("Error: a username with that name exists already .")
            });
    }


    render() {
        return(
            <div>
                <GoogleLogin
                    clientId="522925501243-hn2hgcnr9484lg2pmggi2ra5tet4sjc0.apps.googleusercontent.com"
                     buttonText="Login"
                    onSuccess={this.responsGoogle}
                    onFailure={this.responsGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
                document.getElementById('googleButton')

    }

}






































































































































































































































































































