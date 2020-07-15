import React from 'react';
import {BrowserRouter as Router, Switch,Link, Route, Redirect} from 'react-router-dom';
import './Stylies/App.css';
import Header from './Components/Header';
import AboutMe from './hw4/AboutMe';
import Home from './hw4/Home';
import Login from './hw6/login';
import NewPost from './hw4/NewPost';
import SinglePost from './hw4/singlePost';
import Signup from "./hw6/signup";
import axios from 'axios';
import Edit from './hw4/Edit';
import Comments from "./Components/Comments";
import NewComment from "./hw4/NewComment";
import SingleComment from "./Components/SingleComment";
import Delete from "./Components/Delete";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userId: null,
            mypost: null,
            myComment: null,
            isEmpty:true
        };
        this.onLogout = this.onLogout.bind(this);
    }



    onSavePost = (post) => {
        this.setState({
            mypost: post
        });
        console.log("saved post!:")
        console.log(post)
    }

    onSaveComment = (comment) => {
        this.setState({
            myComment: comment
        });
        console.log("myComment from app")
        console.log(this.state.myComment)
    }



onLogout = (props) => {
        const localUrl = "http://localhost:5000/logout/" + this.state.userId;
        //const deployUrl = "/logout/" + this.state.userId;

        axios.post(localUrl)
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
        var {mypost, isLoggedIn, userId, myComment} = this.state
        console.log("isLoggedIn from app " + this.state.isLoggedIn)
        return (
            <div className = "app-header">
                <Router>

                    <Header  onLogout={this.onLogout} isLoggedIn={isLoggedIn}/>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/login" component={(props)=> <Login {...props} onLogin={this.changeLoggedIn}/>}/>
                        <Route path="/newPost" component={(props) => isLoggedIn ? <NewPost {...props} userId={userId}/> : <Redirect to="/login"/>}/>
                        <Route exact path="/post/:id" component={(props)=> <SinglePost isLoggedIn={isLoggedIn} {...props} userId={userId} saveComment={this.onSaveComment}/>}/>
                        <Route exact path="/signup" component={(props)=> <Signup {...props} onLogin={this.changeLoggedIn}/>}/>
                        <Route path="/logout" component={this.onLogout}/>
                        <Route path="/edit" component={(props) => <Edit {...props} userId={userId} myPost={mypost}/>}/>
                        <Route path="/newComment/:id" component={(props) => <NewComment {...props} myPost={mypost}/>}/>
                        <Route path="/delete" component={(props) => <Delete {...props} myPost={mypost}/>}/>
                        <Route exact path="/" component={(props)=> <Home savePost={this.onSavePost} isLoggedIn={isLoggedIn}/>}/>
                    </Switch>
                </Router>
            </div>
        );

    }
}

export default App;
