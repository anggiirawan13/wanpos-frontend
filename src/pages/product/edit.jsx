import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function EditProduct() {
  const { id_product } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  let [kode, setKodeProduct] = useState("");
  let [name_products, setNameProduct] = useState("");
  let [desc_products, setDescProduct] = useState("");
  let [variant, setVariantProduct] = useState("");
  let [harga, setHarga] = useState("");
  let [stock, setStockProduct] = useState("");
  let [file, setFile] = useState(null);

  const getProductById = () => {
    try {
      axios.get(`/api/v1/product/${id_product}`).then((response) => {
        const result = response.data.result[0];
        setKodeProduct(result.kode);
        setNameProduct(result.name_products);
        setDescProduct(result.desc_products);
        setVariantProduct(result.variant);
        setHarga(result.harga);
        setStockProduct(result.stock);
        setFile(result.files);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateProduct = (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("id_products", id_product);
      formData.append("kode", kode);
      formData.append("name_products", name_products);
      formData.append("desc_products", desc_products);
      formData.append("variant", variant);
      formData.append("harga", harga);
      formData.append("stock", stock);
      formData.append("file", file);

      axios.put(`/api/v1/updateProduct/${id_product}`, formData).then(() => {
        swal({
          title: "Update Berhasil!",
          text: "product berhasil di update",
          icon: "success",
          timer: 1500,
        }).then(() => {
          navigate("/product-page");
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
              Informasi Product
            </h2>

            {/* Dashboard actions */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <div className="p-3">
                {/* Table */}

                <Form onSubmit={updateProduct}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Ubah foto produk</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/jpg,image/jpeg,image/png"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </Form.Group>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Kode Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={kode}
                      name="kode"
                      onChange={(e) => setKodeProduct(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nama Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={name_products}
                      name="name_products"
                      onChange={(e) => setNameProduct(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Deskripsi Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={desc_products}
                      name="desc_products"
                      onChange={(e) => setDescProduct(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Variant Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={variant}
                      name="variant"
                      onChange={(e) => setVariantProduct(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Harga Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={harga}
                      name="harga"
                      onChange={(e) => setHarga(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Stock Product</Form.Label>
                    <Form.Control
                      type="text"
                      value={stock}
                      name="stock"
                      onChange={(e) => setStockProduct(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Link
                    to={`/product-page`}
                    className="btn bg-secondary text-white mr-2"
                  >
                    Kembali
                  </Link>
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
