import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Rating() {
  const [klien, setKlien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // `https://api.ngurusizin.online/api/layanan?page=${currentPage}&pageSize=${pageSize}`
        "http://192.168.30.40:5000/api/klien/"
      );
      setKlien(response.data.data);
      // console.log("respon", response.data.data);
    } catch (error) {
      console.error("Error fetching data layanan:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <section className="py-12 bg-white rounded lg:px-28">
      <div className="flex flex-col items-center gap-5 mt-5 lg:flex-row">
        <h3 className="text-start text-gray-800 text-xl font-bold pb-8">
          Klien Kami
        </h3>
        {klien.map((item) =>
          item.is_headline ? ( // Cek is_headline
            <div key={item.id} className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center">
                <img
                  src={item.logo_klien}
                  alt={item.nama_klien}
                  className="w-36 h-36 rounded-full"
                />
              </div>
              <span className="font-semibold">{item.nama_klien}</span>
            </div>
          ) : null
        )}
        <button className="flex py-12 bg-blue-400 hover:bg-blue-900 text-white rounded-full mb-8 px-4 sm:ms-4">
          <Link href="/klien">
            <p>Lihat Semua Klien</p>
          </Link>
        </button>
      </div>
    </section>
  );
}
