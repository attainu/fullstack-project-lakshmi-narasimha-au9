import React, { createElement, useState, useEffect } from 'react';
import { Comment, Tooltip, Avatar, Collapse } from 'antd';
import moment from 'moment';
import { UpCircleOutlined , UpCircleFilled, DownCircleOutlined , DownCircleFilled  } from '@ant-design/icons';
import './styles/PostUi.scss';
import TextEditor from './TextEditor'
import { getUserById } from '../../utils/getuserprofiles'


const PostUi = (props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [user, setUser] = useState({})
    const { Panel } = Collapse


    useEffect(()=>{
      if(props.postData){
        let user = new Promise ((resolve,reject)=>{
          resolve(getUserById(props.postData.questioner))
          })
        user.then((item)=>{
          
          if(item.email){
          setUser(item)
        }
        })
      }
      
    },[props])

    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };

    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };

    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like} >
          {createElement(action === 'liked' ?  UpCircleFilled : UpCircleOutlined )}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DownCircleFilled  : DownCircleOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <Collapse defaultActiveKey={['1']} >
          <Panel showArrow={false} header="Answer" key="2">
              <TextEditor />
          </Panel>
      </Collapse>,
    ];


    return (
        <div>
            <Comment
              actions={actions}
              author={<p>{user.name}</p>}
              avatar={
                  <Avatar
                  src={user.profile_img_url}
                  alt={user.name}
                  />
              }
              content={
                  <p>
                  {props.postData.question}
                  </p>
              }
              datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(props.postedTime, "YYYYMMDD").fromNow()}</span>
                  </Tooltip>
              }
              />
        </div>
      
    );
};

export default PostUi