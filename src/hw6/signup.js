import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            password: null,
            data: [],
            userId:null,
            resp: null
        };
    }


    changeUsername = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    doSignup = (e) => {
        let localUrl = "http://localhost:5000/signup";
        //let deployUrl = "/signup";
        const data = {
            name: this.state.name,
            password: this.state.password
        }
        axios.post(localUrl, data)
            .then((res) => {
                if(res.status === 200) {
                    this.setState({
                        data: [],
                        resp: "Success: user signup."
                    });
                    let localUrlForId = "http://localhost:5000/getidbyname/" + this.state.name;
                    //let deployUrlForId = "/getidbyname/" + this.state.name;

                    axios.get(localUrlForId).then(response=>{
                        if(response.status === 200){
                            this.props.onLogin({onLogin: true, userId: response.data.id })
                            this.props.history.push("/")
                        }
                        console.log("userId from siupgn =  " + this.userId)
                    })
                        .catch(er=>{
                            console.log(er);
                        })
                    console.log("from signup.js - res = ")
                    console.log(res)
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    data: [],
                    resp: "Error: a username with that name exists already - try logging in or change username."
                });
                alert(this.state.resp)
            });

    }

    render() {
        return (
                <div>
                    <h2>signup</h2>
                    name: <input type="text" onChange={this.changeUsername} placeholder={"Enter name"} required></input><br/>
                    password: <input type="password" onChange={this. changePassword} placeholder="Enter Password" required></input><br/>
                    <button onClick={this.doSignup}>send</button><br/>
                </div>
        );
    }
}