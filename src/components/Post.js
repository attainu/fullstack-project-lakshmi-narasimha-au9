import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../features/userSlice";
import Modal from "react-modal";
import { selectQuestionId, setQuestionInfo } from "../features/questionSlice";
import { base_url } from "../utils/constants"
import Axios from 'axios';
import moment from 'moment';
import { Link,withRouter } from 'react-router-dom';
import TextEditor from './TextEditor';
import $ from "jquery";
import Answer from './Answer'


function Post({ Id, question, post, history }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const questionId = useSelector(selectQuestionId);
  const [answer, setAnswer] = useState([]);
  const [userd, setUserd] = useState("");
  const [userA, setUserA] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [getAnswers, setGetAnswers] = useState([]);

  useEffect(() => {
    if (post) {
      let postedTime =post.questioned_time.split("T")[0].split('-').join("")
      // console.log(post)
      setTimestamp(postedTime)
      setLikes(post.upvotes)
      setDislikes(post.downvotes)
      setGetAnswers(post.answers)
      let voted = post.votes.filter((vote)=>vote.vote_by=user.data._id)
      console.log(voted)
      if(voted.length > 0){
        setAction(voted[0].voteV? "liked": "disliked")
      }
      Axios.get(base_url +`/auth/users/${post.questioner}`)
      .then(res=>{
        setUserd(res.data)})
      .catch(err=>window.alert(err))
    }
    if(post.answers.length>0){
      let highest_voted_answer = post.answers.reduce((p=0,answer)=>{
        return answer.upvotes>=p
      })
      setAnswer(highest_voted_answer)
      
    }
  }, [post, user,post.answers]);

  const like = async() => {
    let url = base_url+`/vote/question/${post._id}_true`
    await Axios(url,{
      method: 'POST',
      withCredentials:true
    })
    .then((res)=>{
      setLikes(res.data.resp.upvotes);
      setDislikes(res.data.resp.downvotes);
      setAction('liked');
    })
    .catch(err=>{
      console.log(err)
      alert("something went wrong")
    })
    
  };

  const dislike = async() => {
    let url = base_url+`/vote/question/${post._id}_false`
    await Axios(url,{
      method: 'POST',
      withCredentials:true
    })
    .then((res)=>{
      setLikes(res.data.resp.upvotes);
      setDislikes(res.data.resp.downvotes);
      setAction('disliked');
    })
    .catch(err=>{
      window.alert ("something went wrong")
    })
  };


  const handleAnswer = (e) => {
    e.preventDefault();
    $('button[title="Save"]').trigger('click')
    
    setIsModalOpen(false);
    history.push('/')
  };
  return (
    <div
      className="post"
      onClick={() =>
        dispatch(
          setQuestionInfo({
            questionId: Id,
            questionName: question,
          })
        )
      }
    >
      <div className="post__info">
        <Avatar
          src={
            userd.profile_img_url
              ? userd.profile_img_url
              : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
          }
        />
        <h4>{userd.name ? userd.name: userd.email}</h4>
        <small>{moment(timestamp, "YYYYMMDD").fromNow()}</small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <Link to={`/ques/${post._id}`}>{question}</Link>
          <button
            onClick={() => user.data.name?setIsModalOpen(true):dispatch(logout())}
            className="post__btnAnswer"
          >
            Answer
          </button>
          <Modal
            isOpen={IsmodalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {userd.name ? userd.name : userd.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {/* {new Date(questioned_time?.toDate()).toLocaleString()} */}
                  {moment(timestamp, "YYYYMMDD").fromNow()}
                </span>
              </p>
            </div>
            <div className="modal__answer"  >
              <TextEditor qid={post._id}/>
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <div className="post__answer">
          {getAnswers.map((answers, id) => (
            <p  style={{ position: "relative", paddingBottom: "5px" }}>
              
                <span contenteditable dangerouslySetInnerHTML={{__html:answers.answer}}>
                  
                </span>
                <br />
                <Answer post={answer}/>
              
            </p>
          ))}
        </div>
        {/* <img src={imageUrl} alt="" /> */}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <span>{likes}</span>
          <ArrowUpwardOutlinedIcon onClick={like} style={{color:action==="liked"? "blue":""}} />
          <span>{dislikes}</span>
          <ArrowDownwardOutlinedIcon onClick={dislike} style={{color:action==="disliked"? "blue":""}}/>
        </div>

        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
      <div className="post__answers">
          
      </div>
    </div>
  );
}

export default withRouter(Post);
