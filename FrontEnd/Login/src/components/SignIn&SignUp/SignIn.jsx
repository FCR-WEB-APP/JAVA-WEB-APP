import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function SignInForm() {
  const [state, setState] = React.useState({
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
    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);
    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container flex items-center justify-center bg-white p-6 shadow-lg rounded-lg space-y-4 w-full max-w-md">
      <form onSubmit={handleOnSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>

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

        <span className="block text-gray-600 text-sm text-center">or use your account</span>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
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

        <a href="#" className="block text-right text-sm text-orange-600">Forgot your password?</a>

        <button className="w-full py-2 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
