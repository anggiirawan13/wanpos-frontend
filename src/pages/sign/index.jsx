import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const role = "client";
  const status = "active";

  let [user_code, setUserCode] = useState("");
  let [username, setUsername] = useState("");
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [retype_password, setRetypePassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/register", {
        user_code,
        username,
        fullName,
        email,
        password,
        retype_password,
        role,
        status,
      })
      .then((res) => {
        swal({
          title: res.data.messages,
          icon: "success",
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
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
                Buat Akun lebih mudah dibawah ini
              </div>

              <div className="flex items-start mt-3">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="user_code"
                            onChange={(e) => setUserCode(e.target.value)}
                            required
                            placeholder="User Code"
                            autoFocus
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="fullName"
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="FullName"
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email Address"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="password"
                            name="retype_password"
                            onChange={(e) => setRetypePassword(e.target.value)}
                            required
                            placeholder="Retype Password"
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
                    to={"/login"}
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
};

export default Signup;
