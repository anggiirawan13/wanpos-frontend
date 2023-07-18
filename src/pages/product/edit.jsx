import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id_company } = useParams();

  useEffect(() => {
    getCompanyById();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name_company, setName] = useState("");
  const [desc_company, setDescName] = useState("");
  const [team, setTeam] = useState("");

  const getCompanyById = async () => {
    try {
      const response = await axios.get(`api/v1/company/${id_company}`);
      console.log("Response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateCompany = async (e) => {
    e.preventDefault();
    const navigate = useNavigate();
    try {
      const a = await axios.put(`api/v1/updateCompany/${id_company}`, {
        name_company,
        desc_company,
        team,
      });
      navigate("/");
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
              Informasi Product
            </h2>

            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                {/* Table */}

                <Form onSubmit={updateCompany}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={name_company}
                      name="name_company"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Harga Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={desc_company}
                      name="desc_company"
                      onChange={(e) => setDescName(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deskripsi Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={team}
                      name="team"
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="bg-primary"
                  >
                    Simpan Perubahan
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

export default EditProduct;
