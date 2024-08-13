import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama_kategori_klien: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData; 
      formDataToSend.append("nama_kategori_klien", formData.nama_kategori_klien);
   
      const response = await axios.post("http://localhost:5000/api/kategoriKlien/", formDataToSend, {
        headers: {
            "Content-Type": "application/json",
        }
      });

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/kategoriKlien");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[700px] bg-white rounded-lg  lg:-mt-28">
        <div className="relative py-2">
            <Link href={"/admin/kategoriKlien"} className="absolute right-4 top-10">
              <div className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer bg-orange-400 text-md">
                <i className="fas fa-arrow-left"></i>
                <span>Kembali</span>
              </div>
            </Link>
          </div>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mt-4 mb-5">
              <label
                htmlFor="nama_kategori_klien"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama Kategori Klien
              </label>
              <input
                type="text"
                name="nama_kategori_klien"
                id="nama_kategori_klien"
                className="w-full rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.nama_kategori_klien}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <button className="w-full px-8 py-3 text-base font-semibold text-center text-white rounded-md outline-none hover:shadow-form bg-blue-400 hover:bg-indigo-600 focus:bg-indigo-400">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
