import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.styles.css";
import Header from '../../components/Header';
import axios from "axios"
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/core/styles";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function WareHouse() {
    const navigate = useNavigate();
    const [select, setselect] = useState({})
    const [wareHouseData, setWareHouseData] = useState([])
    const tokenData = localStorage.getItem("Token");
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);

    const jsondata = {
        headers: {
            Authorization: "Bearer" + " " + tokenData
        }
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    useEffect(() => {
        axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/warehouse", jsondata)
            .then(res => {
                console.log(res)
                setWareHouseData(res.data)
                // setMessage("Ahhhjbxvjdg")
                // setOpenSuccess(true)
            })
            .catch(err => {
                setOpenError(true)
                setMessage("warehouse data is not fetched")
            })
    }, [])

    const handleSelect = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setselect({ ...select, [name]: value })
    }
    console.log(select)
    localStorage.setItem("warehouse", select.warehouse)

    const handleSubmit = (e) => {
        console.log()
        e.preventDefault()
        if (select.warehouse) {
            navigate("/owner/" + select.warehouse)
            // navigate('/barcodeReader')
        }
    }



    return (
        <div>
            <Header title="Warehouse" />
            <div style={{
                display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center", width: "100%", height: "50%"
            }}>
                <div className="card" style={{ width: "58ch",minHeight:"100px", padding: "20px" ,marginTop:"30px"}}>
                    <div className='selectdata'>
                        <select onChange={handleSelect} name="warehouse" className="form-control">
                            <option value="0">Select WareHouse</option>
                            {wareHouseData.map((res) => (
                                <option value={res.db_name}>{res.db_alias}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,width:"100%"}} >
                        <button style={{width:"100px" ,marginTop:"2%"}} onClick={handleSubmit}>submit</button>
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



// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import "./index.styles.css";
// import Header from '../../components/Header';
// import axios from "axios"
// export default function WareHouse() {
//     const navigate = useNavigate();
//     const [select, setselect] = useState({})
//     const handleSelect = (e) => {
//         e.preventDefault();
//         const { name, value } = e.target
//         setselect({ ...select, [name]: value })
//     }
//     console.log(select)
//     localStorage.setItem("warehouse", select.warehouse)
//     localStorage.setItem("owner", select.owner)
//     const tokenData = localStorage.getItem("Token");
//     const jsondata = {
//         headers: {
//             Authorization: "Bearer" + " " + tokenData
//         }
//     }
//     useEffect(() => {
//         axios.post("http://localhost:8000/warehouse", jsondata)
//             .then(res => {
//                 console.log(res)
//                 setWareHouseData(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, [])
    //     const handleSubmit = (e) => {
    //         console.log()
    //         e.preventDefault()
    //         const jsondata = {
    //             headers: {
    //                 Authorization: "Bearer" + " " + tokenData,
    //             },
    //             SelectOwner: select
    //         }
//         // navigate("/home/" + select.warehouse + "/" + select.owner)
//         // navigate('/barcodeReader')
//         axios.post("http://localhost:8000/ownerValidate", jsondata)
//             .then(res => {
//                 console.log(res);
//             })
//             .catch(err => console.log(err))
//     }
//     return (
//         <div>
//             <Header title="Warehouse" />
//             <div className='selectDiv'>
//                 <div className='selectdata'>
//                     <select onChange={handleSelect} name="warehouse" className="form-control">
//                         {wareHouseData.map((res) => (
//                             <option value={res.db_name}>{res.db_alias}</option>
//                         ))}
//                     </select>

//                 </div>
//                 <div className='selectdata'>
//                     <select onChange={handleSelect} name="owner" className="form-control">
//                         <option>select owner</option>
//                         <option value="UCB">UCB</option>
//                         <option value="MONIN">MONIN</option>
//                     </select>
//                 </div>
//                 <div>
//                     <button onClick={handleSubmit}>submit</button>
//                 </div>
//             </div>
//         </div>
//     )
// }