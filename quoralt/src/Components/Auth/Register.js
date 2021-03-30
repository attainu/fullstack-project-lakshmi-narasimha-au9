import React, { useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import './styles/Register.scss'
import validate  from 'input-validators-js';
import axios from 'axios'
import { baseUrl } from '../../utils/urls';
import { profile } from '../../Store/Actions/Authactions'
import AuthStatus from '../../utils/authstatus'
import { connect } from 'react-redux';


// api call url
const registerUrl = baseUrl +"/auth/register";

function Register(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dob, setDob] = useState("")
    const [errors, setErrors] = useState({})
    const token = sessionStorage.getItem('x-access-token')

    const registerHandler = (e)=>{
        e.preventDefault();
        setErrors({
            name:validate.validateTypeString(name) && name.length>5?"": "try different username",
            email:validate.validateTypeString(email)?"": "Please enter valid email"
        })
        const user = {
            name: name,
            email: email,
            password: password,
            dob: dob
        }
        const axiosConfig = {
            method: "POST",
            url: registerUrl,
            data: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }
        if(!errors.name|| !errors.email){
            axios(axiosConfig)
            .then((res)=>{
                props.history.push('/login')
            })
            .catch(err=>setErrors({error:"something went wrong..email or username error"}))
        }
        
    }
    if(token==null || token === undefined){
    return (
        <main className="container form ">
            <fieldset>
                <legend>Register</legend>
                <Form onSubmit={registerHandler}>
                    <span style={{color:"red"}}>*{errors.error}</span>
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <span style={{color:"red"}}>*{errors.name}</span>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <span style={{color:"red"}}>*{errors.email}</span>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" placeholder="DOB" name="dob" value={dob} onChange={(e)=>setDob(e.target.value)}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </fieldset>
            
        </main>
    )
    }else{
        let userdata = AuthStatus();
        props.dispatch(profile(userdata))
        props.history.push('/')
        return false
    }
}
const mapStateToProps = (state)=>{
    return {
        is_auth:state.auth_reducer.is_auth
    }
}

export default connect(mapStateToProps)(Register)
