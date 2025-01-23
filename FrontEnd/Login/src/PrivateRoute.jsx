import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("roles"); // Fetch roles from localStorage
  const location = useLocation();

  // Allow access to the login page regardless of roles
  if (location.pathname === "/login") {
    return children;
  }

  // Redirect to login if no user role is found
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowed roles
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // Redirect to unauthorized page if roles don't match
  return <Navigate to="/unauthorized" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;
