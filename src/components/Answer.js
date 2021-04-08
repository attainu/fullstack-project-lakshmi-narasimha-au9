import React from 'react'
import { base_url } from '../utils/constants'
import Axios from 'axios';
import moment from 'moment';

function Answer(props) {
    const [userA,setUserA] = React.useState("")

    React.useEffect(()=>{
        if(props.post){
            let uid = props.post.answer_by;
            Axios.get(base_url+'/auth/users/'+uid)
            .then(res=>{
                setUserA(res.data)
            }) 
            .catch(err=>{
                return alert(err)
            })
        }
        
    }, [props])
    // console.log(props.post)
    return (
        <div>
            <span
                    style={{
                      position: "absolute",
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}> 
                      By {userA.name} {" "}
                      {moment(props.post.answered_time, "YYYYMMDD").fromNow()}
                     </span>
                  </span>
        </div>
    )
}

export default Answer