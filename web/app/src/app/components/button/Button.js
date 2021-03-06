import React from "react";
import "./Button.css";

function Button(props) {
  function getButtonColor() {
    if (props.isDisabled) {
      return "";
    }
    if (props.isPrimary) {
      return "button-primary";
    }
    if (props.isBlue) {
      return "button-blue";
    }
    if (props.isGreen) {
      return "button-green";
    }
    return "";
  }

  return (
    <div
      style={props.style}
      type={props.type}
      className={
        "button " +
        (props.className !== undefined ? props.className : "") +
        (props.isDisabled ? "button-disabled" : "") +
        " " +
        getButtonColor()
      }
      onClick={() => {
        if (props.onClick !== undefined && !props.isDisabled) props.onClick();
      }}
    >
      <span style={{ marginLeft: "12px", marginRight: "12px" }}>
        {props.children}
      </span>
    </div>
  );
}

export default Button;
