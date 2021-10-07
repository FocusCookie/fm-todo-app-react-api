import React from "react";
import PropTypes from "prop-types";
import "./login.css";

export const Login = ({ onSuccess, onError, ...props }) => {
  return (
    <div id="login" {...props}>
      <div className="login-card">
        <label htmlFor="login-name" className="login-input">
          Username
          <input type="text" id="login-name" placeholder="Username" />
        </label>

        <label htmlFor="login-password" className="login-input">
          Password
          <input type="password" id="login-password" placeholder="*******" />
        </label>

        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  // Handler when the login was successfull
  onSuccess: PropTypes.func,
  // Handler when the login failed
  onError: PropTypes.func,
};

Login.defaultProps = {
  onSuccess: undefined,
  onError: undefined,
};
