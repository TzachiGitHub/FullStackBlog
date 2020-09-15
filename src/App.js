//YES
// console.log("this.stat = " + JSON.stringify(this.state.MyPost))
import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Cookie from "js-cookie";
import './Components/Stylies/App.css';
import Header from './Components/Posts/Header';
import AboutMe from './Components/AboutMe';
import Home from './Components/Posts/Home';
import Login from './Components/Rejistration/Login';
import NewPost from './Components/Posts/NewPost';
import SinglePost from './Components/Posts/SinglePost';
import Signup from "./Components/Rejistration/Signup";
import NewComment from "./Components/Comments/NewComment";
import DeletePost from "./Components/Posts/DeletePost";
import DeleteComment from "./Components/Comments/DeleteComment";
import EditPost from "./Components/Posts/EditPost";
import SearchTags from "./Components/Posts/SearchTags";
import EditComment from "./Components/Comments/EditComment";
import SearchContent from "./Components/Posts/SearchContent";
import SearchTitle from "./Components/Posts/SearchTitle";
import MostPopular from "./Components/Posts/MostPopular";
import Latest from "./Components/Posts/Latest";
import PostsOf from "./Components/Posts/PostsOf";




export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: (Cookie.get("userId") == null )? false : true,
            MyPost: null,
            MyComment: null,
            userId: Cookie.get("userId" )|| null,
            username:Cookie.get("username" )|| null,
            useremail:null,
            forsearch: null,
            // respfromSearch: [],
            MyTags:null,



        };
        this.onLogout = this.onLogout.bind(this);
    }

    onLoggedIn = (props) => {
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

    onSavePost = (post,tags) => {
        this.setState({
            MyPost: post,
            MyTags:tags,
        });
    }
    onSaveTags = (tags) => {
        this.setState({
             MyTags:tags
        })
    }

    onSaveComment = (comment) => {
        this.setState({
            MyComment: comment
        });
    }


    onLogout = (props) => {
        const {userId,username} = this.state
        const Url = "http://localhost:5000/logout"
       //const Url = "/logout"
       const data = {
            userId: userId
       }
        axios.post(Url,data)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        isLoggedIn: false,
                        userId: null
                    });
                    Cookie.remove("userId",userId)
                    Cookie.remove("username",username)
                }
            })
            .catch(err => {
                console.log(err);
            })
        };


    render() {
        const {MyPost,MyComment,MyTags,resp, isLoggedIn, userId, username} = this.state
        return (
            <div className = "app-header">
                 <Router>
                     <Header onSaveTags={this.onSaveTags} onSavePost={this.onSavePost} username={username} onLogout={this.onLogout} isLoggedIn={isLoggedIn}/>
                     <Switch>
                         <Route path="/aboutme" component={AboutMe}/>
                         <Route path="/logout" component={this.onLogout}/>
                         <Route exact path="/signup" component={(props)=> <Signup {...props} onLogin={this.onLoggedIn}/>}/>
                         <Route path="/editpost" component={(props) => <EditPost MyTags={MyTags} {...props} userId={userId} MyPost={MyPost}/>}/>
                         <Route path="/login" component={(props)=> <Login {...props} resp={resp} onLogin={this.onLoggedIn}/>}/>
                         <Route path="/deletepost" component={(props) => <DeletePost {...props} userId={userId} MyPost={MyPost}/>}/>
                         <Route path="/deletecomment" component={(props) => <DeleteComment {...props} userId={userId} MyComment={MyComment}/>}/>
                         <Route path="/newcomment" component={(props) => <NewComment {...props} userId={userId} username={username} MyPost={MyPost}/>}/>
                         <Route path="/newpost" component={(props) => isLoggedIn ? <NewPost {...props} username={username} userId={userId}/> : <Redirect to="/login"/>}/>
                         <Route path="/editcomment" component={(props) => <EditComment {...props} userId={userId} MyPost={MyPost} MyComment={MyComment} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/postsof/:username" component={(props) => <PostsOf {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/titlesearch/:word" component={(props) => <SearchTitle {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/contentsearch/:word" component={(props) => <SearchContent {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route path="/searchtags/:word" component={(props) => <SearchTags {...props} isLoggedIn={isLoggedIn} MyPost={MyPost} MyTags={MyTags}onSavePost={this.onSavePost} onSaveTags={this.onSaveTags}/>}/>
                         <Route exact path="/post/:id" component={(props)=> <SinglePost {...props} MyTags={MyTags} MyTags={MyTags} username={username} MyPost={MyPost} isLoggedIn={isLoggedIn} MyComment={MyComment} userId={userId} onSaveComment={this.onSaveComment} onSaveTags={this.onSaveTags} />}/>
                         <Route exact path="/latest/:num" component={(props)=> <Latest {...props} username={username} MyPost={MyPost} isLoggedIn={isLoggedIn}  userId={userId} MyComment={MyComment} onSavePost={this.onSavePost} onSaveComment={this.onSaveComment} />}/>
                         <Route exact path="/mostpopular/:num" component={(props)=> <MostPopular {...props} username={username} MyPost={MyPost} isLoggedIn={isLoggedIn} userId={userId} MyComment={MyComment} onSavePost={this.onSavePost} onSaveComment={this.onSaveComment} />}/>
                         <Route exact path="/" component={(props)=>
                             <Home
                                 {...props}
                                 MyComment={MyComment}
                                 MyTags={MyTags}
                                 username={username}
                                 onSaveComment={this.onSaveComment}
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



