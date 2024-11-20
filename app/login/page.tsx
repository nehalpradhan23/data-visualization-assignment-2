"use client";
import { useGlobalContext } from "@/context/ContextApi";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>();
  const router = useRouter();

  const {
    userObject: { user, isAuthUser, setIsAuthUser, setUser },
  } = useGlobalContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // const data = response
      // console.log("resp ----------", response.data.finalData);

      if (response.data.message === "success") {
        setIsAuthUser(true);
        setUser(response.data.finalData);
        Cookies.set("token", response.data.finalData.token);
        localStorage.setItem("user", JSON.stringify(response?.data.finalData));
        // router.push("/");
      } else {
        setIsAuthUser(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(error);
      setErrorMessage(axiosError.response?.data);
    }
  };
  // console.log("user data: ", user);

  useEffect(() => {
    // if (isAuthUser === undefined) router.push("/login");
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 *:flex *:gap-3 *:justify-between p-3 border border-black h-fit"
      >
        <h2 className="font-bold mx-auto">Login</h2>
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
          Login
        </button>
        {errorMessage && <span>{JSON.stringify(errorMessage)}</span>}
      </form>
      <span
        className="underline cursor-pointer"
        onClick={() => router.push("/register")}
      >
        Go to Register
      </span>
    </div>
  );
};

export default LoginPage;
