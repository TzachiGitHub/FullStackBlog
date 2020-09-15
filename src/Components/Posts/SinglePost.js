import axios from 'axios';
import "../Stylies/posts.css";
import {Link} from 'react-router-dom'
import React, {Component} from 'react';
import {IconButton} from "@material-ui/core";
import Comments from "../Comments/Comments";
import {AiFillEdit, BiArrowBack} from "react-icons/all";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";


export default class SinglePost extends Component {
    constructor(props) {
        super(props);

        const {forpopularpost,postId,username,respFromSearch,onSaveComment,isLoggedIn,onSaveTags,MyPost,userId} = this.props
        // if(!forpopularpost){
            this.state = {
                tags:null,
                watchs:null,
                resp: false,
                MyPost:MyPost ,
                userId:userId ,
                username:username,
                MyTags:this.props.MyTags,
                isLoggedIn: isLoggedIn ,
                onSaveTags:onSaveTags,
                onSaveComment:onSaveComment,
                imageUrl:this.props.MyPost.imageUrl,
                postId:(forpopularpost)? postId : this.props.match.params.id,

            };
        //console.log("username ==" + this.props.history.params.MyTags.author)
         console.log("username ==" + this.props.MyPost.imageUrl)
        console.log("url ==" + this.state.imageUrl)


    }

    back = (e) => {
         this.props.history.push("/" )
    }





    componentDidMount () {
        const {postId,isLoggedIn,MyPost,userId,username} = this.state

            if (MyPost && isLoggedIn && this.props.MyPost.authorId != userId) {
                const Url = "http://localhost:5000/post/" + postId;


                axios.post(Url)
                    .then((res) => {
                        if (res.status === 200) {

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
            if(isLoggedIn){
                const Url = "http://localhost:5000/addtowatchs/" + postId;
                //const Url = "/addtowatchs/" + postId;
                const data = {
                    username:username,
                    one:1,
                    postId:postId,

                }
                axios.post(Url,data)
                    .then((res) => {
                        if (res.status === 200) {

                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }



    }

    render() {
        console.log(this.state.imageUrl)

        const {resp,isLoggedIn,userId,postId,username,onSaveComment,MyComment,MyTags,MyPost,onSaveTags} = this.state
        if ( this.state && MyPost) {
            const {title, content, published, author, authorId, watchs} = this.state.MyPost
            let imageUrl = this.state.imageUrl ? this.state.imageUrl : "http://picsum.photos/200/100"

            return (
                <div >

                    <Card style={{ width: '30rem' }}>
                        <Card.Img style={{ width: '30rem' }} variant="top" src={imageUrl} alt="Loading Error" />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                {content}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                        {MyTags && MyTags.map(((tag, index) =>
                                            <th key={`${tag.name}${index}`}>
                                                <div>
                                                    <Link
                                                        onClick={(props)=> {onSaveTags(tag) }} to={(props) => `/searchtags/${tag.name}`}>
                                                        <Button variant="primary"type="button"> # {tag.name}</Button>
                                                    </Link>
                                                </div>
                                            </th>))
                                        }
                                    </ListGroupItem>
                            <ListGroupItem> <VisibilityIcon /> users watchs : {watchs}</ListGroupItem>
                            <ListGroupItem> This post has been published {published} by {author}</ListGroupItem>
                            <ListGroupItem>
                                <div className={"comment"}>
                                    <Comments  MyComment={MyComment} onSaveComment={onSaveComment} username={username}  isLoggedIn={isLoggedIn} userId={userId} postId={postId}/>*/}
                                </div></ListGroupItem>

                        </ListGroup>
                        <Card.Body>
                            <IconButton onClick={this.back} >   <BiArrowBack/>   </IconButton>
                            <IconButton aria-label="add to favorites">
                                {isLoggedIn ?
                                    <Link to='/newcomment'> <AddIcon/> add comment </Link> : null
                                }
                            </IconButton>

                        </Card.Body>
                    </Card>
                    {/*<Card className="text-center">*/}
                    {/*    <Card.Header>*/}
                    {/*        <Card.Img style={{ width: '18rem' }} variant="top" src={imageUrl} alt="Loading Error" />*/}
                    {/*        <h5> <VisibilityIcon />{watchs}</h5>*/}
                    {/*        {isLoggedIn && authorId == userId &&*/}
                    {/*        <Button variant="primary" >*/}
                    {/*            <Link to='/editpost'>  <AiFillEdit/> edit  </Link>*/}
                    {/*            <Link to='/deletepost'> <AiFillDelete/> delete </Link>*/}
                    {/*        </Button>*/}
                    {/*        }*/}
                    {/*    </Card.Header>*/}
                    {/*    <Card.Body>*/}
                    {/*        <Card.Title>{title}</Card.Title>*/}
                    {/*        <Card.Text> {content}</Card.Text>*/}
                    {/*        {MyTags && MyTags.map(((tag, index) =>*/}
                    {/*            <th key={`${tag.name}${index}`}>*/}
                    {/*                <div>*/}
                    {/*                    <Link*/}
                    {/*                        onClick={(props)=> {onSaveTags(tag) }} to={(props) => `/searchtags/${tag.name}`}>*/}
                    {/*                        <Button variant="primary"type="button"> # {tag.name}</Button>*/}
                    {/*                    </Link>*/}
                    {/*                </div>*/}
                    {/*            </th>))*/}
                    {/*        }*/}
                    {/*    </Card.Body>*/}
                    {/*    <Card.Footer className="text-muted">*/}
                    {/*        <small className="text-muted"><h5>This post has been published {published} by {author} </h5></small>*/}
                    {/*    </Card.Footer>*/}
                    {/*</Card>*/}

                    {/*<Card >*/}

                    {/*    <Card.Body>*/}








                    {/*/!*{isLoggedIn && authorId == userId &&*!/*/}

                    {/*/!*<IconButton > <Link to='/deletepost'> <AiFillDelete/> delete </Link>   </IconButton>*!/*/}
                    {/*/!*}*!/*/}

                    {/*<div className={"comment"}>*/}
                    {/*    <Comments  MyComment={MyComment} onSaveComment={onSaveComment} username={username}  isLoggedIn={isLoggedIn} userId={userId} postId={postId}/>*/}
                    {/*</div>*/}

                    {/*<IconButton onClick={this.back} >   <BiArrowBack/>   </IconButton>*/}
                    {/*{isLoggedIn &&*/}
                    {/*<IconButton >  <Link to='/newcomment'> <AiFillEdit/>  add comment  </Link> </IconButton>*/}

                    {/*}*/}

                    {/*    </Card.Body>*/}

                    {/*</Card>*/}

                </div>

            );
        }else{
            return (
                <div> Loading...</div>

            )

        }
    }
}