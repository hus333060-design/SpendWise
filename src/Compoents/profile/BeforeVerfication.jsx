import React, { useState } from "react";
import Protal from "./Protal";

export const BeforeVerfication = ({ setSignup, formData, setFormData }) => {
  const [modalType, setModalType] = useState(null);
  return (
    <div className="flex space-x-2 ">
      <div>
        <button
          className="hover:scale-110 transition-all duration-100 hover:cursor-pointer"
          onClick={() => setModalType("login")}
        >
          Login
        </button>
      </div>
      <div>
        <button
          className="hover:scale-110 transition-all duration-100 hover:cursor-pointer"
          onClick={() => {
            setModalType("signup");
          }}
        >
          Signup
        </button>

        <Protal
          modalType={modalType}
          setModalType={setModalType}
          setSignup={setSignup}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};
