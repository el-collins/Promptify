// // Import necessary hooks and components from React and Redux
// import { useState } from "react";
import Link from "next/link";
// import { signInStart,signInSuccess, signFailure } from "../redux/user/userSlice";


const SignUp = ({ type, submitting, handleSubmit, formData, setFormData }) => {
  return (
    <section className="p-3 max-w-lg mx-auto w-full">
      <h1 className="text-3xl text-center font-semibold my-7">{type} Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          value={formData.username}
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username" required
          onChange={(e)=> setFormData({...formData,
            [e.target.id]: e.target.value, })}
        />
        <input
        value={formData.email}
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email" required
          onChange={(e)=> setFormData({...formData,
            [e.target.id]: e.target.value, })}
        />
        <input
        value={formData.password}
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password" required
          onChange={(e)=> setFormData({...formData,
            [e.target.id]: e.target.value, })}
        />
        <button
          disabled={submitting}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {submitting ? `${type}... up` : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link href="/sign-in">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {/* {error && <p className="text-red-500 mt-5">{error}</p>} */}
    </section>
  );
};

export default SignUp;
