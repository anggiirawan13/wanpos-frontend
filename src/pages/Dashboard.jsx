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

  const [name_company, setName] = useState("");
  const [desc_company, setDescName] = useState("");
  const [alamat, setAlamat] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveData = async (e) => {
    e.preventDefault();
    await axios
      .post("api/v1/company", { name_company, desc_company, alamat })
      .then((res) => {
        if (res.data.error === false) {
          toast.success("Berhasil Menambahkan Data Perusahaan");
          navigate("/");
        } else {
          toast.warning("ga");
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
                  Buat data perusahan
                </Button>

                <Modal show={show} onHide={handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Data Perusahaan</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={saveData}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nama Perusahaan</Form.Label>
                        <Input
                          type="text"
                          name="name_company"
                          onChange={(e) => setName(e.target.value)}
                        />
                        {/* <Form.Control
                          type="text"
                          value={name}
                          name="name_company"
                          onChange={ e => setName(e.target.value)}
                          placeholder="Enter"
                        /> */}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Deskripsi Perusahaan</Form.Label>
                        <Form.Control
                          type="text"
                          name="desc_company"
                          onChange={(e) => setDescName(e.target.value)}
                          placeholder="Enter"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          type="text"
                          name="alamat"
                          onChange={(e) => setAlamat(e.target.value)}
                          placeholder="Enter"
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        className="bg-primary"
                        type="submit"
                      >
                        Tambah Data
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
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
