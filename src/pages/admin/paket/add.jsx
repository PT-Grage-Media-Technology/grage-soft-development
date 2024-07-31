import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Add() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    harga: "",
    jumlah_pilihan_desain: "",
    status_website: "",
    kategori_Website_Id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("harga", formData.harga);
      formDataToSend.append("jumlah_pilihan_desain", formData.jumlah_pilihan_desain); 
      formDataToSend.append("status_website", formData.status_website);
      formDataToSend.append("kategori_Website_Id", formData.kategori_Website_Id);
      // formDataToSend.append("status", formData.status);

      const response = await axios.post(
        "http://localhost:5000/api/paket",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan.");
        showToastMessage();
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/paket");
      } else {
        console.error("Gagal mengirim data", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      // Mengganti 'file' menjadi 'gambar'
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
        // mengambil file pertama dari daftar file yang dipilih
        gambarUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const showToastMessage = () => {
    toast.success("Item berhasil ditambahkan", {
      position: "top-right",
    });
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg  lg:-mt-48">
          <Link href={"/admin/paket"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="harga"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Harga
              </label>
              <input
                type="text"
                name="harga"
                id="harga"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.harga}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6 ">
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Jumlah Pilihan Desain
              </label>
              <div className="mb-8">
                <input
                  type="number"
                  name="jumlah_pilihan_desain"
                  id="jumlah_pilihan_desain"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={formData.jumlah_pilihan_desain}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="deskripsi"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Status Website
              </label>
              <input
                type="text"
                name="status_website"
                id="status_website"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.status_website}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="deskripsi"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                ID Kategori Website
              </label>
              <input
                type="number"
                name="kategori_Website_Id"
                id="kategori_Website_Id"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.kategori_Website_Id}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <button className="w-full px-8 py-3 text-base font-semibold text-center text-white rounded-md outline-none hover:shadow-form bg-gradient-to-r from-indigo-400 to-gray-600 hover:bg-indigo-400 focus:bg-indigo-400">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
