import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../../partials/dashboard/DashboardAvatars";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import DashboardCard01 from "../../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../../partials/dashboard/DashboardCard13";
import Banner from "../../partials/Banner";
import Form from "react-bootstrap/Form";
import { Input } from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";





 



function EditPerusahaan() {
  
 
  const { id_company } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getCompanyById()
  }, []);
  

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name_company, setName] = useState("");
  const [desc_company, setDescName] = useState("");
  const [team, setTeam] = useState("");


  const getCompanyById = async () => {
    try {
     const response = await axios.get(`/api/v1/company/${id_company}`);
     setName(response.data.result[0].name_company)
     setDescName(response.data.result[0].desc_company)
     setTeam(response.data.result[0].team)
      
    } catch (error) {
      console.log("error", error);
    }
  }

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/v1/updateCompany/${id_company}`, {name_company, desc_company, team});
      toast.success(response.data.message);
      navigate('/')
    } catch (error) {
      console.log("error", error);
    }
  }


  

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
                          value={name_company}
                          name="name_company"
                          onChange={ (e) => setName(e.target.value)}
                          placeholder="Enter"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Deskripsi Perusahaan</Form.Label>
                        <Form.Control
                          type="text"
                          value={desc_company}
                          name="desc_company"
                          onChange={ (e) => setDescName(e.target.value)}
                          placeholder="Enter"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Team</Form.Label>
                        <Form.Control
                          type="text"
                          value={team}
                          name="team"
                          onChange={ (e) => setTeam(e.target.value)}
                          placeholder="Enter"
                        />
                      </Form.Group>
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