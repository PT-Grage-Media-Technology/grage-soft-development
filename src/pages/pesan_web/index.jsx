import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [setting, setSetting] = useState(""); // State untuk menyimpan nomor WA

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/setting`
        );
        setSetting(response.data.data.data[0]);
        console.log(response.data.data.data[0]);
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },)

  console.log(setting);

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

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const buttonWA = () => {
    window.location.href = `https://wa.me/62${ setting.attributes.wa }`;
  };
  const buttonTelepon = () => {
    window.location.href = `tel:0${ setting.attributes.wa }`;
  };

  return (
    <section className="relative -mt-5 bg-transparent">
      <div className="flex flex-col w-full mx-auto sm:px-10 md:px-12 lg:px-28 lg:flex-row lg:gap-12 bg-blue-500 py-24 lg:py-32">
        <div className="relative text-white flex flex-col max-w-3xl mx-auto lg:text-left xl:py-8 lg:items-center lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/ lg:px-48">
          <h1 className="text-3xl text-center font-bold leading-tight lg:text-5xl">
            Cara Pesan Web
          </h1>
        </div>
      </div>

    

      <p className="text-center font-semibold text-4xl pt-16">Whatsapp</p>
      <p className="text-center pt-4">Klik Untuk WA:</p>
      <div className="flex justify-center py-5">
        <button
          onClick={buttonWA}
          className="bg-green-500 py-3 px-5 flex justify-center rounded-lg text-white"
        >
          <FaWhatsapp className="me-3 mt-0" size={22} />
          <p className="me-2">0{ setting.attributes.wa }</p>
        </button>
      </div>
      <p className="text-center font-semibold text-4xl pt-16">Telepon</p>
      <p className="text-center pt-4">Klik Untuk Telpon:</p>
      <div className="flex justify-center py-5">
        <button
          onClick={buttonTelepon}
          className="bg-green-500 py-3 px-5 flex justify-center rounded-lg text-white"
        >
          <IoCallOutline className="me-3 mt-0" size={22} />
          <p className="me-2">0{ setting.attributes.wa }</p>
        </button>
      </div>
    </section>
  );
}
