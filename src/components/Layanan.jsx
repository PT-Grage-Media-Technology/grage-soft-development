import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "./elements/LoadingLayanan";

export default function Layanan() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/paket");
        setPaket(response.data.data);
      } catch (error) {
        console.error("Error fetching data paket:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingLayanan key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="relative -mt-5 bg-transparent">
      <div className="mt-10">
        <h1 className="font-extrabold text:3xl  lg:text-3xl text-center bg-clip-text text-gray-800">
          Layanan dan Harga
        </h1>
      </div>
      <div className="relative flex flex-col items-center px-6 justify-center lg:px-28 mt-4">
        <span className="flex text-center text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error magnam
          beatae assumenda consequuntur numquam iure ad cumque, ut non hic porro
          dignissimos quod obcaecati debitis culpa eligendi explicabo magni!
          Perferendis!
        </span>
      </div>
      <div className="relative flex flex-col items-center px-8 justify-center lg:px-28">
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
                  {item["jumlah_pilihan_desain"]} Pilihan Desain.{" "}
                  <a href="" className="text-blue-500">
                    Lihat klik disini
                  </a>
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
                      href={`/paket/form/?id=${item.id}`}
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
      <div className="flex justify-center">
        <Link
          href={"/paket"}
          type="submit"
          className="block px-4 py-3 mt-6 font-semibold text-center text-white rounded-lg w-52 bg-blue-400 hover:bg-blue-900"
        >
          Lihat Semua Layanan
        </Link>
      </div>
    </section>
  );
}
