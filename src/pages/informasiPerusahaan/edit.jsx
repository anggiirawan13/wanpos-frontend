import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditPerusahaan() {
  const { id_company } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanyById();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const getCompanyById = async () => {
    try {
      const response = await axios.get(`/api/v1/company/${id_company}`);
      setCompanyName(response.data.result[0].name_company);
      setCompanyDesc(response.data.result[0].desc_company);
      setCompanyAddress(response.data.result[0].alamat);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateCompany = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`/api/v1/company/${id_company}`, {
          companyName,
          companyDesc,
          companyAddress,
        })
        .then(() => {
          swal({
            title: "Update Berhasil!",
            text: "perusahaan berhasil di update",
            icon: "success",
            timer: 1500,
          }).then(() => {
            navigate("/company");
          });
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <h2 className="font-semibold text-slate-900 mb-3 dark:text-slate-100">
              Informasi Perusahaan
            </h2>

            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                {/* Table */}

                <Form onSubmit={updateCompany}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama Perusahaan</Form.Label>
                    <Form.Control
                      type="text"
                      value={companyName}
                      name="name_company"
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deskripsi Perusahaan</Form.Label>
                    <Form.Control
                      type="text"
                      value={companyDesc}
                      name="desc_company"
                      onChange={(e) => setCompanyDesc(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Team</Form.Label>
                    <Form.Control
                      type="text"
                      value={companyAddress}
                      name="alamat"
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>
                  <Link
                    to={`/company`}
                    className="btn bg-secondary text-white mr-2"
                  >
                    Kembali
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    className="bg-primary"
                  >
                    Ubah
                  </Button>
                </Form>
              </div>
            </div>

            {/* Cards */}
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default EditPerusahaan;
