import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { login } from "./authSlice";

const selectToken = (state) => state.auth.token;

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const handleSubmit = () => {
    const args = {
      username: username,
      password: password,
    };

    dispatch(login(args));
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br></br>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br></br>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
