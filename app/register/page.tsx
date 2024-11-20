"use client";
import { useGlobalContext } from "@/context/ContextApi";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<any>();
  const {
    userObject: { isAuthUser },
  } = useGlobalContext();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name.length <= 3) {
      setErrorMessage("name must be more than 3 characters");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("invalid email");
      return;
    }
    if (password.length <= 5) {
      setErrorMessage("Password must contain more than 5 characters");
      return;
    }
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      // console.log(response.data.message);

      router.push("/login");
    } catch (error) {
      console.log("error", error);
      const axiosError = error as AxiosError;
      // console.log("-----------------------------", axiosError);

      // let errMessage = axiosError.response?.data.statusMessage;
      setErrorMessage(axiosError.response?.data);
      // setErrorMessage(axiosError.response.data);
      console.log(axiosError.response?.data);
    }
  };
  useEffect(() => {
    // if (isAuthUser === undefined) router.push("/login");
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  // ===============================================
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 border border-black h-fit"
      >
        <h2 className="font-bold mx-auto">Register</h2>
        <div className="">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label>Email</label>
          <input
            type="enail"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white mx-auto px-5 hover:bg-blue-700">
          Register
        </button>
        {errorMessage && <span>Registration failed</span>}
        {errorMessage && (
          <span className="text-red-500">{JSON.stringify(errorMessage)}</span>
        )}
      </form>
      <span
        className="underline cursor-pointer"
        onClick={() => router.push("/login")}
      >
        Go to login
      </span>
    </div>
  );
}
