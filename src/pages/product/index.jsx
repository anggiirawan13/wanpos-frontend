import React, { useState } from "react";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import swal from "sweetalert";

function Product() {
  useEffect(() => {
    getProduct();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState([]);

  const getProduct = () => {
    axios.get("/api/product").then((response) => {
      setProduct(response.data.result);
    });
  };

  const deleteProduct = (code) => {
    swal({
      title: "Delete Product",
      text: "Are you sure to do this action?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/api/product/${code}`).then((res) => {
          getProduct();
          swal({
            title: res.data.messages,
            icon: "success",
            timer: 1500,
          });
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
            <table className="table-auto w-full mb-1">
              <thead>
                <tr>
                  <th>
                    <h2 className="font-semibold text-slate-900 mb-3 dark:text-slate-100">
                      Data Product
                    </h2>
                  </th>
                  <th className="text-right">
                    <Link
                      to={"/product/add"}
                      className="btn bg-primary text-white"
                    >
                      Add
                    </Link>
                  </th>
                </tr>
              </thead>
            </table>
            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                <table className="table-auto w-full dark:text-slate-300 text-center">
                  {/* Table header */}
                  <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                      <th className="p-2">
                        <div className="font-semibold">Product Code</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Product Name</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Stock</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Selling Price</div>
                      </th>

                      <th className="p-2">
                        <div className="font-semibold">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}

                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row */}

                    {product == null ? (
                      <></>
                    ) : (
                      product.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="text-center">
                              {item.product_code}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {item.product_name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {item.stock}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {item.selling_price}
                            </div>
                          </td>
                          <td className="p-2">
                            <Link
                              to={`/product/${item.product_code}`}
                              className="btn bg-primary text-white"
                            >
                              Edt
                            </Link>
                            <Button
                              type="input"
                              variant="danger"
                              className="ml-2"
                              onClick={() => deleteProduct(item.product_code)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
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
