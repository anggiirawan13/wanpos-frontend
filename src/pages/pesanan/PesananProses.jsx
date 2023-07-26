import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

export default function PesananProses() {
  useEffect(() => {
    getOrder();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [order, setOrder] = useState([]);

  const getOrder = () => {
    axios.get("/api/v1/order/proses").then((response) => {
      setOrder(response.data.result);
    });
  };

  const doSelesaiOrder = (idOrder) => {
    axios
      .put(`/api/v1/order/${idOrder}/selesai`)
      .then(() => {
        swal({
          title: "Order Selesai!",
          text: "order telah selesai",
          icon: "success",
          timer: 1500,
        }).then(() => {
          getOrder();
        });
      })
      .catch((err) => {
        console.log(err);
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
            <h2 className="font-semibold text-slate-900 mb-3 dark:text-slate-100">
              Pesanan Proses
            </h2>

            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                <table className="table-auto w-full dark:text-slate-300 text-center">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold">Kode Order</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Nama Lengkap</div>
                      </th>
                      <th className="">
                        <div className="font-semibold">Pesanan</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Total Bayar</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Pembayaran</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Action</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}

                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row */}

                    {order.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <div>{item.order_code}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-emerald-500">
                            {item.nama_lengkap}
                          </div>
                        </td>

                        <td className="p-2">
                          <div className="text-emerald-500">
                            {item.products}
                          </div>
                        </td>

                        <td className="p-2">
                          <div>{item.total_bayar}</div>
                        </td>

                        <td className="p-2">
                          <div>{item.metode_pemesanan}</div>
                        </td>
                        <td className="p-2">
                          <Button
                            type="input"
                            variant="primary"
                            onClick={() => doSelesaiOrder(item.order_code)}
                          >
                            Selesai
                          </Button>
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
