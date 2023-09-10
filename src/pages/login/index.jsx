import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Storage from "../../Storage/storage";
import jwtDecode from "jwt-decode";
import ClearSession from "../../security/ClearSession";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  ClearSession();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/api/auth/login`, { username, password })
      .then((res) => {
        if (!res.data.error) {
          const auth = jwtDecode(res.data.result.access_token);

          Storage.set("user_id", { data: auth.uuid });
          Storage.set("username", { data: auth.name });
          Storage.set("role", { data: auth.role });

          Storage.setLogin(res.data.result.access_token);

          if (auth.role == "admin") {
            navigate("/dashboard");
          } else {
            navigate("/roti-sobek");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Col xl="12" className="flex items-center justify-center ">
        <div
          style={{ marginTop: 90, padding: 20 }}
          className="flex flex-col sm:col-span-6  bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="px-5 pt-5">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Login
            </h2>
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1"></div>

            <div className="flex items-start mt-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          placeholder="Username"
                          autoFocus
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
                    </Col>
                  </Row>
                </Form.Group>

                <Button variant="primary" className="bg-primary" type="submit">
                  Login
                </Button>
                <Link
                  to={"/signup"}
                  variant="primary"
                  className="bg-success btn btn-success ml-3"
                  type="submit"
                >
                  Sign up
                </Link>
              </Form>
            </div>
          </div>
          {/* Chart built with Chart.js 3 */}
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]"></div>
        </div>
      </Col>
    </Container>
  );
}
