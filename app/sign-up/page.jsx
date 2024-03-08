"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUp from "@components/SignUp";

const MySignUp = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });

      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      console.log(formData);
      if (response.ok) {
        await signIn("credentials", {
          // redirect: false,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SignUp
      type="Sign"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default MySignUp;
