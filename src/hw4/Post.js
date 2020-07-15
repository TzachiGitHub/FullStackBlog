import React from 'react';
import "../Stylies/posts.css"
import {Link} from 'react-router-dom'

export default class Post extends React.Component{
    constructor(props) {
        super(props);

    }

   render() {
        //console.log("isLoggedIn from post " + this.props.isLoggedIn)
       return (
           <div className="post">
               <img className="post-image" src={this.props.imageurl} alt="Problem loading image"/>
               <h2>{this.props.title} </h2>
               <p>{this.props.content}</p>
               <h5>This post has been published  {this.props.published} by {this.props.author}</h5>
               <Link
                   onClick={(props)=>{this.props.savePost(this.props.post)}}
                   to={() => `/post/${this.props.id}`}>
                   Here
               </Link>

               {/*<Link to={() => `/comment/${this.props.id}`}>*/}
               {/*      comments*/}
               {/*</Link>*/}
           </div>

       );
   }

}

