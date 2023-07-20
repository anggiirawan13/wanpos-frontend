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
    axios.get(`api/v1/product`).then((response) => {
      setProduct(response.data.result);
    });
  };

  const deleteProduct = (id, filename) => {
    swal({
      title: "Hapus Produk",
      text: "apakah kamu yakin ingin menghapus produk ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`api/v1/product/${id}/${filename}`).then(() => {
          getProduct();
          swal({
            title: "Hapus Berhasil",
            text: "produk berhasil dihapus",
            icon: "success",
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
                      Informasi Produk
                    </h2>
                  </th>
                  <th className="text-right">
                    <Link
                      to={"/product/add"}
                      className="btn bg-primary text-white"
                    >
                      Tambah Produk
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
                        <div className="font-semibold">Nama Product</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Harga Product</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Stok Product</div>
                      </th>
                      <th className="p-2">
                        <div className="font-semibold">Deskripsi Product</div>
                      </th>

                      <th className="p-2">
                        <div className="font-semibold">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}

                  <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row */}

                    {product.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <div className="text-center">
                            {item.name_products}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-emerald-500">
                            {item.harga}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-emerald-500">
                            {item.stock}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">
                            {item.desc_products}
                          </div>
                        </td>
                        <td className="p-2">
                          <Button
                            type="input"
                            variant="danger"
                            className="mr-2"
                            onClick={() =>
                              deleteProduct(item.id_products, item.files)
                            }
                          >
                            Hapus
                          </Button>
                          <Link
                            to={`/product/${item.id_products}`}
                            className="btn bg-primary text-white"
                          >
                            Ubah
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
