import React, { useEffect, useState } from "react";
import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";
import { base_url } from '../utils/constants'
import Axios from 'axios';


function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get(base_url +'/question')
    .then(res=>{
      setPosts(res.data)
      
    })
    .catch(err=>window.alert(err))
    
  }, []);

  return (
    <div className="feed">
      <QuorBox />
      {posts.map((questions, id ) => (
        <Post
          key={id}
          Id={id}
          question={questions.question}
          post = {questions}
        />
      ))}
    </div>
  );
}

export default Feed;
