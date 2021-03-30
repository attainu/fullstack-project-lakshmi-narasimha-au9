import React from 'react';
import './styles/TextEditor.scss'
import { MuiTextEditor } from 'mui-editor'; 


const PostUrl= 'http://localhost:5000/answer'



const outputHandler = (data)=>{
    const formData = {data}
    const options={
        method: 'POST',
        mode:'cors',
        body: JSON.stringify(formData),
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
        },
        credentials: "include"
      };
    console.log(options)
    fetch(PostUrl,options)
    .then((res)=>res.json)
    .then(data=>console.log("post successful"))
    .catch(err=>{
        console.log(err)
    })
}



function TextEditor() {
    
    return (
        <div>
            <MuiTextEditor transparent output={outputHandler} />
        </div>
    )
}



export default TextEditor