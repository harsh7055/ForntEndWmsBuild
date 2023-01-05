import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { postAuthO } from "../../api/authO";
import axios from "axios";
// import Barcode from "../../components/BarcodeReader/Barcode";
import BarcodeReader from 'react-barcode-reader'
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
import { makeStyles } from "@material-ui/core/styles";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LocationScan = () => {
    const navigate = useNavigate();
    // const [location, setlocation] = useState()
    // const [tokenData, setTokenData] = useState();
    const [result, setResult] = useState("")
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);



    const InputHandleChange = (e) => {
        const { name, value } = e.target
        // setlocation({ ...location, [name]: value })
        // setlocation(value)
        setResult(value)
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
      };
    const Submitdata = (e) => {
        e.preventDefault();
        // setlocation(location)
        if(result !=""){
        navigate("/skuscanner/" + result.location)
        }
    }
    // const tokenData=localStorage.getItem("Token")
    // const getApi = () => {
    //     if (tokenData == undefined) {
    //         console.log("token wrong")
    //     } else {
    //         const jsondata = {
    //             headers: {
    //                 Authorization: "Bearer" + " " + tokenData
    //             },
    //             location:result
    //         }
    //         console.log(jsondata)
    //         axios.post("http://localhost:8000/location", jsondata)
    //             .then(res => {
    //                 console.log(res);
    //             })
    //     }
      


    // }
   


    return (
        <div>
            <Header title="Location Scan" />
            <div style={{
               display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center" , marginTop:"3%",width: "100%", height: "50%"
            }}>
                <div className='card' style={{ minWidth: "350px", height: "150px" }}>
                <div className='selectDiv'  style={{ display: "flex", justifyContent: "center", flexDirection: "column",
                alignItems: "center"}} >
                    <div className='selectdata'  style={{ display: "flex", justifyContent: "center", flexDirection: "row",
                alignItems: "center",marginTop:"3%"}}>
                         <label className="recieptLabel">Location#</label>
                <input type="text" name="datavalue" value={result} required  onChange={InputHandleChange} />


                    </div>
                    

                    <div>
                    </div>
                </div>
                </div>
                

            </div>
            {

            }
            <div >
            <Footer result={result} setResult={setResult} />

            </div>
         
        </div>
    );
};

export default LocationScan;

                 


{/* <select style={{width:"200px"}} onChange={InputHandleChange} name="location" className="form-control">
<option>select location</option>
<option value="location-1">location-1</option>
<option value="location-2">location-2</option>
<option value="location-3">location-3</option>
<option value="location-4">location-4</option>
<option value="location-5">location-5</option>
</select> */}



// https://mellifluous-eclair-397731.netlify.app/