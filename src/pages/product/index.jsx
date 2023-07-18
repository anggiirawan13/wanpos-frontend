import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Product() {
  useEffect(() => {
    getCompany();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [company, setCompany] = useState([]);

  const getCompany = async () => {
    const response = await axios.get(`api/v1/listProduct`);
    console.log(response);
    setCompany(response.data.result);
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
              Informasi Produk
            </h2>
            <Link to={"/tambah-produk"} className="btn bg-primary text-white">
              Tambah Produk
            </Link>
            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                <table className="table-auto w-full dark:text-slate-300">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold text-left">
                          Nama Product
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">
                          Harga Product
                        </div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold text-center">
                          Deskripsi Product
                        </div>
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
                      <tr key={index}>
                        <td className="p-2">
                          <div className="text-center">
                            {item.name_products}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-emerald-500">
                            {item.desc_products}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item.team}</div>
                        </td>
                        <td className="p-2">
                          <Link
                            to={`/edit-product/${item.id_products}`}
                            className="btn bg-primary"
                          >
                            {" "}
                            Ubah{" "}
                          </Link>
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

export default Product;
