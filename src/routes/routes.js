import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Scanner from "../components/Scanner";
import SkuDetail from "../pages/SkuDetails";
import WareHouse from "../pages/Warehouse";
import Barcode from "../components/BarcodeReader/Barcode";
import LocationMenu from "../pages/LocationMenu/LocationMenu";

export default function Router() {
  const [store, storeData] = useState([])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:warehouse/:value" element={<Home />} />
        <Route path="/menu/:id" element={<Menu store={store} storeData={storeData} />} />
        <Route path="/" element={<Scanner />} />
        <Route path="/warehouse" element={<WareHouse />} />
        <Route path="/sku" element={<SkuDetail store={store} />} />
        <Route path="/barcodeReader" element={<Barcode />} />
        <Route path="/locatinMenu/:id" element={<LocationMenu />} />


      </Routes>
    </BrowserRouter>
  );
}
