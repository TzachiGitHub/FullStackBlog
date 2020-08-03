import React from 'react';
import {BrowserRouter as Router, Switch,Link, Route, Redirect} from 'react-router-dom';
import Cookie from "js-cookie";
 import './Components/Stylies/App.css';
import Header from './Components/Posts/Header';
import AboutMe from './Components/AboutMe';
import Home from './Components/Posts/Home';
import Login from './Components/Rejistration/Login';
import NewPost from './Components/Posts/NewPost';
import SinglePost from './Components/Posts/SinglePost';
import Signup from "./Components/Rejistration/Signup";
import axios from 'axios';
import NewComment from "./Components/Comments/NewComment";
import DeletePost from "./Components/Posts/DeletePost";
import DeleteComment from "./Components/Comments/DeleteComment";
import EditPost from "./Components/Posts/EditPost";
import SearchTags from "./Components/Posts/SearchTags";
import EditComment from "./Components/Comments/EditComment";
import SearchContent from "./Components/Posts/SearchContent";
import SearchTitle from "./Components/Posts/SearchTitle";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:  (Cookie.get("userId") == null )? false : true,
            MyPost: null,
            MyComment: null,
            userId: Cookie.get("userId" )|| null,
            username:Cookie.get("username" )|| null,
            useremail:null,
            forsearch: null,
            respfromSearch: [],
            myTags:null,


        };
        this.onLogout = this.onLogout.bind(this);
    }

    changeLoggedIn = (props) => {
        this.setState({
            useGoogle:props.useGoogle,
            isLoggedIn: props.isLoggedIn,
            userId: props.userId,
            username:props.username,
            useremail:props.useremail,

        });
        Cookie.set("userId", this.state.userId)
        Cookie.set("username", this.state.username)
    }
    // onLoginGoogle = (props) =>{
    //     this.setState({
    //         isLoggedIn: props.isLoggedIn,
    //         userId: props.userId,
    //         username:props.username,
    //         useremail:props.useremail,
    //     })
    //
    // }

    onSavePost = (post) => {
        this.setState({
            MyPost: post
        });
    }
    onSaveTags = (tags) => {
        this.setState({
             myTags:tags
        })
    }

    onSaveComment = (comment) => {
        this.setState({
            MyComment: comment
        });
    }


    onLogout = (props) => {
            //const Url = "http://localhost:5000/logout"
           const Url = "/logout"
           const data = {
                userId: this.state.userId
           }

            axios.post(Url,data)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            isLoggedIn: false,
                            userId: null
                        });
                        Cookie.remove("userId", this.state.userId)
                        Cookie.remove("username", this.state.username)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        };




    render() {
        const {MyPost,MyComment,myTags,resp, isLoggedIn, userId, username,forsearch,allPosts,respfromSearch,handleChange} = this.state
        // console.log("this.respfromSearch ==" + respfromSearch)
        // console.log("this.forsearch ==" + forsearch)
        return (
            <div className = "app-header">

                 <Router>
                     <Header username={username} onLogout={this.onLogout} isLoggedIn={isLoggedIn}/>
                     <Switch>
                         <Route path="/aboutme" component={AboutMe}/>
                         <Route path="/login" component={(props)=> <Login {...props} resp={resp} onLogin={this.changeLoggedIn}/>}/>
                         <Route path="/newpost" component={(props) => isLoggedIn ? <NewPost {...props} username={username} userId={userId}/> : <Redirect to="/login"/>}/>
                         <Route exact path="/post/:id" component={(props)=> <SinglePost username={username} MyPost={MyPost} isLoggedIn={isLoggedIn} {...props} userId={userId} onSaveComment={this.onSaveComment} MyComment={MyComment}/>}/>
                         <Route exact path="/signup" component={(props)=> <Signup {...props} onLogin={this.changeLoggedIn}/>}/>
                         <Route path="/logout" component={this.onLogout}/>
                         <Route path="/editpost" component={(props) => <EditPost {...props} userId={userId} MyPost={MyPost}/>}/>
                         <Route path="/editcomment" component={(props) => <EditComment {...props} userId={userId} MyPost={MyPost} MyComment={MyComment}/>}/>
                         <Route path="/newcomment" component={(props) => <NewComment {...props} userId={userId} username={username} MyPost={MyPost}/>}/>
                         <Route path="/deletepost" component={(props) => <DeletePost {...props} userId={userId} MyPost={MyPost}/>}/>
                         <Route path="/deletecomment" component={(props) => <DeleteComment {...props} userId={userId} MyComment={MyComment}/>}/>
                         <Route path="/contentsearch/:word" component={(props) => <SearchContent {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/titlesearch/:word" component={(props) => <SearchTitle {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/searchtags/:word" component={(props) => <SearchTags {...props} onSaveTags={this.onSaveTags}isLoggedIn={isLoggedIn} MyPost={MyPost} myTags={myTags}onSavePost={this.onSavePost}/>}/>
                         <Route exact path="/" component={(props)=>
                             <Home
                                 myTags={myTags}
                                 onSaveTags={this.onSaveTags}
                                 onSavePost={this.onSavePost}
                                 isLoggedIn={isLoggedIn}
                             />}
                        />
                     </Switch>
                 </Router>
             </div>

         );

     }
 }

export default App;


