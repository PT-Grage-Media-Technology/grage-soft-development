import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "./elements/LoadingLayanan";
import styles from './Layanan.module.css'; // Import CSS module

export default function Layanan() {
  const [paket, setPaket] = useState([]);
  const [benefitPaket, setBenefitPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const [paketResponse, benefitResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/paket"),
          axios.get("http://localhost:5000/api/benefitPaket")
        ]);
        setPaket(paketResponse.data.data);
        setBenefitPaket(benefitResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <h1 className="font-extrabold text-3xl lg:text-3xl text-center bg-clip-text text-gray-800">
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
      <div className="relative flex flex-col items-center px-6 py-2 justify-center lg:px-24">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-3">
          {paket.map((item) => (
            <div
              className={`grid grid-5 shadow-2xl rounded-2xl ${styles.paketCard}`} // Add CSS module class
              key={item.id}
            >
              <h2 className="flex justify-center font-bold h-16 px-16 pt-4 bg-green-400 text-xl text-white">
                {item["nama_paket"]}
              </h2>

              <span className="bg-gray-100 text-center h-16 pt-3 text-3xl font-semibold px-16">
                Rp {item["harga"]}
              </span>

              <span className="bg-gray-100 text-center h-16 pt-4 px-16 text-lg">
                {item["status_website"]}
              </span>

              <span className="bg-white text-center h-16 pt-4 font-semibold px-2 lg:px-18 text-lg">
                {item["jumlah_pilihan_desain"]} Pilihan Desain.{" "}
                <a href="contoh_desain" className="text-blue-500">
                  Lihat klik disini
                </a>
              </span>

              {benefitPaket
                .filter(benefit => benefit.paket_id === item.id)
                .map((benefit, index) => {
                  const bgColor = index % 2 === 0 ? 'bg-gray-100' : 'bg-white';
                  return (
                    <div key={benefit.id} className={`text-center h-16 pt-4 px-18 lg:px-16 text-lg w-full ${bgColor}`}>
                       {benefit.nama_benefit}
                    </div>
                  );
                })}

              <div className="flex-auto text-center bg-gray-100">
                <div className="flex justify-center text-sm font-medium pt-4 pb-9">
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
          ))}
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