import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./login.css";

//TODO: Implement login via api, return bearer token

function usernameIsValid(str) {
  var regex = /^[A-Za-z]+$/;
  if (str.match(regex) && str.length >= 3) {
    return true;
  } else {
    return false;
  }
}
function passwordIsValid(password) {
  return password.length >= 7 ? true : false;
}

function showErrorMsg(msg) {
  if (!msg || msg === "") return null;

  return (
    <div className="error">
      <p className="error-msg">{msg}</p>
    </div>
  );
}

export const Login = ({ onLogin, errorMsg, loading, ...props }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  return (
    <div id="login" {...props}>
      <div className="login-card">
        <label htmlFor="login-name" className="login-input">
          Username
          <input
            disabled={loading}
            type="text"
            id="login-name"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              const newUsername = e.target.value;
              setUsername(newUsername);
            }}
          />
        </label>
        <label htmlFor="login-password" className="login-input">
          Password
          <input
            disabled={loading}
            type="password"
            id="login-password"
            placeholder="*******"
            value={password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setPassword(newPassword);
            }}
          />
        </label>
        <button
          disabled={loading}
          className={`login-btn ${loading ? "loading" : ""}`}
          onClick={() => {
            setError("");

            if (!usernameIsValid(username))
              setError(
                "The name must contain only alphabetical letters and must have a minumum length of 3 characters."
              );

            if (!passwordIsValid(password))
              setError(
                "The password must have a minimum length of 7 characters."
              );

            if (!usernameIsValid(username) && !passwordIsValid(password)) {
              setError(
                "The name must contain only alphabetical letters, must have a minumum length of 3 characters and the password must have a minimum length of 7 characters."
              );
            }

            if (usernameIsValid(username) && passwordIsValid(password)) {
              onLogin({
                email: `username${".testing@testing.com"}`,
                password: password,
              });
            }
          }}
        >
          Login
        </button>

        {showErrorMsg(error)}
      </div>
    </div>
  );
};

Login.propTypes = {
  // Handler when username is valid and the password is provided
  onLogin: PropTypes.func,
  // error msg to dispay
  errorMsg: PropTypes.string,
  // Loader to Disable inputs and button
  loading: PropTypes.bool,
};

Login.defaultProps = {
  onLogin: undefined,
  login: false,
  errorMsg: "",
};
