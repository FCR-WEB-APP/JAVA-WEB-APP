import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "", // Added email field
    password: "",
    roles: "" // Optional for registration
  });

  const handleSwitch = () => setIsLogin(!isLogin);

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

  const handleOnSubmitLogin = async (evt) => {
    evt.preventDefault();
    const { name, password } = state;

    // Start the Swal loader
    Swal.fire({
      title: 'Logging in...',
      html: 'Please wait while we process your login.',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      setLoading(true);  // Set loading state
      const response = await axios.post(
        "http://localhost:1003/user/login",
        { name, password },  // Login with name and password
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);  // Reset loading state after response

      const token = response.data;
      const temp = token;
      const decoded = decodeJWT(temp);
      const userRole = decoded.roles;
      console.log(response.data);

      // Save token and roles in localStorage
      localStorage.setItem("Bearer", token);
      localStorage.setItem("roles", userRole);

      // Close the Swal loader and show success
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });

      setState({ name: "", password: "" });

      // Redirect based on user role
      //navigateBasedOnRole(userRole);
      navigate("/");
    } catch (error) {
      setLoading(false);  // Reset loading state in case of error

      console.error("Login failed:", error);

      // Close the Swal loader and show error
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid name or password. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleOnSubmitRegister = async (evt) => {
    evt.preventDefault();
    const { name, email, password, roles } = state;

    // Start the Swal loader
    Swal.fire({
      title: 'Registering...',
      html: 'Please wait while we process your registration.',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulating userId generation (this should ideally be handled by the backend)
    const userId = Math.floor(Date.now() / 1000);

    try {
      const response = await axios.post(
        "http://localhost:1003/user/register",
        {
          userId,            // Adding userId to the request body
          name,
          email,             // Added email field
          roles,
          password,
          isActive: "Y",     // Manually setting isActive to "Y"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Close the Swal loader and show success
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully!",
          confirmButtonColor: "#3085d6",
        });
        setState({
          name: "",
          email: "",    // Reset email state
          roles: "",
          password: "",
        });
      } else {
        // Close the Swal loader and show error
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.data.message || "Unable to register. Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      // Close the Swal loader and show error
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data.message || "An error occurred during registration. Please try again.",
        confirmButtonColor: "#d33",
      });
      console.error("Registration error:", error);
    }
  };

  // const navigateBasedOnRole = (role) => {
  //   switch (role) {
  //     case "SrCreditReviewer":
  //       navigate("/srcreditreviewer");
  //       break;
  //     case "HeadOfFCR":
  //       navigate("/dashboardfcr");
  //       break;
  //     case "CreditReviewer":
  //       navigate("/dashtoAssign");
  //       break;
  //     case "SPOC":
  //       navigate("/spocchild");
  //       break;
  //     default:
  //       navigate("/");  // Default redirect
  //       break;
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'white' }}>
      <Paper className="w-full max-w-md p-6 rounded-lg shadow-xl bg-white" elevation={5}>
        <Box className="text-center mb-4">
          <Typography variant="h4" style={{ color: '#f27013' }} className="mb-2">
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {isLogin ? 'Enter your credentials' : 'Create an account'}
          </Typography>
        </Box>

        <form onSubmit={isLogin ? handleOnSubmitLogin : handleOnSubmitRegister} className="space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={state.name}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#f27013' },
            }}
            className="transition duration-500 transform hover:scale-105"
          />
          {!isLogin && (
            <>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={state.email}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#f27013' },
                }}
                className="transition duration-500 transform hover:scale-105"
              />
              <TextField
                label="Roles"
                variant="outlined"
                fullWidth
                required
                name="roles"
                value={state.roles}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: '#f27013' },
                }}
                className="transition duration-500 transform hover:scale-105"
              />
            </>
          )}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            name="password"
            value={state.password}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: '#f27013' },
            }}
            className="transition duration-500 transform hover:scale-105"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ backgroundColor: '#f27013' }}
            className="py-2 mt-4 text-white font-semibold bg-gradient-to-r from-[#f27013] to-[#d24b00] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <Box className="text-center mt-4">
          <Button
            className="text-[#f27013] underline"
            onClick={handleSwitch}
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;



