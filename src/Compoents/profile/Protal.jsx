import React, { useState } from "react";
import { createPortal } from "react-dom";
import SignupForm from "./Forms/SignupForm";
import { LoginForm } from "./Forms/LoginForm";

function Protal({ modalType, setModalType, setSignup ,formData, setFormData}) {
if (!modalType) return null;

 
  return createPortal(
    <div className="fixed inset-0">
    {modalType === "login" ? (
      <LoginForm setSignup={setSignup} formData={formData} setFormData={setFormData} setModalType={setModalType}  />
    ) : (
      <SignupForm setSignup={setSignup} formData={formData} setFormData={setFormData}  setModalType={ setModalType}  />
    )}
  </div>,
    document.getElementById("portal"),
  );
}

export default Protal;
