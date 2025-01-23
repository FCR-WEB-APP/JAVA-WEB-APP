import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SignUpForm() {
  const [state, setState] = useState({
    name: "",
    roles: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, roles, email, password } = state;

    // Simulating userId generation (this should ideally be handled by the backend)
    const userId = Math.floor(Date.now() / 10000); 

    try {
      const response = await axios.post(
        "http://localhost:1003/user/register",
        {
          userId, 
          name,
          roles,
          email,
          password,
          isActive: "Y", 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully!",
          confirmButtonColor: "#3085d6",
        });
        setState({
          name: "",
          roles: "",
          email: "",
          password: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.data.message || "Unable to register. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data.message || "An error occurred during registration. Please try again.",
        confirmButtonColor: "#d33",
      });
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="form-container sign-up-container flex items-center justify-center bg-white p-6 shadow-lg rounded-lg space-y-4 w-full max-w-md">
      <form onSubmit={handleOnSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="text"
          name="roles"
          value={state.roles}
          onChange={handleChange}
          placeholder="Role"
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
