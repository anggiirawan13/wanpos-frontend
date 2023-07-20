import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Input } from "@material-tailwind/react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Signup() {
  const [values, setValues] = useState({
    username: "",
    noTlp: "",
    email: "",
    alamat: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`api/v1/createUser`, values).then((res) => {
      toast.success(res.data.message);
      navigate("/dashboard");
    });
  };

  return (
    <>
      <Container>
        <Col xl="12" className="flex items-center justify-center ">
          <div
            style={{ marginTop: 90, padding: 20 }}
            className="flex flex-col sm:col-span-6  bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="px-5 pt-5">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Sign Up
              </h2>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                Buat Akun admin 
              </div>

              <div className="flex items-start mt-3">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="username"
                            onChange={handleInput}
                            placeholder="Username"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="alamat"
                            onChange={handleInput}
                            placeholder="Address"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="noTlp"
                            onChange={handleInput}
                            placeholder="No Tlp"
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="email"
                            onChange={handleInput}
                            required
                            placeholder="Email Address"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="password"
                            name="password"
                            onChange={handleInput}
                            required
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="bg-primary"
                    type="submit"
                  >
                    Sign Up
                  </Button>

                  <Link
                    to={"/login-admin"}
                    variant="primary"
                    className="bg-success btn btn-success ml-3"
                    type="submit"
                  >
                    Login
                  </Link>
                </Form>
              </div>
            </div>
            {/* Chart built with Chart.js 3 */}
            <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]"></div>
          </div>
        </Col>
      </Container>
    </>
  );
}
