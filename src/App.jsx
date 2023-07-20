import React, { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import InformasiPerusahaan from "./pages/informasiPerusahaan/index";
import EditPerusahaan from "./pages/informasiPerusahaan/edit";
import Product from "./pages/product/index";
import EditProduct from "./pages/product/edit";
import DaftarMenu from "./pagesClients/index-v1";
import Signup from "./pages/sign/index.jsx";
import SignupAdmin from "./pages/Sign/sign-up-admin.jsx";
import Login from "./pages/login_user/index.jsx";
import LoginAdmin from "./pages/login_admin/index.jsx";
import Pesanan from "./pages/../pagesClients/Hasil/Pesanan.jsx";
import ClientPage from "./pagesClients/index.jsx";
import TambahProduk from "./pages/product/create.jsx";
import Konfirmasi from "./pagesClients/Hasil/konfirmasi.jsx";
import PesananBaru from "./pages/pesanan/pesananBaru.jsx";
import PesananProses from "./pages/pesanan/pesananProses.jsx";
import PesananSelesai from "./pages/pesanan/PesananSelesai.jsx";
import axiosInterceptors from "./plugins/axiosInterceptors.js";
import SecuredRoute from "./plugins/SecuredRoute";

function App() {
  const location = useLocation();

  axiosInterceptors();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Fragment>
          {/* ROUTE ALL ROLE */}
          <Route
            exact
            path="/signup"
            element={<SecuredRoute role="" element={<Signup />} />}
          />
          <Route
            exact
            path="/signup-admin"
            element={<SecuredRoute role="" element={<SignupAdmin />} />}
          />
          <Route
            exact
            path="/login"
            element={<SecuredRoute role="" element={<Login />} />}
          />
          <Route
            exact
            path="/login-admin"
            element={<SecuredRoute role="" element={<LoginAdmin />} />}
          />

          {/* ROUTE ADMIN ROLE */}
          <Route
            exact
            path="/listCompany"
            element={
              <SecuredRoute role="admin" element={<InformasiPerusahaan />} />
            }
          />
          <Route
            exact
            path="/company/:id_company"
            element={<SecuredRoute role="admin" element={<EditPerusahaan />} />}
          />
          <Route
            exact
            path="/product-page"
            element={<SecuredRoute role="admin" element={<Product />} />}
          />
          <Route
            exact
            path="/edit-product/:id_product"
            element={<SecuredRoute role="admin" element={<EditProduct />} />}
          />
          <Route
            exact
            path="/tambah-produk"
            element={<SecuredRoute role="admin" element={<TambahProduk />} />}
          />
          <Route
            exact
            path="/pesanan/baru"
            element={<SecuredRoute role="admin" element={<PesananBaru />} />}
          />
          <Route
            exact
            path="/pesanan/proses"
            element={<SecuredRoute role="admin" element={<PesananProses />} />}
          />
          <Route
            exact
            path="/pesanan/selesai"
            element={<SecuredRoute role="admin" element={<PesananSelesai />} />}
          />

          {/* ROUTE CLIENT ROLE */}
          <Route
            exact
            path="/"
            element={<SecuredRoute role="client" element={<ClientPage />} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<SecuredRoute role="client" element={<Dashboard />} />}
          />

          <Route
            exact
            path="/konfirmasi"
            element={<SecuredRoute role="client" element={<Konfirmasi />} />}
          />

          <Route
            exact
            path="/roti-sobek"
            element={<SecuredRoute role="client" element={<DaftarMenu />} />}
          />
          <Route
            exact
            path="/checkout"
            element={<SecuredRoute role="client" element={<Pesanan />} />}
          />
        </Fragment>
      </Routes>
    </>
  );
}

export default App;
