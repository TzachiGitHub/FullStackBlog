import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {TiSocialFacebookCircular} from "react-icons/all";


class LoginFacebook extends React.Component {
    responseFacebook(response) {
        console.log(response);
    }

    // render() {
    //     return (
    //         <FacebookLogin
    //             appId="1088597931155576"
    //             autoLoad={true}
    //             fields="name,email,picture"
    //             scope="public_profile,user_friends,user_actions.books"
    //             callback={this.responseFacebook}
    //         />
    //     )
    // }

    render(){
        return(
            <div>
               <FacebookLogin
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,email"
                    callback={this.responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon={<TiSocialFacebookCircular />}
               />,

        );
            </div>
    )
        // document.getElementById('demo')
}
}

export default LoginFacebook;