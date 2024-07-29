import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.ngurusizin.online/api/layanan?page=${currentPage}&pageSize=${pageSize}`
        );
        setLayanan(response.data.data.data);
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
  console.log(layanan);

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
          {layanan.map((item) => {
            let partDeskripsi = item.attributes.deskripsi.split("\r\n");
            let deskripsi = partDeskripsi.filter((item) => item.trim() !== ""); // menghapus string yang kosong

            return (
              <div className="flex" key={item.id}>
                <div className="p-4 bg-white shadow-md rounded-3xl">
                  <img
                    src={item.attributes.urlGambar}
                    alt=""
                    className="w-80 h-56 rounded-2xl p-4"
                  />
                  <div className="flex justify-center font-semibold">
                      <span>Rp.{item.attributes.harga}</span>
                  </div>
                  
                  <div className="flex-auto text-center">  
                    <div className="flex flex-wrap ">
                      <h2 className="flex-auto text-lg font-medium">
                        {item.attributes.nama}
                      </h2>
                    </div>

                    <p className="mb-5 text-gray-500 max-w-80">
                      {deskripsi.map((data, index) => (
                        <p key={index}>{data}</p>
                      ))}
                    </p>

                    <div className="flex justify-center text-sm font-medium">
                      <Link
                        href={`/layanan/form/?id=${item.id}`}
                        className="px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm md:mb-0 bg-blue-400 hover:bg-blue-900"
                        type="button"
                        aria-label="like"
                      >
                        Beli
                      </Link>
                    </div>
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
