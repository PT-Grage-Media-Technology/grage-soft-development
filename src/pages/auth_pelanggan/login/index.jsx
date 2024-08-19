import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false); // State untuk melacak apakah formulir sudah dikirimkan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Menandai bahwa formulir sudah dikirimkan

    if (!email) return; // Jika email tidak diisi, jangan melanjutkan pengiriman formulir
    if (!password) return; // Jika password tidak diisi, jangan melanjutkan pengiriman formulir

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan token JWT di dalam cookie dengan nama 'token'
      setCookie("token", response.data.token, { path: "/" });

      // Redirect ke halaman admin/dashboard
      router.push("/pelanggan/invoice");
    } catch (error) {
      console.error("Login error:", error);
      // setError("Email atau password salah.");
      showToastMessage();
    }
  };
  const showToastMessage = () => {
    toast.error("Email atau password salah !", {
      position: "top-right",
    });
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div class="min-h-screen bg-cyan-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold">Login</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div class="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div class="relative">
                    <button class="bg-cyan-500 text-white rounded-md px-8 py-1 justify-center">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
