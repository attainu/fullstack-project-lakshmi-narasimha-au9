import React,{ useState } from 'react'
import { Form, Button} from 'react-bootstrap'
import axios from 'axios'
import validate  from 'input-validators-js';
import { baseUrl } from '../../utils/urls';
import  { connect } from 'react-redux';
import { isAuthenticated, profile } from '../../Store/Actions/Authactions'
import AuthStatus from '../../utils/authstatus'

// login url
const loginUrl = baseUrl +"/auth/login"


function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const token = sessionStorage.getItem('x-access-token')
    if(token==null || token === undefined){
        const loginHandler = (e)=>{
            e.preventDefault()
            const user = {
                email:email,
                password:password
            }
            setErrors({
                email:validate.validateEmail(email)? "": "Please enter a valid email",
            })
            const axiosConfig = {
                method: "POST",
                url: loginUrl,
                data: JSON.stringify(user),
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5000"
                },
                credentials:"include"
            }
            if(!errors.name|| !errors.email){
                axios(axiosConfig)
                .then((res)=>{
                    document.cookie=`x-access-token=${res.data.token};max-age=86400;SameSite=Lax;`
                    sessionStorage.setItem("x-access-token",res.data.token)
                    props.dispatch(isAuthenticated(true))
                    const userdata = AuthStatus();
                    props.dispatch(profile(userdata))
                    props.history.push('/')
                })
                .catch(()=>setErrors({error:"something went wrong..email or username error"}))
            }

        }
        return (
            <main className="container form ">
                <fieldset>
                    <legend>Sign In</legend>
                    <Form onSubmit={loginHandler}>
                        
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <span style={{color:"red"}}>*{errors.email}</span>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </fieldset>
                
            </main>
        )
    }
    else{
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

export default connect(mapStateToProps)(Login)
