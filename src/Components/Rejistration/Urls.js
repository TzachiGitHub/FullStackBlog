import React from "react";
import App from "../../App";

export default class Urls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //  Urls for localhost
            UrlApp:"http://localhost:5000/logout",
            UrlLogin:"http://localhost:5000/login",
            UrlSignup:"http://localhost:5000/signup",
            UrlSinglePost:"http://localhost:5000/post/",
            UrlSearchTitle:"http://localhost:5000/titlesearch/",
            UrlTags:"http://localhost:5000/tags/",
            UrlPost:"http://localhost:5000/tags/",
            UrlSearchTags:"http://localhost:5000/searchtags/",
            UrlDeletePost: "http://localhost:5000/deletepost",
            UrlEditPost: "http://localhost:5000/editpost",
            UrlNewPost: "http://localhost:5000/newpost",
            UrlPosts :"http://localhost:5000/posts",
            UrlSearchContent:"http://localhost:5000/contentsearch/",
            UrlNewComment:"http://localhost:5000/comment/",
            UrlEditComment: "http://localhost:5000/editcomment",
            UrlDeleteComment:"http://localhost:5000/deletecomment",
            UrlComments:"http://localhost:5000/comment/",


        }




            // Urls for aws
            // UrlApp:"/logout",
            // urlLogin:"/login",
            // UrlSignup:"/signup",
            // UrlSinglePost:"/post/",
            // UrlSearchTitle:"/titlesearch/",
            // UrlTags:"/tags/",
            // UrlPost:"/tags/"
            // UrlSearchTags:"/searchtags/",
            // UrlDeletePost: "/deletepost",
            // UrlEditPost: "/editpost",
            // UrlNewPost: "/newpost",
            // UrlPosts :"/posts",
            // UrlSearchContent:"/contentsearch/",
            // UrlNewComment:"/comment/",
            // UrlEditComment: "/editcomment",
            // UrlDeleteComment:"/deletecomment",
            // UrlComments:"/comment/",
        }


}

