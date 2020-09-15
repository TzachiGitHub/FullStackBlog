import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "../Stylies/PostDesign.css"
import {DropdownMenu, Icon, IconGroup} from "semantic-ui-react";
import ListIcon from "semantic-ui-react/dist/commonjs/elements/List/ListIcon";
import ItemContent from "semantic-ui-react/dist/commonjs/views/Item/ItemContent";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Button, CardImg, DropdownToggle, Tooltip} from "react-bootstrap";
import {AiOutlineComment} from "react-icons";
import {Link} from "react-router-dom";
import {AiFillDelete, AiFillEdit} from "react-icons/all";
import Comments from "../Comments/Comments";
import DropdownItem from "react-bootstrap/cjs/DropdownItem";
import Popup from "./Popup";
import "../Stylies/posts.css"
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';



export default class PostDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            expanded:false,
            showPopup: false,
        }

    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }




    handleExpandClick = () => {
        const {expanded} = this.state
            if(expanded){
                this.setState({
                    expanded:false ,
                 })
            }else {
                this.setState({
                    expanded:true ,

                })
            }

        };
        render() {
            const {expanded} = this.state
            return (
                <Card className="root">
                    <CardHeader
                        avatar={

                            <Avatar aria-label="recipe" className="avatar">
                                {this.props.watchs}
                            </Avatar>

                        }


                        action={
                            <Typography>
                                {((this.props.isLoggedIn) && (this.props.author == this.props.username))?
                                    <DropdownButton id="dropdown">

                                            <DropdownItem>
                                                <Link onClick={(props) => {this.props.onSavePost(this.props.post,this.props.tags)}  } to={(props) => `/editpost`} > <AiFillEdit/>   edit </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link onClick={(props) => {this.props.onSavePost(this.props.post,this.props.tags)}} to={(props)  =>`/deletepost`}> <AiFillDelete/> delete</Link>
                                                </DropdownItem>



                                    </DropdownButton> : null
                                }
                            </Typography>

                        }


                       title={
                            <Link to={(props) => `postsof/${this.props.author}`}> {this.props.author}</Link>
                       }
                        subheader={this.props.published}

                    />

                    <CardContent>


                        {/*<Typography>*/}
                            {/*<div>*/}

                            {/*    <IconButton style={{color:"red"}}  onClick={this.togglePopup.bind(this)} > <VisibilityIcon /></IconButton>{this.props.watchs}*/}
                            {/*    {this.state.showPopup ?*/}
                            {/*        <Popup*/}
                            {/*            author={this.props.author}*/}
                            {/*            postId={this.props.postId}*/}
                            {/*            closePopup={this.togglePopup.bind(this)}*/}
                            {/*        />*/}
                            {/*        : null*/}
                            {/*    }*/}
                            {/*</div>*/}
                        {/*</Typography>*/}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.title}
                        </Typography>
                        <CardImg
                            src={this.props.imageUrl}
                            id="imageCard"
                            className="media"
                            // image={this.props.imageUrl}
                            title="Paella dish"
                        />
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            {this.props.isLoggedIn ?
                                <Link onClick={(props) => {
                                    this.props.onSavePost(this.props.post, this.props.tags)

                                }}
                                      to={(props) => `/post/${this.props.postId}`}>
                                    {/*<FavoriteIcon/>*/}

                                    <VisibilityIcon/>
                                </Link> : <Link to="/login">  <FavoriteIcon/></Link>
                            }
                        </IconButton>


                        <IconButton
                            className="expand"
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                        <h6>
                             comments: {this.props.comments}
                        </h6>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {this.props.content}
                            </Typography>
                            <Typography paragraph>
                                {this.props.tags && this.props.tags.map(((tag, index) =>
                                    <th key={`${tag.name}${index}`}>
                                        <div>
                                            <Link
                                                onClick={(props)=> {this.props.onSaveTags(tag) }} to={(props) => `/searchtags/${tag.name}`}>
                                                <Button variant="primary"type="button"> # {tag.name}</Button>
                                            </Link>
                                        </div>
                                    </th>))
                                }
                            </Typography>
                            <Typography>
                                <div className={"comment"}>
                                    <Comments  MyComment={this.props.MyComment} onSaveComment={this.props.onSaveComment} username={this.props.username}  isLoggedIn={this.props.isLoggedIn} userId={this.props.userId} postId={this.props.postId}/>
                                </div>
                            </Typography>

                            <IconButton aria-label="add to favorites">
                                {this.props.isLoggedIn ?
                                    <Link onClick={(props) => {
                                        this.props.onSavePost(this.props.post, this.props.tags)
                                    }}
                                          to={(props) => `/newcomment`}>
                                        <AddIcon/>
                                    </Link> : null
                                        }

                                     </IconButton>


                        </CardContent>
                    </Collapse>
                </Card>
            );
        }
}