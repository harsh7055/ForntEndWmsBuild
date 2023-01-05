import React, { useEffect, useState } from "react";
import './index.styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
      width: '25%',
    },
  },
}));
const Login = () => {
  const navigate = useNavigate()
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const inputUserName = (e) => {
    const { name, value } = e.target;
    setUsername(value)
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const inputPasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(value)
  }
  // console.log(username, password);
  const SignInDirect = () => {
    navigate("/warehouse")
  }
  const SignIn = (e) => {
    e.preventDefault();
    // navigate("warehouse")


    const jsonData = {
      "grant_type": "password",
      username: username,
      password: password
    }

    // https://mingle-sso.se1.inforcloudsuite.com:443

    // const url = "http://ec2-15-152-33-235.ap-northeast-3.compute.amazonaws.com:8000/api";
    // const url = "http://localhost:8000/auth";
    const url = "http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/auth";

    axios.post(url, jsonData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("Token", res.data.access_token);
        navigate("warehouse")
        if (res.status == "200") {
          localStorage.setItem("Token", res.data.access_token)
          localStorage.setItem("UserName", username)
          setMessage("user authitcated");
          setOpenSuccess(true);
          navigate("/warehouse")
        } else {
          alert(res.status)
          localStorage.clear();
          // localStorage.clear();
        }
      })
      .catch(err => {
        // navigate("/warehouse")
        setOpenError(true)
        setMessage("invalid Credential")
      })
  }
  // console.log(JSON.stringify(localStorage.getItem("Token")))
  return (
    <div className="container1">
      <form className="card"   style={{ width: "38ch", padding: "20px" }}>
        <div className="imageContainer">
          <img className="logoImg" src={require("../../assets/images/trangilelogo.jpeg")}></img>
        </div>
        <br></br>
        <TextField required id="standard-required" label="Username" name="uname" onChange={inputUserName}/>
        <br />
        <TextField required id="standard-required" label="Password" type="password" name="pass"  onChange={inputPasswordChange}/>
        <br></br>
        <p>Forget Password ?</p>
        <button onClick={SignIn}>Sign In</button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openWarning}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" >
          <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Login;