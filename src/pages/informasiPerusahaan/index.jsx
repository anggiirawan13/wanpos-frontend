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
import { Input } from "@material-tailwind/react";

import DashboardCard13 from "../../partials/dashboard/DashboardCard13";
import Banner from "../../partials/Banner";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    getCompany();
  }, []);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [company, setCompany] = useState([]);
  const [ name_company, setName ] = useState('');
  const [ desc_name, setDesc ] = useState('');
  const [ team, setTeam ] = useState('');
  const [show, setShow] = useState(false);
  const { id_company } = useParams();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCompany = async () => {
    const response = await axios.get(`api/v1/listCompany`);
    console.log("response", response);
    setCompany(response.data.result);
    setName(response.data.result[0].name_company);
    setDesc(response.data.result[0].desc_company);
    setTeam(response.data.result[0].team);
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
                <table className="table-auto w-full dark:text-slate-300">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold text-left">
                          Nama Perusahaan
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">
                          Tentang Perusahaan
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">Team</div>
                      </th>

                      <th className="p-2">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                      
                    </tr>
                  </thead>
                  {/* Table body */}

                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row */}

                    {company.map((item, index) => (
                      <tr key={item.id_company}>
                        <td className="p-2">
                          <div className="text-center">{item.name_company}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-emerald-500">
                            {item.desc_company}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item.alamat}</div>
                        </td>
                        {/* <td className="p-2">
                          <Link to={`/company/${item.id_company}`} className="btn bg-primary"> Ubah </Link>
                        </td> */}
                        <td className="p-2">
                          <Link to={`/company/${item.id_company}`} className="btn bg-danger"> Delete </Link>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
               
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

export default Dashboard;
