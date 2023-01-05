import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import { useParams } from "react-router-dom";
import SkuDetail from "../SkuDetails";
import React from "react";
import Header from "../../components/Header";
import BarcodeReader from 'react-barcode-reader'
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/core/styles";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const UserContext = React.createContext();

const SkuScanner = ({ store, setStore }) => {
    // console.log(SkuDetail);
    const navigate = useNavigate();
    const param = useParams();
    const [openf1Modal, setOpenF1Modal] = useState(false);
    const [openf2Modal, setOpenF2Modal] = useState(false);
    const [openf4Modal, setOpenF4Modal] = useState(false);
    const [openf7Modal, setOpenF7Modal] = useState(false);
    const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
    const [data, setdata] = useState()
    const [sku, setsku] = useState()
    // console.log(param)

    const tokenData = localStorage.getItem("Token")
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
      };

    const getApi = () => {
        if (tokenData == undefined) {
            console.log("token wrong")
        } else {
            const jsondata = {
                headers: {
                    Authorization: "Bearer" + " " + tokenData,
                },
                owner: localStorage.getItem("owner"),
                warehouse: localStorage.getItem("warehouse"),
                altsku: data
            }

            axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/altsku", jsondata)
                .then(res => {
                    console.log(res);
                    if (res.status == '200') {
                        // navigate("/menu")
                        console.log(res.data.sku);
                        setsku(res.data.sku);
                        setdata("");
                        setStore([...store, res.data.sku])
                    }
                    // else{
                    //     alert("enter vaild owner");
                    // }
                })
                .catch(err => {
                    console.log(err)
                    setOpenError(true)
        setMessage("invalid Sku")
                })

        }
    }


    document.onkeydown = function (e) {
        console.log(e.key);
        if (e.key == "Meta") {
            e.preventDefault();
            setOpenF1Modal(true)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
        } else if (e.key == "F2") {
            setOpenF1Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(true)
        } else if (e.key == "F4") {
            setOpenF1Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(true)
        } else if (e.key == "F7") {
            setOpenF7Modal(true)
            setOpenF1Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            SkuTable();

        } else if (e.key == "Escape") {
            navigate("/")
        }
        else if (e.key == "Tab") {
            navigate("/menu")
        }
        else if (e.key == "Enter") {
            console.log("enter")
            console.log(data);
            if (data == "" || data == undefined) {
                handlescan();
                // console.log("hi guys")
                // (e)=>handleScan(e)

            } else {
                getApi()
                // setStore([...store, sku])
                console.log(data);
                // navigate('/sku')
            }
            console.log(store);

        }
    };
    function keyEvents(key) {
        console.log(key + "Line 7");
        if (key == "Meta") {
            setOpenF1Modal(true)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
        } else if (key == "F2") {
            setOpenF1Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(true)
        } else if (key == "F4") {
            setOpenF1Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(true)
        } else if (key == "F7") {
            setOpenF7Modal(true)
            setOpenF1Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            SkuTable();
        } else if (key == "Escape") {
            navigate("/")
        }
    }
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    const inputhandleChange = (e) => {
        // setdata(e.target.value)
        const { name, value } = e.target
        console.log("called onchange");
        // setdata({ ...data, [name]: value })
        setdata(e.target.value)
    }
    const handlescan = (e) => {
        // alert("hi " + e)
        // setdata(e)
    }
    const handleError = (err) => {
        console.error(err)
    }
    const ConfirmData =()=>{
        navigate('/sku')
    }
  const ClearData =()=>{
    if(store.length!=0){
        setStore([])
        setdata("")
        setsku("")
        setOpenF4Modal(false)
    }
    else{
        alert("Data is already Empty")
        setOpenF4Modal(false)
    }
   
  }
  const SkuTable=()=>{
    if(store.length==0){
        alert("Data is Empty")
    }
    else{
        navigate('/sku')

    }
  }
    //     document.onkeydown=(e)=>{
    // console.log(e.key)
    //     }
    // const Submitdata = () => {
    //     console.log(data);
    //     if (data == "") {
    //         alert("please enter something")
    //         // setcount(count + 0)
    //     } else {
    //         setStore([...store, data])
    //         // setcount(count + 1)
    //     }

    // }
    console.log(store);

    // console.log(store.map(res=>{console.log(res.skudata)}));
    return (
        <div>
            
            <Header title="Scan Sku" />
            <div style={{
                display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center", width: "100%", height: "50%"
            }}>
                <div className="card" style={{ width: "58ch",minHeight:"100px", padding: "20px" ,marginTop:"30px"}}>
                    <div className='selectdata'>
                        <span>Scan SKU/EAN</span>
                <input type="text" name="skudata" value={data} onChange={inputhandleChange}></input>
            
                    </div>
                    <div className="card" style={{ width: "51ch" ,minHeight:"100px", padding: "20px" ,marginTop:"30px"}}>
                    {store.length == 0 ? ("") : (<h5><span>Last Scan: </span>{store.length === 0 ? "" : store[store.length - 1]}</h5>)}
                <hr style={{ display: 'none' }} />
                <h5>Counter:{store.length}</h5>
                    
                    </div>
                    
                </div>
            </div>
            
            <BarcodeReader
                onError={handleError}
                onScan={(e) => handlescan(e)
                }
            />
            <div className="footer">
                <button onClick={(e) => keyEvents("Meta")} className="F-button"><span>F1</span></button>
                <button onClick={(e) => keyEvents("F2")} className="F-button"><span>F2</span></button>
                <button onClick={(e) => keyEvents("F4")} className="F-button"><span>F4</span></button>
                <button onClick={(e) => keyEvents("F7")} className="F-button"><span>F7</span></button>
            </div>

            {openf1Modal == true ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold" ,color:"white" }}>Help</h2>
                        <img src={require('../../assets/images/close.png')} className="cancelSign" height="10px" width="10px" onClick={() => setOpenF1Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            {/* <h3 className="dialogTitle">RCC01</h3>
                            <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3> */}
                            <h3 className="dialogTitle">F1=<span className="dialogTitle">About</span></h3>
                            <h3 className="dialogTitle">F2=<span className="dialogTitle">Confirm Sku</span></h3>
                            <h3 className="dialogTitle">F4=<span className="dialogTitle">Delete Sku</span></h3>
                            <h3 className="dialogTitle">F7=<span className="dialogTitle">Display Sku</span></h3>

                            <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>



                        </div>
                    </div>
                </div>
            ) : ("")}
            {openf2Modal ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold",color:"white" }}>Confirm Data</h2>
                        <img src={require('../../assets/images/close.png')} className="cancelSign" height="20px" width="20px" onClick={() => setOpenF2Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <button onClick={ConfirmData}>Confirm</button>
                            <button onClick={() => setOpenF2Modal(false)}>Cancel</button>

                        </div>
                        
                    </div>
                </div>
            ) : ("")}
            {openf4Modal ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold",color:"white" }}>Clear All Data</h2>
                        <img src={require('../../assets/images/close.png')} className="cancelSign" height="20px" width="20px" onClick={() => setOpenF4Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <button className="w-25" onClick={ClearData}>Yes</button>
                            <button className="w-25" onClick={() => setOpenF4Modal(false)}>No</button>

                        </div>
                        
                    </div>
                </div>
            ) : ("")}
            

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

export default SkuScanner;
