import axios from "axios";
import React from 'react';
import "../Stylies/posts.css"
import "../Stylies/Tags.css"
import {Link} from 'react-router-dom'
import {IconButton} from '@material-ui/core';
import {AiFillFileText} from "react-icons/all";
import {AiFillAlert,AiFillCiCircle,AiFillCreditCard,BiArrowBack,CgAdd,DiAndroid,Gi3DHammer,BsJustify,AiFillProfile,
AiOutlineKey,DiAngularSimple,MdKeyboardHide,AiFillQuestionCircle,SiSafari,AiOutlineComment
,CgKeyhole,BiJoystick,FaFax,AiFillZhihuCircle,DiAptana,GiPathDistance,VscLaw,
GiF1Car,BiChevronLeftSquare,AiFillPauseCircle,IoLogoDesignernews,MdSpeakerNotesOff,
GiNightSky,CgArrowLongDown,MdKeyboard,CgDanger,SiIata,AiFillAlipayCircle,MdPictureAsPdf,GiPokerHand,
BiCertification,RiSoundModuleFill,MdBrokenImage,WiLunarEclipse,FaYenSign,GiOakLeaf} from "react-icons/all";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tag from "./Tag";
import Popup from "./Popup";

export default class Post extends React.Component{
    constructor(props) {
        super(props);

        const {onSaveTags, onSavePost, post, myPost,fromSearch,
            title, content, published, author, imageUrl, id, isLoggedIn,myTags,watchs, forhome,comments} = this.props
        this.state ={
            resp: false,
            tags: null,
            postId: id,
            post: post,
            title: title,
            myTags:myTags,
            watchs:watchs,
            myPost: myPost,
            author: author,
            content: content,
            forhome: forhome,
            comments:comments,
            imageUrl: imageUrl,
            published: published,
            fromSearch:fromSearch,
            isLoggedIn: isLoggedIn,
            onSaveTags: onSaveTags,
            onSavePost: onSavePost,



            showPopup: false
        }

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    componentDidMount() {
        const {postId} = this.state
        const Url = "http://localhost:5000/tags/" + postId;
         //const Url = "/tags/" + postId
        axios.get(Url)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        tags: res.data,
                        resp: true,
                    });

                }
            })
            .catch((err) => {
                this.setState({
                    // tags: [],
                    resp: false,
                })
                 console.log(err)
            });
    }


   render() {
       const {tags,title,content,published,author,watchs,post,onSavePost,postId,resp,onSaveTags,imageUrl,myTags,forhome,comments} = this.state
       // if (this.state) {

           return (
               <div className="post">
                   <img  className="post-image" src={imageUrl} alt="next time add img"/>
                   <h4>{title} </h4>
                   <h5>{content}</h5>
                   <h5>This post has been published {published}  </h5>
                    <p/> by
                   {forhome &&
                     <Link to={(props) => `postsof/${author}`}> {author}</Link>
                   }
                   {!forhome &&  <b>  {author}</b> }
                   {/*<h5> <VisibilityIcon />{watchs}</h5>*/}

                   {resp && tags.map(((tag, index) =>

                       <th key={`${tag.name}${index}`}>
                           <div>

                               <Link
                                   onClick={(props)=> {onSaveTags(tag) }}
                                   to={(props) => `/searchtags/${tag.name}`}>
                                     <button style={{color:"withe"}} type="button"> # {tag.name}
                                   </button>
                               </Link>

                           </div>
                       </th>))
                   }

                   <div>

                       <IconButton style={{color:"red"}}  onClick={this.togglePopup.bind(this)} > <VisibilityIcon /></IconButton>{watchs}
                       {this.state.showPopup ?
                           <Popup
                               author={author}
                               postId={this.state.postId}
                               closePopup={this.togglePopup.bind(this)}
                           />
                           : null
                       }
                   </div>



                   <IconButton>

                       <Link onClick={(props) => {onSavePost(post,tags)}  } to={(props) => `/post/${postId}`}>
                           <AiOutlineComment/>
                       </Link>
                   </IconButton>  {comments}



               </div>

           );
       // } else {
       //     return null
       // }
   }

}

