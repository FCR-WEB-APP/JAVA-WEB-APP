import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    const { name, email, password } = state;
    alert(`You signed up with name: ${name}, email: ${email}, and password: ${password}`);
    setState({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-up-container flex items-center justify-center bg-white p-6 shadow-lg rounded-lg space-y-4 w-full max-w-md">
      <form onSubmit={handleOnSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <div className="flex justify-center space-x-4">
          <a href="#" className="text-white bg-blue-600 p-2 rounded-full">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="text-white bg-red-600 p-2 rounded-full">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="text-white bg-blue-700 p-2 rounded-full">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        <span className="block text-gray-600 text-sm text-center">or use your email for registration</span>

        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
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

        <button className="w-full py-2 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
