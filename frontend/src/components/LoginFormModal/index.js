import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogIn = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    )
      .then(closeModal)
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <p>Username or Email</p>
        <label>
          <input
            type="text"
            value={credential}
            // placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <p>Password</p>
        <label>
          <input
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-button-div">
        <button className="login-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        </div>
        <div className="demo">
        <button className="demo-button" type="submit" onClick={handleDemoLogIn}>
          Log in as Demo User
        </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
