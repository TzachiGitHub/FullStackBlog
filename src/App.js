import React from 'react';
import {BrowserRouter as Router, Switch,Link, Route} from 'react-router-dom';
import './Stylies/App.css';
import Header from './Components/Header';
import AboutMe from './hw4/AboutMe';
import Home from './hw4/Home';
import Login from './hw6/login';
import NewPost from './hw4/NewPost';
import singlePost from './hw4/singlePost';
import Signup from "./hw6/signup";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: null
        };
        this.onLogout = this.onLogout.bind(this);
    }


    onLogout = (props) => {
        const url = "http://localhost:5000/logout/" + this.state.userId;
        axios.post(url)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        isLoggedIn: false,
                        userId: null
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    changeLoggedIn = (props) => {
        this.setState({
            isLoggedIn: props.onLogin,
            userId: props.userId
        });
        console.log(props)
    }

    render() {
        var {isLoggedIn} = this.state
        return (
            <div className = "app-header">
                <Router>
                    <Header onLogout={this.onLogout} isLoggedIn={isLoggedIn}/>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/login" component={(props)=> <Login {...props} onLogin={this.changeLoggedIn}/>}/>
                        <Route path="/newPost" component={NewPost}/>
                        <Route exact path="/post/:id" component={singlePost}/>
                        <Route exact path="/signup" component={(props)=> <Signup {...props} onLogin={this.changeLoggedIn}/>}/>
                        <Route path="/logout" component={this.onLogout}/>

                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );

    }
}

export default App;
