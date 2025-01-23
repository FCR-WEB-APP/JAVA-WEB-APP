import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
    name: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const navigate = useNavigate();

  const decodeJWT = (token) => {
    if (!token || token.split(".").length !== 3) {
      throw new Error("Invalid token format");
    }
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, password } = state;

    try {
      const response = await axios.post(
        "http://localhost:1003/user/login",
        { name, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data;
      const decoded = decodeJWT(token);
      const userRole = decoded.roles;

      // Save token and roles in localStorage
      localStorage.setItem("Bearer", token);
      localStorage.setItem("roles", userRole);

      // Success Swal
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });

      setState({ name: "", password: "" });

      // Redirect to appropriate page
      navigateBasedOnRole(userRole);
    } catch (error) {
      console.error("Login failed:", error);

      // Error Swal
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid name or password. Please try again.",
        confirmButtonColor: "#d33",
      }); 
    }
  };

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "SrCreditReviewer":
        navigate("/srcreditreviewer");
        break;
      case "HeadOfFCR":
        navigate("/dashboardfcr");
        break;
      case "CreditReviewer":
        navigate("/dashtoAssign");
        break;
      case "SPOC":
        navigate("/spocchild");
        break;
      default:
        navigate("/"); // Default redirect
        break;
    }
  };

  return (
    <div className="form-container sign-in-container flex items-center justify-center bg-white p-6 shadow-lg rounded-lg space-y-4 w-full max-w-md">
      <form onSubmit={handleOnSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="w-full p-3 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <a href="#" className="block text-right text-sm text-orange-600">
          Forgot your password?
        </a>
        <button className="w-full py-2 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
