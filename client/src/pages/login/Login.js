import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const loginButton = useRef(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loginButton.current && emailInput.current && passwordInput.current) {
      loginButton.current.onclick = () => {
        // if (passwordInput.current.value.length < 8) {
        //   alert("Minimum length for password is 8");
        //   return;
        // }
        const jsonData = {
          email: emailInput.current.value,
          password: passwordInput.current.value,
        };
        setLoading(true);
        console.log(jsonData);
        fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((res) => {
            if (!res.ok) {
              return res.json().then((data) => {
                throw new Error(
                  `HTTP error! Status: ${res.status}, Message: ${data.message}`
                );
              });
            }
            return res.json();
          })
          .then((response) => {
            setLoading(false);
            localStorage.setItem("token", response.token);
            localStorage.setItem("name", response.name);
            console.log("name", localStorage.getItem("name"));

            alert("login successfully");
            navigate("/");
            window.location.reload();
          })
          .catch((err) => {
            console.log("Some error occurred while login ", err.message);
            alert(err.message);
          });
      };
    }
  }, []);
  return (
    <div className="log-container">
      <div className="login-container">
        <div className="login-form">
          <div className="login-form-inner">
            <div className="logo">
              <svg
                height="512"
                viewBox="0 0 192 192"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
              </svg>
            </div>
            <h1>Login</h1>
            <p className="body-text">
              See your growth and get consulting support!
            </p>

            <div className="sign-in-seperator">
              <span>Log in with Email</span>
            </div>

            <div className="login-form-group">
              <label htmlFor="email">
                Email <span className="required-star">*</span>
              </label>
              <input
                type="email"
                placeholder="email@website.com"
                id="email"
                ref={emailInput}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="pwd">
                Password <span className="required-star">*</span>
              </label>
              <input
                autoComplete="off"
                type="password" // Changed from text to password for security
                placeholder="Minimum 8 characters"
                id="pwd"
                ref={passwordInput}
              />
            </div>

            <div className="login-form-group single-row">
              <div className="custom-check">
                <input
                  autoComplete="off"
                  type="checkbox"
                  defaultChecked={true} // Changed from checked to defaultChecked for uncontrolled component
                  id="remember"
                />
                <label htmlFor="remember">Remember me</label>
              </div>

              <a href="#" className="link forgot-link">
                Forgot Password ?
              </a>
            </div>

            <a href="#" className="rounded-button login-cta" ref={loginButton}>
              Login
            </a>

            <div className="register-div">
              Not registered yet?{" "}
              <a href="#" className="link create-account-link">
                Create an account ?
              </a>
            </div>
          </div>
        </div>
        <div className="onboarding">
          <div className="swiper-container">
            <div className="swiper-slide color-1">
              <div className="slide-image">
                <img
                  src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/cloud-storage.png"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="slide-content">
                <h2>Turn your ideas into reality.</h2>
                <p>
                  Consistent quality and experience across all platform and
                  devices
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
