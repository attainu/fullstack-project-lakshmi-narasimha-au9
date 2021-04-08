import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { base_url } from '../../utils/constants'
import { login } from '../../features/userSlice'
import { withRouter } from 'react-router-dom';

function Form(props) {
    const [emailField, SetEmailField] = useState(false);
    const [usernameField, SetUsernameField] = useState(false);
    const [date, setDate] = useState(Date.now());
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordField, SetPasswordField] = useState(false);
    const [btnText, setBtnText] = useState("Register");
    const [loginForm, setLoginForm] = useState(true);
    const dispatch = useDispatch();

    const loginHandler = () => {
        Axios({
          method: "POST",
          url: base_url+"/auth/login",
          data: {
            email,
            password,
          },
        })
          .then((res) => {
            document.cookie = `x-access-token=${res.data.token};max-age=86400;SameSite=Lax;`
            dispatch(login(res.data));
            props.history.push('/')
          })
          .catch((err) => alert(err.message));
      };
    
    const registerHandler = (e) => {
        e.preventDefault();
        Axios({
            method: "POST",
            url: base_url+"/auth/register",
            data: {
              name:username,
              email,
              password,
              dob:date
            },
          })
            .then(() => {
              alert("Registration successful")
              setEmail("")
              setPassword("")
              setLoginForm(true)
              setBtnText("Register")
            })
            .catch((err) => alert(err.message));
    
    };

    const formChanger = ()=>{
        setLoginForm(!loginForm);
        setBtnText(btnText==="Login"?"Register":"Login");
    }

    return (
        <div className="login__emailPass">
            { loginForm ? 
                <>
                    <div className="login__label">
                        <h4>Login</h4>
                    </div>
                    <div className="login__inputFields">
                    <div className="login__inputField">
                        <input
                        className={
                            emailField
                            ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                email
                                )
                                ? ""
                                : "input-border-email-red"
                            : ""
                        }
                        value={email}
                        onChange={(e) => {
                            SetEmailField(true);
                            setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Email"
                        />
                    </div>
                    <div className="login__inputField">
                        <input
                        className={
                            passwordField
                            ? password.length < 6
                                ? "input-border-email-red"
                                : ""
                            : ""
                        }
                        value={password}
                        onChange={(e) => {
                            SetPasswordField(true);
                            setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        />
                    </div>
                    </div>
                    <div className="login__forgButt">
                    <small>Forgot Password?</small>
                    <button onClick={loginHandler}>Login</button>
                    </div>
                </>
            : (
                <>
                    <div className="login__label">
                        <h4>Login</h4>
                    </div>
                    <div className="login__inputFields">
                        <div className="login__inputField">
                            <input
                            className={
                                usernameField
                                ? /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/.test(
                                    username
                                    )
                                    ? ""
                                    : "input-border-username-red"
                                : ""
                            }
                            value={username}
                            onChange={(e) => {
                                SetUsernameField(true);
                                setUsername(e.target.value);
                            }}
                            type="text"
                            placeholder="Username"
                            />
                        </div>
                        <div className="login__inputField">
                            <input
                            className={
                                emailField
                                ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                    email
                                    )
                                    ? ""
                                    : "input-border-email-red"
                                : ""
                            }
                            value={email}
                            onChange={(e) => {
                                SetEmailField(true);
                                setEmail(e.target.value);
                            }}
                            type="text"
                            placeholder="Email"
                            />
                        </div>
                        <div className="login__inputField">
                            <input
                            className={
                                passwordField
                                ? password.length < 6
                                    ? "input-border-email-red"
                                    : ""
                                : ""
                            }
                            value={password}
                            onChange={(e) => {
                                SetPasswordField(true);
                                setPassword(e.target.value);
                            }}
                            type="password"
                            placeholder="Password"
                            />
                        </div>
                        <div className="login__inputField">
                            <input
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            type="date"
                            placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="login__forgButt">
                    <button onClick={registerHandler}>Register</button>
                    </div>
                </>
            )
            
            }
            
            <button onClick={formChanger}>{btnText}</button>
          </div>
    )
}

export default withRouter(Form)
