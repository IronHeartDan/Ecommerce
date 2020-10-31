import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth, provider } from "./Firebase";
import "./Login.css";
import wavetop from "./wave-top.svg";
import wavebottom from "./wave-bottom.svg";

function Register() {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState(0);
  const [OR, setOR] = useState(0);
  const [error, setError] = useState("");
  const history = useHistory();

  const Eregister = () => {
    if (email.length > 0 && pass.length > 0) {
      if (pass.length >= 6) {
        auth
          .createUserWithEmailAndPassword(email, pass)
          .catch((err) => setError(err.message));
      } else {
        setError("Password Must Have Atleast 6 Characters");
      }
    } else {
      setError("Empty Input Feild(s)");
    }
  };

  const Nregister = () => {
    console.log("Nregister");
  };

  auth.onAuthStateChanged((authUser) => {
    if (authUser) history.push("/");
  });

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
        <h1>SignUp</h1>
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
                <label htmlFor="code">Enter Code</label>
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
            <Button
              id="sign-up-button"
              onClick={OR === 0 ? Eregister : Nregister}
            >
              SignUp
            </Button>
            <Button onClick={Glogin}>Google</Button>
          </div>
          <div className="login_register">
            <Link to="/login">Have a account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
