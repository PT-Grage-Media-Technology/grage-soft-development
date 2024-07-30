import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import LoadingLayanan from "@/components/elements/LoadingLayanan";
import { IoCallOutline } from "react-icons/io5";

export default function Layanan() {
  const [klien, setKlien] = useState([]);
  // const [included, setIncluded] = useState([]); // Tambahkan state untuk included
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://api.ngurusizin.online/api/layanan?page=${currentPage}&pageSize=${pageSize}`
          "http://localhost:5000/api/klien/"
        );
        setKlien(response.data.data);
        // console.log('klien', response.data.data);
        // setIncluded(response.data.included); // Set included dari response
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    
    fetchData();
  }, [currentPage]);

  console.log('klien', klien);

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  // Menampilkan Skeleton saat loading atau error fetching data
  if (loading) {
    return (
      <>
        <div className="relative flex flex-col items-center justify-center lg:px-28">
          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
            {Array.from({ length: pageSize }).map((_, index) => (
              <LoadingLayanan key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // Menghitung angka pertama yang akan ditampilkan dalam navigasi paginasi
  const firstPage = Math.max(1, currentPage - 4);

  return (
    <section className="relative -mt-5 bg-transparent">
      <div className="flex flex-col w-full mx-auto sm:px-10 md:px-12 lg:px-28 lg:flex-row lg:gap-12 bg-blue-500 py-24 lg:py-32">
        <div className="relative text-white flex flex-col max-w-3xl mx-auto lg:text-left xl:py-8 lg:items-center lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/ lg:px-48">
          <h1 className="text-3xl text-center font-semibold leading-tight lg:text-4xl">
            Klien Kami
          </h1>
        </div>
      </div>

      <p className="font-semibold text-center text-lg pt-11 text-gray-600">
        Berikut Ini Adalah Daftar Klien Kami
      </p>
      <p className="font-semibold text-center text-lg pt-11 text-gray-500">
      Total : 3.569 Klien Aktif
      </p>

    <div className="relative flex flex-col items-center justify-center lg:px-28">
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
        {/* {klien.map((item, index) => {
          const kategori = included && item.relationships && item.relationships["kategori-klien"] && item.relationships["kategori-klien"].data
            ? included.find(
                (inc) => inc.type === "kategori_kliens" && inc.id === item.relationships["kategori-klien"].data.id
              )
            : null;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{kategori ? kategori.attributes["nama-kategori-klien"] : "Kategori tidak ditemukan"}</h2>
              <img src={item.attributes["url-klien"]} alt={item.attributes["logo-klien"]} className="mb-4" />
              <p className="text-gray-500">Paket ID: {item.attributes["paket-id"]}</p>
            </div>
          );
        })} */}

        {klien.map((item, index) => {
          console.log('masuk', item.kategori_klien.data);
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{item.kategori_klien ? item.kategori_klien.nama_kategori_klien : "Kategori tidak ditemukan"}</h2>
              <img src={item["url_klien"]} alt={item["logo-klien"]} className="mb-4" />
              <p className="text-gray-500">Paket ID: {item["paket-id"]}</p>
            </div>
          );
        })}
      </div>
    </div>
      
    </section>
  );
}