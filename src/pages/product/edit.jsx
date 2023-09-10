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
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  let [product_code, setProductCode] = useState("");
  let [product_name, setProductName] = useState("");
  let [stock, setStock] = useState(0);
  let [buying_price, setBuyingPrice] = useState(0);
  let [selling_price, setSellingPrice] = useState(0);

  const getProductById = () => {
    try {
      axios.get(`/api/product/${code}`).then((response) => {
        const result = response.data.result;
        setProductCode(result.product_code);
        setProductName(result.product_name);
        setStock(result.stock);
        setBuyingPrice(result.buying_price);
        setSellingPrice(result.selling_price);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateProduct = (e) => {
    e.preventDefault();
    try {
      axios
        .put("/api/product", {
          product_code,
          product_name,
          stock,
          buying_price,
          selling_price,
        })
        .then((res) => {
          swal({
            title: res.data.messages,
            icon: "success",
            timer: 1500,
          }).then(() => {
            navigate("/product");
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
                    <Form.Label>Product Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={product_code}
                      name="product_code"
                      onChange={(e) => setProductCode(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={product_name}
                      name="product_name"
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      value={stock}
                      name="stock"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Buying Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={buying_price}
                      name="buying_price"
                      onChange={(e) => setBuyingPrice(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={selling_price}
                      name="selling_price"
                      onChange={(e) => setSellingPrice(e.target.value)}
                      placeholder="Enter"
                    />
                  </Form.Group>

                  <Link
                    to={`/product`}
                    className="btn bg-secondary text-white mr-2"
                  >
                    Back
                  </Link>
                  <Button
                    buying_price="primary"
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

export default EditProduct;
