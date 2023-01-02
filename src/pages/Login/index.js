import React, { useState } from "react";
import './index.styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputUserName = (e) => {
    const { name, value } = e.target;
    setUsername(value)
  }
  const inputPasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(value)
  }
  // console.log(username, password);
  const SignIn = (e) => {
    e.preventDefault();
    // navigate("warehouse")

    const jsonData = {
      "grant_type": "password",
      username: username,
      password: password
    }
   
    // https://mingle-sso.se1.inforcloudsuite.com:443

    const url = "http://ec2-15-152-33-235.ap-northeast-3.compute.amazonaws.com:8000/api";
    axios.post(url, jsonData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("Token", res.data.access_token);
        navigate("warehouse")
        if (res.status == "200") {
          console.log(res);
          localStorage.setItem("Token", res.data.access_token)
          localStorage.setItem("UserName", username)

          navigate("/warehouse")
        } else {
          alert(res.status)
          localStorage.clear();
          // localStorage.clear();
        }
      })
      .catch(err => console.log(err))
  }
  // console.log(JSON.stringify(localStorage.getItem("Token")))
  return (
    <div className="container1">
      <div className="rightcontainer">
        <img
          src={require("../../assets/images/trangilelogo.jpeg")}
          alt="trangileimages"
        />
        <form>
          <div className="input-container">
            <input type="text" name="uname" required placeholder="Username" onChange={inputUserName} />
          </div>
          <div className="input-container">
            <input type="password" name="pass" required placeholder="Password" onChange={inputPasswordChange} />
          </div>
          <div className="buttoncontainer">
            <p>Forget Password?</p>
          {/* <button className="buttonSignIn" onClick={() => navigate("warehouse")}>Sign In </button> */}

            <button onClick={SignIn}>Sign In</button>

          </div>
          <div className="buttonContainer">

          </div>

        </form>
      </div>
    </div>
  );
};
export default Login;