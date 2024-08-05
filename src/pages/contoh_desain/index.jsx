import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [contohDesain, setcontohDesain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contohDesain");

        console.log(response.data); // Log seluruh data yang diterima
        setcontohDesain(response.data);
      } catch (error) {
        console.error("Error fetching data contoh desain:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        {contohDesain.map((item) => (
        <div className="grid grid-cols-1  gap-x-28 gap-y-8 mt-8 lg:grid-cols-3">
          <li className="items-start"><a href={item.link_contoh_desain} className="text-blue-500">{item.link_contoh_desain}</a> ( {item.deskripsi} )</li>
        </div>
        ))}
      </div>
    </section>
  );
}
