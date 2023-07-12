import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Input } from "@material-tailwind/react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Storage from "../../Storage/storage";


export default function Login() {



 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  // const handleInput = (event) => {
  //   setValues( prev => ({
  //     ...prev,
  //     [event.target.name]: [event.target.value],
  //   }));
  //   console.log("values", values);
  // };


 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/v1/login`, {email, password}).then(res => {
      console.log("res",res);
      Storage.set('user_id', {data: res.data.data.user_id});
      Storage.set('username', {data: res.data.data.name});

      if (res.status === 200 ) {

        toast.success("Berhasil Masuk");
        navigate('/')
      } else {
        toast.warning(res.data.message)
      }
    }).catch(error => {
      console.log(error);
    })
  }

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
                Login sebagai Admin
              </h2>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                
              </div>

              <div className="flex items-start mt-3">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Row>

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
                  to={'/signup'}
                    variant="primary"
                    className="bg-success btn btn-success ml-3"
                    type="submit"
                  >
                    Sign Up
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