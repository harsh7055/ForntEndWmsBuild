import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import { useParams } from "react-router-dom";
import SkuDetail from "../SkuDetails";
import React from "react";
import Header from "../../components/Header";
import BarcodeReader from 'react-barcode-reader'

export const UserContext = React.createContext();

const Menu = ({ store, storeData }) => {
    // console.log(SkuDetail);
    const navigate = useNavigate();
    const param = useParams();
    const [openf1Modal, setOpenF1Modal] = useState(false);
    const [openf2Modal, setOpenF2Modal] = useState(false);
    const [openf4Modal, setOpenF4Modal] = useState(false);
    const [openf7Modal, setOpenF7Modal] = useState(false);
    const [data, setdata] = useState()
    console.log(param)
    const handlescan = (e) => {
        // alert("hi " + e)
        setdata(e)
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
                storeData([...store, data])
                // setcount(count + 1)
                // setdata(intialState)
                setdata("")
                console.log(data);
                // navigate('/sku')
            }
            console.log(store);
            // if (data.skudata == undefined || data.skudata === "") {
            //     handleScan();
            // } else {
            //     console.log(data + "//////////////")
            //     console.log(data + "//////////////")
            //     // setdata(intialState)
            //     storeData([...store, data])
            //     // setcount(count + 1)
            //     setdata(intialState)
            //     console.log(data);
            //     // navigate('/sku')
            // }
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
            navigate("/sku")
        } else if (key == "Escape") {
            navigate("/")
        }
    }
    const handleError = (err) => {
        console.error(err)
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
        // setdata({ ...data, [name]: value })
        setdata(e.target.value)
    }
    //     document.onkeydown=(e)=>{
    // console.log(e.key)
    //     }
    const Submitdata = () => {
        console.log(data);
        if (data == "") {
            alert("please enter something")
            // setcount(count + 0)
        } else {
            storeData([...store, data])
            // setcount(count + 1)
        }

    }
    console.log(store);

    // console.log(store.map(res=>{console.log(res.skudata)}));
    return (
        <div>
            <div id="mySidenav" className="sidenav">
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
            <Header title={param.id} />
            <div className="menuPage">
            <span>{param.id}</span>
                <input type="text" name="skudata" value={data} onChange={inputhandleChange}></input>
            </div>
            <div className="counter">
                {/* <h1><span>Your last Scan Value: </span>{store.length === 0 ? "" : store[store.length - 1]}</h1> */}
                {store.length==0?(""):(<h1><span>Your last Scan Value: </span>{store.length === 0 ? "" : store[store.length - 1]}</h1>)}
                <hr style={{ display: 'none' }} />
                <h1>Counter:{store.length}</h1>
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
                        <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>F1 Modal</h2>
                        <img src={require('../../assets/images/close.png')} height="20px" width="20px" onClick={() => setOpenF1Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <h3 className="dialogTitle">RCC01</h3>
                            <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3>
                            <h3 className="dialogTitle">F1=<span className="dialogTitle">Display about dialog</span></h3>
                            <h3 className="dialogTitle">F2=<span className="dialogTitle">Display lookup screen</span></h3>
                            <h3 className="dialogTitle">F11=<span className="dialogTitle">Display messaging screen</span></h3>
                            <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>



                        </div>
                    </div>
                </div>
            ) : ("")}
            {openf2Modal ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>F2 Modal</h2>
                        <img src={require('../../assets/images/close.png')} height="20px" width="20px" onClick={() => setOpenF2Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <h3 className="dialogTitle">RCC01</h3>
                            <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3>
                            <h3 className="dialogTitle">F1=<span className="dialogTitle">Display about dialog</span></h3>
                            <h3 className="dialogTitle">F2=<span className="dialogTitle">Display lookup screen</span></h3>
                            <h3 className="dialogTitle">F11=<span className="dialogTitle">Display messaging screen</span></h3>
                            <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>

                            <h3 className="dialogTitle">F7=<span className="dialogTitle">Close ASN </span></h3>
                        </div>
                    </div>
                </div>
            ) : ("")}
            {openf4Modal ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>F4 Modal</h2>
                        <img src={require('../../assets/images/close.png')} height="20px" width="20px" onClick={() => setOpenF4Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <h3 className="dialogTitle">RCC01</h3>
                            <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3>
                            <h3 className="dialogTitle">F1=<span className="dialogTitle">Display about dialog</span></h3>
                            <h3 className="dialogTitle">F2=<span className="dialogTitle">Display lookup screen</span></h3>
                            <h3 className="dialogTitle">F11=<span className="dialogTitle">Display messaging screen</span></h3>
                            <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>

                            <h3 className="dialogTitle">F7=<span className="dialogTitle">Close ASN </span></h3>
                        </div>
                    </div>
                </div>
            ) : ("")}
            {openf7Modal ? (
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>F4 Modal</h2>
                        <img src={require('../../assets/images/close.png')} height="20px" width="20px" onClick={() => setOpenF4Modal(false)} />
                    </div>
                    <div className="modalContent">
                        <div>
                            <h3 className="dialogTitle">RCC01</h3>
                            <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3>
                            <h3 className="dialogTitle">F1=<span className="dialogTitle">Display about dialog</span></h3>
                            <h3 className="dialogTitle">F2=<span className="dialogTitle">Display lookup screen</span></h3>
                            <h3 className="dialogTitle">F11=<span className="dialogTitle">Display messaging screen</span></h3>
                            <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>

                            <h3 className="dialogTitle">F7=<span className="dialogTitle">Close ASN </span></h3>
                        </div>
                    </div>
                </div>
            ) : ("")}


        </div>
    );
};

export default Menu;
