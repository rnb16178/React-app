import React from "react";
import ReactDom from 'react-dom'
import {Button } from "@material-ui/core";


const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "0",
  backgroundColor: "#eee",
  transform: 'translate(0, -50%)',
  opacity: 0.9,
  padding: "50px",
  zIndex: 1000,
};
const OVERLAY_STYLE={
    position: 'fixed',
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000,
}

const BUTTON_STYLE={
    position: 'fixed',
    top: 0,
    right:0,
}
export default function Modal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
    <div style={OVERLAY_STYLE}></div>
      <div style={MODAL_STYLES}>
        <Button onClick={onClose} style={BUTTON_STYLE}>Close</Button>

        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
}
