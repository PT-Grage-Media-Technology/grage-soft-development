import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [klien, setKlien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/klien/");
        setKlien(response.data.data);
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (loading) {
    return (
      <div className="relative flex flex-col items-center justify-center lg:px-28">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
          {Array.from({ length: pageSize }).map((_, index) => (
            <LoadingLayanan key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="relative -mt-5 bg-transparent">
      <div className="flex flex-col w-full mx-auto sm:px-10 md:px-12 lg:px-28 lg:flex-row lg:gap-12 bg-blue-500 py-24 lg:py-32">
        <div className="relative text-white flex flex-col max-w-3xl mx-auto lg:text-left xl:py-8 lg:items-center lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/ lg:px-48">
          <h1 className="text-3xl text-center font-semibold leading-tight lg:text-4xl">
            Paket G Desain
          </h1>
        </div>
      </div>

      <p className="font-semibold text-center text-4xl pt-11 text-gray-600">
        Contoh Desain
      </p>

      <div className="relative flex flex-col items-center justify-center pt-5">
        <div className="grid grid-cols-1 gap-x-96 gap-y-8 mt-8 lg:grid-cols-3">
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
          <li>Testing 1</li>
        </div>
      </div>
    </section>
  );
}
