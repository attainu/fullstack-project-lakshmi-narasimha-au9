import React from 'react';
import './TextEditor.css'
import { MuiTextEditor } from 'mui-editor'; 
import { base_url } from '../utils/constants'


const PostUrl= base_url+'/answer'


function TextEditor(props) {
    console.log(props)
    const outputHandler = (data)=>{
        const formData = {data,qid:props.qid}
        const options={
            method: 'POST',
            mode:'cors',
            body: JSON.stringify(formData),
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include"
          };
        fetch(PostUrl,options)
        .then((res)=>res.json())
        .then(data=>console.log("post successful",data))
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div>
            <MuiTextEditor transparent output={outputHandler} />
        </div>
    )
}



export default TextEditor