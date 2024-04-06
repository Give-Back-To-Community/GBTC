import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    age: "",
    college: "",
    graduationYear: "",
    isStudent: true,
    yearsOfExperience: "",
    organization: "",
    role: "",
    socialmedia: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? !prevFormData.isStudent : value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const isValidate = () => {
    if (formData.age < 0) {
      alert("Please enter valid age");
      return false;
    }

    if (
      formData.graduationYear >=
      parseInt(new Date().toLocaleString("en-US", { year: "numeric" })) + 5
    ) {
      console.log(
        formData.graduationYear,
        parseInt(new Date().toLocaleString("en-US", { year: "numeric" })) + 5
      );
      alert("Please enter valid graduation year");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidate()) {
      return false;
    }
    setLoading(true);

    let profilePictureUrl = "";
    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          profilePictureUrl = data.secure_url;
          console.log("profile picture", profilePictureUrl);
        } else {
          console.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    } else {
      profilePictureUrl =
        "https://res.cloudinary.com/dpmvh9xgm/image/upload/v1711451092/x9ioplsucbh60q3idhd3.png";
    }

    const completeFormData = {
      ...formData,
      profilePictureUrl,
    };

    try {
      const response = await fetch(
        "https://gbtc-hd4r.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(completeFormData),
        }
      );

      console.log(response);

      if (response.ok) {
        const result = await response.json();
        console.log("Registration success:", result);
        setLoading(false);
        localStorage.setItem("token", result.token);
        localStorage.setItem("name", result.name);
        alert("Register successfully");
        navigate("/");
        window.location.reload();
      } else {
        const res = await response.json();
        // console.log("Registration failed", res);
        alert("Registration failed: " + res.errors[0].msg);
        console.error("Registration failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="college">College</label>
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="graduationYear">Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleInputChange}
              required
            />
          </div>
          {!formData.isStudent && (
            <>
              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience</label>
                <input
                  type="text"
                  name="yearsOfExperience"
                  placeholder="Years of Experience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
          <div className="check-box-group">
            <label htmlFor="isStudent">Are you a Student?</label>

            <div className="form-group">
              <input
                type="checkbox"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="file-input"
            />
          </div>
          {loading ? <div>Loading...</div> : ""}
          <button type="submit" className="registration-submit-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="reg-img-sec">
        <img
          src="registration.webp"
          loading="lazy"
          alt=""
          className="slide-image"
        />
        Good things Start with a Good Foundation
      </div>
    </div>
  );
};

export default Register;
