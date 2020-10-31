import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth, provider } from "./Firebase";
import "./Login.css";
import firebase from "firebase";
import wavetop from "./wave-top.svg";
import wavebottom from "./wave-bottom.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");
  const [OR, setOR] = useState(0);
  const [confirmationResult, setResult] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  auth.onAuthStateChanged((authUser) => {
    if (authUser) history.push("/");
  });

  const Elogin = (e) => {
    e.preventDefault();
    if (email.length > 0 && pass.length > 0) {
      if (pass.length >= 6) {
        auth
          .signInWithEmailAndPassword(email, pass)
          .catch((err) => setError(err.message));
      } else {
        setError("Password Must Have Atleast 6 Characters");
      }
    } else {
      setError("Empty Input Feild(s)");
    }
  };

  const showChaptcha = () => {
    if (number.length > 0) {
      if (number.length === 10) {
        setBtnDisabled(true);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "send__otp",
          {
            size: "invisible",
            callback: function (response) {
              console.log("Captcha Done");
              setError("Sending OTP");
            },
          }
        );
        auth
          .signInWithPhoneNumber(`+91${number}`, window.recaptchaVerifier)
          .then((confirmationResult) => {
            setResult(confirmationResult);
            setError("OTP SENT");
          })
          .catch((err) => {
            setBtnDisabled(false);
            setError(err.message);
          });
      } else {
        setError("Invalid Number");
      }
    } else {
      setError("Empty Input Feild(s)");
    }
  };

  const Nlogin = () => {
    if (code.length > 0) {
      confirmationResult
        .confirm(code)
        .then(function (result) {
          // User signed in successfully.
          var user = result.user;
          console.log(user.phoneNumber);
          // ...
        })
        .catch(function (error) {
          console.log("Incorrect OTP!");
        });
    } else {
      setError("Enter OTP");
    }
  };

  const Glogin = () => {
    auth.signInWithPopup(provider).catch(console.error());
  };

  const setOr = (or) => {
    setOR(or);
  };

  return (
    <div className="login">
      <img className="login__top" src={wavetop} alt="" />
      <img className="login__bottom" src={wavebottom} alt="" />

      <div className="login__con">
        <h1>LogIn</h1>
        <div className="login__mCon">
          {error ? <span className="login__error">{error}</span> : <></>}
          <div className="login__input">
            {OR === 0 ? (
              <>
                <label htmlFor="email">
                  Enter Email
                  <span className="login__or" onClick={() => setOr(1)}>
                    Use Number?
                  </span>
                </label>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <label htmlFor="number">
                  Enter Number
                  <span className="login__or" onClick={() => setOr(0)}>
                    Use Email?
                  </span>
                </label>
                <input
                  name="number"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />

                <Button
                  id="send__otp"
                  onClick={showChaptcha}
                  disabled={btnDisabled}
                >
                  Send OTP
                </Button>
              </>
            )}
          </div>
          <div className="login__input">
            {OR === 0 ? (
              <>
                <label htmlFor="pass">Enter Password</label>
                <input
                  name="pass"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </>
            ) : (
              <>
                <label htmlFor="code">Enter OTP</label>
                <input
                  name="code"
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </>
            )}
          </div>
          <div className="login__buttons">
            <Button id="sign-up-button" onClick={OR === 0 ? Elogin : Nlogin}>
              LogIn
            </Button>
            <Button onClick={Glogin}>Google</Button>
          </div>
          <div className="login_register">
            <Link to="/register">Don't have a account? SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
