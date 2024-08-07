import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    setting_warna: "",
    wa: "",
    telp: null, // Set default value to null
    email: "",
    profil_perusahaan: "",
    alamat: "",
    urlGambar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("setting_warna", formData.setting_warna);
      formDataToSend.append("foto", formData.gambar); // Mengganti 'file' menjadi 'gambar'
      formDataToSend.append("wa", formData.wa);
      formDataToSend.append("telp", formData.telp);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profil_perusahaan", formData.profil_perusahaan);
      formDataToSend.append("alamat", formData.alamat);

      const response = await axios.post("http://localhost:5000/api/setting", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/setting");
      } else {
        console.error("Gagal mengirim data.");
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
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg  lg:-mt-48">
          <Link href={"/admin/setting"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mb-6 ">
              {" "}
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Gambar
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  htmlFor="gambar"
                  className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="setting_warna"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Setting Warna
              </label>
              <textarea
                type="text"
                name="setting_warna"
                id="setting_warna"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.setting_warna}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="wa"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                WA
              </label>
              <textarea
                type="text"
                name="wa"
                id="wa"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.wa}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="telp"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Telepon
              </label>
              <textarea
                type="text"
                name="telp"
                id="telp"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.telp}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <textarea
                type="text"
                name="email"
                id="email"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.email}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="profil_perusahaan"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Profil Perusahaan
              </label>
              <textarea
                type="text"
                name="profil_perusahaan"
                id="profil_perusahaan"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.profil_perusahaan}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="mb-5">
              <label
                htmlFor="alamat"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Alamat
              </label>
              <textarea
                type="text"
                name="alamat"
                id="alamat"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.alamat}
                onChange={handleInputChange}
                required
              ></textarea>
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
