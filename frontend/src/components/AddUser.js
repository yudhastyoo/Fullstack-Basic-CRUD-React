import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const AddUser = () => {
  usePageTitle("Add User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    return newErrors;
  };

  const saveUser = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5001/users", {
        name,
        email,
        gender,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control"></div>
            <input
              type="text"
              className="input"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && <p className="help is-danger">{errors.name}</p>}
          <div className="field">
            <label className="label">Email</label>
            <div className="control"></div>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="help is-danger">{errors.email}</p>}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field is-flex">
            <button type="submit" className="button is-success mr-3">
              Save
            </button>
            <button onClick={backToHome} className="button is-warning">
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
