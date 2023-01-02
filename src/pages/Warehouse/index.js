import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.styles.css";
import Header from '../../components/Header';

export default function WareHouse() {
    const navigate = useNavigate();
    const [select, setselect] = useState({})
    const handleSelect = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setselect({ ...select, [name]: value })
    }
    console.log(select)
    localStorage.setItem("warehouse",select.warehouse)
    localStorage.setItem("owner",select.owner)

    const handleSubmit = (e) => {
        console.log()
        e.preventDefault()
        if (select.warehouse && select.owner) {
            navigate("/home/" + select.warehouse + "/" + select.owner)
            // navigate('/barcodeReader')
        }
    }
    return (
        <div>
           
            <Header title="Warehouse"/>

            <div className='selectDiv'>
            <div className='selectdata'>
                <select onChange={handleSelect} name="warehouse" className="form-control">
                    <option>select warehouse</option>
                    <option value="warehouse-1">warehouse-1</option>
                    <option value="warehouse-2">warehouse-2</option>
                    <option value="warehouse-3">warehouse-3</option>
                    <option value="warehouse-4">warehouse-4</option>
                    <option value="warehouse-5">warehouse-5</option>
                </select>
                
            </div>
            <div className='selectdata'>
                <select onChange={handleSelect} name="owner" className="form-control">
                    <option>select owner</option>
                    <option value="owner-1">owner-1</option>
                    <option value="owner-2">owner-2</option>
                    <option value="owner-3">owner-3</option>
                    <option value="owner-4">owner-4</option>
                    <option value="owner-5">owner-5</option>
                </select>
            </div>
            <div>
                <button  onClick={handleSubmit}>submit</button>
            </div>
            </div>
        </div>
    )
}