// import React, {Component} from 'react';
// import "../Stylies/posts.css"
// import axios from 'axios';
// import {Link} from 'react-router-dom'
// import Comments from "./Comments";
//
//
// export default class SingleComment extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             id: this.props.match.params.id,
//             isLoggedIn:this.props.isLoggedIn,
//             resp: false,
//             userId: this.props.userId,
//             myComment:null,
//             post_id:this.props.post_id
//             //d: this.props.myPost.authorId
//         };
//         console.log("this.state from singlcomment = ")
//         console.log(this.state)
//         console.log("this.id from singcommets == ")
//         console.log(this.id)
//     }
//
//     componentWillMount () {
//         const {id} = this.state
//         const {isLoggedIn} = this.state
//         const localUrl = "http://localhost:5000/comment/" + id;
//         // const deployUrl = "/post/" + id
//         axios.get(localUrl)
//             .then((res) => {
//                 this.setState({
//                     myComment: res.data,
//                     resp: true,
//                     saveComment:this.props.saveComment
//                 });
//                 console.log("myComment from singlecomment")
//                 console.log(this.state.myComment)
//                 // console.log("post_id from singlcomment")
//                 // console.log(this.state.id)
//
//             })
//             .catch((err) => {
//                 console.log(err)
//             });
//
//
//
//
//     }
//
//     render() {
//         if (this.state && this.state.myComment ) {
//             const {myComment} = this.props
//             console.log("myComment   from singlepost")
//             console.log(myComment)
//             let {title,content,author,post_id} = this.state.myComment
//             console.log("post_id from singlepost")
//             console.log(post_id)
//             return (
//                 <div>
//                     <Comments post_id ={this.state.id}/>
//                     <h2>{title}</h2>
//                     <p>{content}</p>
//                     <Comments post_id ={this.state.id}/>
//                     {this.props.isLoggedIn &&
//                     <Link onClick={(props) => {
//                         this.props.saveComment(this.state.myComment)
//                     }} to='/newComment'> new comment  | </Link>
//                     }
//
//
//
//                 </div>
//
//             );
//         }else{
//             return <div> Loading..</div>
//         }
//     }
// }