import React, { useState, us, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../partials/dashboard/DashboardCard13";

import Modal from "react-bootstrap/Modal";
import Banner from "../partials/Banner";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import User from "../images/user.png";
import axios from "axios";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [company_code, setCompanyCode] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_address, setCompanyAddress] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveData = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/company", { company_code, company_name, company_address })
      .then((res) => {
        if (res.data.success) {
          swal({
            title: res.data.messages,
            icon: "success",
          }).then(() => {
            handleClose();
          });
        } else {
          swal({
            title: res.data.messages,
            icon: "error",
          });
        }
      });
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
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                <Button
                  variant="primary"
                  className="bg-primary"
                  onClick={handleShow}
                >
                  Create Data Company
                </Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Data Company</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={saveData}>
                      <Form.Group className="mb-3">
                        <Form.Label>Company Code</Form.Label>
                        <Input
                          type="text"
                          name="company_code"
                          onChange={(e) => setCompanyCode(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="company_name"
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="company_address"
                          onChange={(e) => setCompanyAddress(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        className="bg-primary"
                        type="submit"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        className="bg-danger ml-2"
                        onClick={handleClose}
                      >
                        Tutup
                      </Button>
                    </Form>
                  </Modal.Body>

                  {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" className="bg-danger" onClick={handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer> */}
                </Modal>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-6 gap-6">
              <DashboardCard05 />
              <DashboardCard07 />
              <DashboardCard11 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
