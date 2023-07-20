import React, { Fragment, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import InformasiPerusahaan from "./pages/informasiPerusahaan/index.jsx";
import EditPerusahaan from "./pages/informasiPerusahaan/edit.jsx";
import Product from "./pages/product/index.jsx";
import EditProduct from "./pages/product/edit.jsx";
import DaftarMenu from "./pages/index-v1.jsx";
import Signup from "./pages/sign/index.jsx";
import Login from "./pages/login/index.jsx";
import Pesanan from "./pages/Hasil/Pesanan.jsx";
import ClientPage from "./pages/index.jsx";
import AddProduct from "./pages/product/create.jsx";
import Konfirmasi from "./pages/Hasil/konfirmasi.jsx";
import PesananBaru from "./pages/pesanan/pesananBaru.jsx";
import PesananProses from "./pages/pesanan/pesananProses.jsx";
import PesananSelesai from "./pages/pesanan/PesananSelesai.jsx";
import axiosInterceptors from "./security/AxiosInterceptor.jsx";
import SecuredRoute from "./security/SecuredRoute.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Logout from "./pages/logout/index.jsx";

function App() {
  const location = useLocation();
  const ADMIN_ROLE = "admin";
  const CLIENT_ROLE = "client";

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
            path="/login"
            element={<SecuredRoute role="" element={<Login />} />}
          />
          <Route
            exact
            path="/logout"
            element={<SecuredRoute role="" element={<Logout />} />}
          />

          {/* ROUTE ADMIN ROLE */}
          <Route
            exact
            path="/dashboard"
            element={<SecuredRoute role={ADMIN_ROLE} element={<Dashboard />} />}
          />
          <Route
            exact
            path="/company"
            element={
              <SecuredRoute
                role={ADMIN_ROLE}
                element={<InformasiPerusahaan />}
              />
            }
          />
          <Route
            exact
            path="/company/:id_company"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<EditPerusahaan />} />
            }
          />
          <Route
            exact
            path="/product"
            element={<SecuredRoute role={ADMIN_ROLE} element={<Product />} />}
          />
          <Route
            exact
            path="/product/:id_product"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<EditProduct />} />
            }
          />
          <Route
            exact
            path="/product/add"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<AddProduct />} />
            }
          />
          <Route
            exact
            path="/pesanan/baru"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<PesananBaru />} />
            }
          />
          <Route
            exact
            path="/pesanan/proses"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<PesananProses />} />
            }
          />
          <Route
            exact
            path="/pesanan/selesai"
            element={
              <SecuredRoute role={ADMIN_ROLE} element={<PesananSelesai />} />
            }
          />

          {/* ROUTE CLIENT ROLE */}
          <Route
            exact
            path="/"
            element={
              <SecuredRoute role={CLIENT_ROLE} element={<ClientPage />} />
            }
          />
          <Route
            exact
            path="/konfirmasi"
            element={
              <SecuredRoute role={CLIENT_ROLE} element={<Konfirmasi />} />
            }
          />

          <Route
            exact
            path="/roti-sobek"
            element={
              <SecuredRoute role={CLIENT_ROLE} element={<DaftarMenu />} />
            }
          />
          <Route
            exact
            path="/checkout"
            element={<SecuredRoute role={CLIENT_ROLE} element={<Pesanan />} />}
          />
        </Fragment>
      </Routes>
    </>
  );
}

export default App;
