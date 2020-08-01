// import React,{Component} from "react";
// import TextField from "@material-ui/core/TextField";
// import axios from 'axios';
//
// import {LinkButtons,SubmitButtons,registreButton,homeButton,forgotButton,inputStyle,headerBar} from '../components'
//
// const title = {
//     pageTitle:'Forgot Psssword Screen',
// };
//
// class ForgotPassword extends Component{
//     constructor() {
//         super();
//
//         this.state ={
//             email:'',
//             showError : false,
//             messageFromServer:'',
//         };
//     }
//
//     handleChange = name => event =>{
//         this.setState({
//             [name]:event.target.value,
//         });
//     };
//
//     sendEmail = e => {
//         e.preventDefault();
//         if(this.state.email == ''){
//             this.setState({
//                 showError:false,
//                 messageFromServer:'',
//             });
//         } else {
//             axios
//                 .post('http://localhost:5000/forgotpassword',
//                     {
//                         email: this.state.email,
//                     })
//                 .then(response => {
//                     console.log(response.data);
//                     if (response.data == 'email not in db') {
//                         this.setState({
//                             showError: true,
//                             messageFromServer: '',
//                         });
//                     } else if (response.data == 'recovery email sent') {
//                         this.setState({
//                             showError: false,
//                             messageFromServer: 'recovery email sent'
//                         });
//                     }
//                 })
//                 .catch(error => {
//                     console.log(error.data);
//                 });
//
//         }
//     };
//
//     render() {
//         const {email, messageFromServer ,showNullError, showError} = this.state;
//         return(
//             <div>
//                 <headerBar titlt = {title}/>
//                 <from className ="profile-from" onSubmit ={this.sendEmail}>
//                     <TextField
//                         style={inputStyle}
//                         id="email"
//                         value={email}
//                         onChange={this.handleChange('email')}
//                         placeholder='Email Address'
//                         />
//                         <SubmitButtons
//                             buttoStyle ={forgotButton}
//                             buttonText={'Send Password Rest Email'}
//                             />
//                 </from>
//                 {showNullError && (
//                     <div>
//                         <p>The email address cannot be null.</p>
//                     </div>
//                 )}
//                 {showError && (
//                     <div>
//                         <p>
//                             the email address isn't recognized.  Please try again or register
//                             for a new account.
//                         </p>
//                     <LinkButtons
//                     buttonText={'Register'}
//                     buttonStyle={registreButton}
//                     likn={'/register'}
//                     />
//                     </div>
//                 )}
//                 {messageFromServer == 'recovery email sent' &&(
//                     <div>
//                         <h3>Password Reser Email Successfully Sent!</h3>
//                     </div>
//                 )}
//                 <LinkButtons
//                     buttonText={'Go Home'}
//                     buttonStyle={homeButton}
//                     likn={'/'}
//                     />
//                     </div>
//
//         );
//     }
//
//
// }
// export default ForgotPassword;