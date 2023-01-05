import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "./index.styles.css";
import Header from '../../components/Header';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/core/styles";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Owner() {
    
    const navigate = useNavigate();
    const tokenData = localStorage.getItem("Token");
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);

    // const [select, setselect] = useState({})
    const handleSelect = (e) => {
        localStorage.setItem("owner", e.target.value)
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };


    const handleSubmit = (e) => {
        console.log()
        e.preventDefault()
        const jsondata = {
            headers: {
                Authorization: "Bearer" + " " + tokenData,
            },
            owner: localStorage.getItem("owner"),
            warehouse: localStorage.getItem("warehouse")
        }

        axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/ownerValidate", jsondata)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    navigate("/locationScan")
                }
                // else{
                //     alert("enter vaild owner");
                // }
            })
            .catch(err => {
                console.log(err)
                setOpenError(true)
                setMessage("invalid Owner")
            })



    }
    return (
        <div>

            <Header title="Owner" />
            <div style={{
               display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center" , width: "100%", height: "50%"
            }}>
                <div className='card' style={{ width: "40%", height: "160px" ,marginTop:"3%", paddingBottom:"14%"}}>
                <div className='selectDiv'  style={{ display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center"}} >
                    <div className='selectdata'  style={{ display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center"}}>
                        <label style={{textAlign:"left" ,width:"93%"}} class='form-conrol mb-1'>Enter Owner</label>
                        
                        <input style={{width:"100%"}} class='form-control' onChange={handleSelect} name="owner" type='text'  />


                    </div>
                    <button style={{width:"100px" ,marginTop:"2%"}} onClick={handleSubmit}>submit</button>
                    <div>
                    </div>
                </div>
                </div>
                

            </div>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openWarning}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="warning">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openError}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
                </Alert>
            </Snackbar>
        </div>
    )
}