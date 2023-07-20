import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import InformasiPerusahaan from "./pages/informasiPerusahaan/index";
import EditPerusahaan from "./pages/informasiPerusahaan/edit";

import Product from "./pages/product/index";
import EditProduct from "./pages/product/edit";
import CreateProduct from "./pages/product/create";

// Client
import DaftarMenu from "../src/pagesClients/index-v1";
import Sukses from "../src/pagesClients/Hasil/sukses";
import Signup from "./pages/Sign/index";
import SignupAdmin from "./pages/Sign/sign-up-admin";
import Login from "./pages/login_user";
import LoginAdmin from "./pages/login_admin";
import Pesanan from "./pages/../pagesClients/Hasil/Pesanan";
import ClientPage from "../src/pagesClients/index";
import AddProduk from "../src/pages/product/create";
import Konfirmasi from "../src/pagesClients/Hasil/konfirmasi";
import PesananBaru from "./pages/pesanan/pesananBaru";
import PesananProses from "./pages/pesanan/pesananProses";
import PesananSelesai from "./pages/pesanan/pesananSelesai";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<ClientPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/listCompany" element={<InformasiPerusahaan />} />
        <Route exact path="/company/:id_company" element={<EditPerusahaan />} />
        <Route exact path="/product-page" element={<Product />} />
        <Route
          exact
          path="/edit-product/:id_product"
          element={<EditProduct />}
        />
        <Route exact path="/create-product" element={<CreateProduct />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signup-admin" element={<SignupAdmin />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/login-admin" element={<LoginAdmin />} />
        <Route exact path="/tambah-produk" element={<AddProduk />} />
        <Route exact path="/konfirmasi" element={<Konfirmasi />} />
        <Route exact path="/pesanan/baru" element={<PesananBaru />} />
        <Route exact path="/pesanan/proses" element={<PesananProses />} />
        <Route exact path="/pesanan/selesai" element={<PesananSelesai />} />

        {/* Routing Client */}
        <Route exact path="/roti-sobek" element={<DaftarMenu />} />
        <Route exact path="/checkout" element={<Pesanan />} />
        <Route exact path="/berhasil" element={<Sukses />} />
      </Routes>
    </>
  );
}

export default App;
