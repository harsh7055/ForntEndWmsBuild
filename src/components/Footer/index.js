import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '../Modal';
import BarcodeReader from 'react-barcode-reader'


    const Footer = ({result,setResult}) => {
    const navigate = useNavigate();
    const [openf1Modal, setOpenF1Modal] = useState(false);
    const [openf2Modal, setOpenF2Modal] = useState(false);
    const [openf4Modal, setOpenF4Modal] = useState(false);
    const [openf7Modal, setOpenF7Modal] = useState(false);
    const [barcode, setBarcode] = useState(false);

    document.onkeydown = function (e) {
        
        console.log(e.key);
        if (e.key == "F1") {
            setOpenF1Modal(true)
        } else if (e.key == "F2") {
            setOpenF2Modal(true)
        } else if (e.key == "F4") {
            setOpenF4Modal(true)
        } else if (e.key == "F7") {
            setOpenF7Modal(true)
        } else if (e.key == "Escape") {
            navigate("/")
        }
        else if (e.key == "Tab") {
            navigate("/menu")
        }
        else if(e.key == "Enter") {
        //     setBarcode(true);
        //   console.log(result);
        if (result == undefined || result == "") {
            // alert("hi scan is working")
            handleScan();
        } else {
            // navigate("/menu/" + result)
            navigate("/locatinMenu/"+ result)
        }
          
        }

    };

    function keyEvents(key) {
        setOpenF1Modal(false)
        setOpenF2Modal(false)
        setOpenF4Modal(false)
        setOpenF7Modal(false)


        if (key == "F1") {
            setOpenF1Modal(true)
        } else if (key == "F2") {
            setOpenF2Modal(true)
        } else if (key == "F4") {
            setOpenF4Modal(true)
        } else if (key == "F7") {
            setOpenF7Modal(true)
        } else if (key == "Escape") {
            navigate("/")
        }
        else if (key == "Tab") {
            navigate("/menu")
        }

    }
    const handleScan=(data)=>{
        // console.log("hi"+data)
        // alert(d)
        setResult(data)

       
      }
     const handleError=(err)=>{
        console.error(err)
      }
    const arr=["F1","F2","F4","F7"];
    return (
        <>
         
         {/* {
            (barcode==true)?(<><BarcodeReader
                onError={handleError}
                onScan={handleScan}
            />
            <h1>working</h1>
            </>):(<h1>not working</h1>)
         } */}
         <BarcodeReader
                onError={handleError}
                onScan={handleScan}
            />
            <div className="footer">
                {
                    arr.map((ele)=>
                    <button onClick={(e) => keyEvents(`${ele}`)} className="F-button"><span>{ele}</span></button>
                    )
                }
               

            </div>
            {openf1Modal ? (
                <Modal heading="F1 Modal" closeModal={setOpenF1Modal} />
            ) : ("")}
            {openf2Modal ? (

                <Modal heading="F2 Modal" closeModal={setOpenF2Modal} />
            ) : ("")}
            {openf4Modal ? (
                <Modal heading="F4 Modal" closeModal={setOpenF4Modal} />

            ) : ("")}
            {openf7Modal ? (
                <Modal heading="F7 Modal" closeModal={setOpenF7Modal} />

            ) : ("")}

        </>
    )

}

export default Footer







// https://musical-clafoutis-821a9a.netlify.app/