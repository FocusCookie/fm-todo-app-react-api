import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ active, size, label, loading, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      disabled={loading}
      className={[
        "btn",
        `${active ? "btn--active" : ""}`,
        `btn--${size}`,
        `${loading ? "btn--loading" : ""}`,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * In which variant should the button rendered primary, secondary or text
   */
  active: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "normal"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Button will be deactivated while loading
   */
  loading: PropTypes.bool,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  active: false,
  loading: false,
  size: "normal",
  onClick: undefined,
};
