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
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (name.length <= 3) {
      setErrorMessage("name must be more than 3 characters");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("invalid email");
      setLoading(false);
      return;
    }
    if (password.length <= 5) {
      setErrorMessage("Password must contain more than 5 characters");
      setLoading(false);
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
    } finally {
      setLoading(false);
      setErrorMessage("");
    }
  };
  useEffect(() => {
    // if (isAuthUser === undefined) router.push("/login");
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  // ===============================================
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-col w-[400px] border border-black h-fit p-5 rounded-3xl shadow-xl bg-slate-200">
        <h2 className="font-bold text-3xl mx-auto">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 h-fit"
        >
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="enail"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-full"
            />
          </div>
          <button className="bg-blue-600 w-full p-2 rounded-full text-white hover:bg-blue-700 mt-4">
            <span className="mx-auto">
              {loading ? "Please Wait..." : "Register"}
            </span>
          </button>
        </form>
        <span
          className="underline cursor-pointer mt-4 text-center"
          onClick={() => router.push("/login")}
        >
          Go to login
        </span>
        {errorMessage && <span>Registration error</span>}
        {errorMessage && (
          <span className="text-red-500">{JSON.stringify(errorMessage)}</span>
        )}
      </div>
    </div>
  );
}
