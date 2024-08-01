import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/paket?page=${currentPage}&pageSize=${pageSize}`
        );
        setPaket(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data paket:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);
  console.log(paket);

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
          <h1 className="text-3xl text-center font-bold leading-tight lg:text-5xl">
            Harga Website
          </h1>
          <h1 className="flex justify-center  text-center mx-auto lg:px-24 mt-8 mb-4 text-lg leading-tight">
            Harga web bisa dicek di bawah
          </h1>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center lg:px-28">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-2">
          {paket.map((item) => {
            return (
              <div
                className="grid grid-5 shadow-2xl h-auto rounded-2xl"
                key={item.id}
              >
                <h2 className="flex justify-center font-bold h-16 pt-4 bg-green-400 text-xl text-white">
                  {item["nama_paket"]}
                </h2>

                <span className="bg-gray-100 text-center h-16 pt-3 text-3xl font-semibold px-20">
                  Rp {item["harga"]}
                </span>

                <span className="bg-gray-100 text-center h-16 pt-4 px-20 text-lg">
                  {item["status_website"]}
                </span>

                <span className="bg-white text-center h-16 pt-4 font-semibold px-20 text-lg">
                  {item["jumlah_pilihan_desain"]} Pilihan Desain. <a href="" className="text-blue-500">Lihat klik disini</a>
                </span>

                <span className="bg-gray-100 text-center h-16 pt-4 px-20 text-lg">
                  100 Domain
                </span>

                <span className="bg-white text-center h-16 pt-4 px-20 text-lg">
                  Hosting 1GB
                </span>

                <span className="bg-gray-100 text-center h-16 pt-4 px-20 text-lg">
                  Bandwidth 100 GB/ bulan
                </span>

                <span className="bg-white text-center h-16 pt-4 px-20 text-lg">
                  Panduan edit web
                </span>

                <span className="bg-gray-100 text-center h-16 pt-4 px-20 text-lg font-semibold">
                  Gratis Tanya Jawab & Pemanduan
                </span>

                <span className="bg-white text-center h-16 pt-4 px-20 font-semibold text-lg">
                  Garansi dari hacker dan virus
                </span>

                <span className="bg-gray-100 text-center h-16 pt-4 px-20 text-lg font-semibold">
                  Perpanjangan: Rp. 500.000/ tahun
                </span>

                <div className="flex-auto text-center bg-gray-100">
                  <div className="flex justify-center text-sm font-medium pt-4 pb-9 ">
                    <Link
                      href={`/layanan/form/?id=${item.id}`}
                      className="px-8 py-2 mb-2 tracking-wider text-lg text-white rounded-full shadow-sm md:mb-0 bg-blue-400 hover:bg-blue-900"
                      type="button"
                      aria-label="like"
                    >
                      Beli
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
