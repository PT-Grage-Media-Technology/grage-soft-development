import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingLayanan from "@/components/elements/LoadingLayanan";
import styles from "@/components/Layanan.module.css"; // Import CSS module

export default function Layanan() {
  const [paket, setPaket] = useState([]);
  const [benefitPaket, setBenefitPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10; // Jumlah item per halaman

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paketResponse = await axios.get("http://localhost:5000/api/paket");
        const benefitResponse = await axios.get("http://localhost:5000/api/benefitPaket");
        
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
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

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

  // Mengelompokkan paket berdasarkan kategoriWebsite
  const groupedByCategory = paket.reduce((acc, item) => {
    const category = item.kategoriWebsite.nama_kategori;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <section className="relative -mt-5 bg-transparent">
      {Object.keys(groupedByCategory).map((category) => (
        <div key={category}>
          <h2 className="text-3xl text-center font-semibold mt-10 mb-6">{category}</h2>
          <div className="relative flex flex-col items-center px-6 py-2 justify-center lg:px-24">
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3 xl:grid-cols-3 w-full">
              {groupedByCategory[category].map((item) => (
                <div className={`shadow-2xl rounded-2xl ${styles.paketCard} w-full`} key={item.id}>
                  <h2 className="flex justify-center font-bold h-16 pt-4 bg-green-400 text-xl text-white">
                    {item.nama_paket}
                  </h2>

                  <span className="bg-gray-100 text-center h-16 pt-3 text-3xl font-semibold px-16">
                    Rp {item.harga}
                  </span>

                  <span className="bg-gray-100 text-center h-16 pt-4 px-16 text-lg">
                    {item.status_website}
                  </span>

                  <span className="bg-white text-center h-16 pt-4 font-semibold px-2 lg:px-18 text-lg">
                    {item.jumlah_pilihan_desain} Pilihan Desain.{" "}
                    <a href={`/contoh_desain/${item.id}`} className="text-blue-500">
                      Lihat klik disini
                    </a>
                  </span>

                  {benefitPaket
                    .filter((benefit) => benefit.paket_id === item.id)
                    .map((benefit, index) => {
                      const bgColor =
                        index % 2 === 0 ? "bg-gray-100" : "bg-white";
                      return (
                        <div
                          key={benefit.id}
                          className={`text-center h-auto pb-5 pt-4 px-18 lg:px-16 text-lg w-full ${bgColor}`}
                        >
                          {benefit.nama_benefit}
                        </div>
                      );
                    })}

                  <div className="flex-auto text-center bg-gray-100">
                    <div className="flex justify-center text-sm font-medium pt-4 pb-9">
                      <Link
                        href={`/pesan_web`}
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
        </div>
      ))}
    </section>
  );
}
