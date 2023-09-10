import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPerusahaan() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCompanyById();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [company_code, setCompanyCode] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_address, setCompanyAddress] = useState("");

  const getCompanyById = async () => {
    try {
      const response = await axios.get(`/api/company/${code}`);
      setCompanyCode(response.data.result.company_code);
      setCompanyName(response.data.result.company_name);
      setCompanyAddress(response.data.result.company_address);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateCompany = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`/api/company`, {
          company_code,
          company_name,
          company_address,
        })
        .then((res) => {
          swal({
            title: res.data.messages,
            icon: "success",
            timer: 1500,
          }).then(() => {
            navigate("/company");
          });
        })
        .catch((err) => {
          swal({
            title: err.data.messages,
            icon: "error",
            timer: 1500,
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
              Data Company
            </h2>

            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                {/* Table */}

                <Form onSubmit={updateCompany}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={company_code}
                      name="company_code"
                      onChange={(e) => setCompanyCode(e.target.value)}
                      placeholder="Enter"
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={company_name}
                      name="company_name"
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={company_address}
                      name="company_address"
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>
                  <Link
                    to={`/company`}
                    className="btn bg-secondary text-white mr-2"
                  >
                    Back
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    className="bg-primary"
                  >
                    Save
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
