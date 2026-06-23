import React, { useEffect } from "react";
import app from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";


export default function SignupForm({
  setSignup,
  formData,
  setFormData,
  setModalType,
}) {

  async function handleSubmit(e) {
    console.log(formData);
    e.preventDefault();

       if (formData.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  try {

const userCredential = await createUserWithEmailAndPassword(
  auth,
  formData.email,
  formData.password
);


const user = userCredential.user;

await setDoc(
  doc(db, "users", user.uid),
  {
    username: formData.username,
    email: formData.email,
     createdAt: new Date(),
  }
);

setModalType(null);
if (auth.currentUser) {
  setSignup(true);
}


  } catch (err) {
    console.log(err.code);
    console.log(err.message);
  }
  }
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 "
      onClick={() => setModalType(null)}
    >
      <form
        className="bg-white p-6 rounded-xl w-[90%] max-w-md"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3"
          name="username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 border rounded cursor-pointer transition duration-200 hover:scale-110"
            onClick={() => {
              setModalType(null);
            }}
          >
            Close
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer transition duration-200 hover:scale-110"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
