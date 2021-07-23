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

  // const [cookies, setCookie, removeCookie] = useCookies([
  //   "id",
  //   "token",
  //   "type_tutor",
  //   "type_parent",
  // ]);

  // useEffect(() => {
  //   if (cookies["token"]) {
  //     history.push("/");
  //   }
  // }, [cookies["token"]]);

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

    // fetch("http://localhost:8000/findTutor/getToken/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(args),
    // }).then((response) => {
    //   if (response.ok) {
    //     const data_from_response = response.json();
    //     data_from_response.then((data) => {
    //       setCookie("id", data.id);
    //       setCookie("type_parent", data.type_parent);
    //       setCookie("token", data.token);
    //       setCookie("type_tutor", data.type_tutor);
    //     });
    //   } else {
    //     alert("username or password is incorrect.");
    //   }
    // });
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
