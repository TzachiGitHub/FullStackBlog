import React from "react";
import {GoogleLogin,   useGoogleLogout} from 'react-google-login';
export default class LoginGoogle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            doSignupOrLoginGoogle:this.props.doSignupOrLoginGoogle,
         //   doLoginGoogle:this.props.doLoginGoogle,
            doLoginGoogle:this.props.doLoginGoogle,
            isLoggedIn: false,
            userId: null,
            username:null,
            useremail:null,
        };

    }


    responsGoogle = (res) =>{
        this.setState({
            isLoggedIn: true,
            userId: res.googleId,
            username:res.profileObj.name,
            useremail:res.profileObj.email,
        })
     //for gignup =>>>>>>>>>>.
       // this.props.onLogin({isLoggedIn: true, userId: this.state.userId ,username:this.state.username, useremail:this.state.useremail, useGoogle:true})
        this.props.doLoginGoogle(this.state);
        console.log("the state")
        console.log(this.state)
        console.log(res)
        console.log(res.profileObj)
    }
    render() {
        return(
            <div>
                <GoogleLogin
                    clientId="522925501243-hn2hgcnr9484lg2pmggi2ra5tet4sjc0.apps.googleusercontent.com"

                    // render={renderProps => (
                    //     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                    // )}
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






































































































































































































































































































