import React, { useState } from 'react'
import './index.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import Women from '../../assets/digital-money.gif'

function Login() {
  const [alertCode, setAlertCode] = useState(0);
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required*"),
      password: Yup.string()
        // .min(8, "minimum 8 required")
        .required("Password is required*"),
    }),
    onSubmit: (values) => {
      console.log(values);
      LoginHandler(values);
    },
  });

  const LoginHandler = (values) => {
    const URL = "https://suraksha.onrender.com/admin";
    axios
      .post(
        URL,
        {
          username: values.userName,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("userName", values.userName);
          localStorage.setItem("token", data["token"]);
          console.log(data["token"]);
          console.log(response.status);
          console.log(values.userName);
          alert("Successfully Logged In");
          window.location = "/";
        }
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          setAlertCode(1);
          alert("Bad Request");
          return 0;
        }
        if (err.message === "Request failed with status code 404") {
          setAlertCode(2);
          alert("You have entered an invalid username or password");
          return 0;
        }
        if (err.message === "Request failed with status code 401") {
          setAlertCode(3);
          return 0;
        }
        setAlertCode(4);
        return 0;
      });
    // values.username = "";
    values.password = "";
  };
  // console.log(alertCode);

  return (
    <div className="background">
    <div className="container-fluid box_login">
      <div className="col-md-6 col-sm-12 login_container">
        {/* <img className="logo" src={Logo} alt="Logo" /> */}
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <h1 className="login_heading">Admin Login</h1>
          <label className="input_label">Username</label>
          <div className="login_input">
            <input
              id="username"
              name="userName"
              type="text"
              className="input_box"
              placeholder="Enter Your Username"
              value={formik.values.userName}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
              }}

              // onChange={(e)=>{setUsername(e.target.value)}}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <p className="error_login">{formik.errors.userName}</p>
            ) : null}
          </div>

          <label className="input_label">Password</label>
          <div className="login_input">
            <input
              type="password"
              id="password"
              name="password"
              className="input_box"
              placeholder="Enter password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.handleChange(e);
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error_login">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="login_btn">
            <button
              type="submit"
              className="btn btn-primary btn-lg submit_btn"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-6 col-sm-12 login_img">
        <img className="side_img" src="https://res.cloudinary.com/ravikjha7/image/upload/v1682310401/WCE%20Virtual%20Tour/Suraksha_ybnje2.png"  alt="Login" />
      </div>
    </div>
  </div>
  )
}

export default Login