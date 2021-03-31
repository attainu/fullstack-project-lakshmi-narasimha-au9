import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { login } from "../../features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [emailField, SetEmailField] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordField, SetPasswordField] = useState(false);

  const dispatch = useDispatch();

  const loginHandler = () => {
    Axios({
      method: "POST",
      url: "https://serene-coast-48146.herokuapp.com",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        dispatch(login(res.data.token));
      })
      .catch((err) => alert(err.message));
  };

  const registerSignIn = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
            alt=""
          />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "25px" }}>
            HandCrafted by{" "}
          </p>
          <h3>Sujay + Lucky</h3>
        </div>
        <div className="login__auth">
          <div className="login__authOptions">
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p>Continue With Google</p>
            </div>
            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png"
                alt=""
              />
              <span>Continue With Facebook</span>
            </div>
            <div className="login__authDesc">
              <p>
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up With Email
                </span>
                . By continuing you indicate that you have read and agree to
                Quora's
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Terms of Service{" "}
                </span>
                and{" "}
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
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
            <button onClick={registerSignIn}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; Quora Fake Inc. 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
