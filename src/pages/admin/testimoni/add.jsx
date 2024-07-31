import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Add() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    jenis_testimoni: "",
    judul_testimoni: "",
    deskripsi_testimoni: "",
    gambar_testimoni: null,
    url_gambar: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("jenis_testimoni", formData.jenis_testimoni);
      formDataToSend.append("judul_testimoni", formData.judul_testimoni);

      formDataToSend.append(
        "deskripsi_testimoni",
        formData.deskripsi_testimoni
      );

      formDataToSend.append("gambar_testimoni", formData.gambar_testimoni);

      const response = await axios.post(
        "http://localhost:5000/api/testimoni/",
          formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/testimoni");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar_testimoni") {
      // Mengganti 'file' menjadi 'gambar'
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
        // mengambil file pertama dari daftar file yang dipilih
        url_gambar: URL.createObjectURL(files[0]),
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
          <Link href={"/admin/testimoni"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mt-4 mb-5">
              <label
                htmlFor="jenis_testimoni"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Jenis Testimoni
              </label>
              <select
                name="jenis_testimoni"
                id="jenis_testimoni"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.jenis_testimoni}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Jenis Testimoni</option>
                <option value="Wa">Wa</option>
                <option value="Email">Email</option>
              </select>
            </div>

            <div className="mb-6 ">
              {" "}
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Gambar Testimoni
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="gambar_testimoni"
                  id="gambar_testimoni"
                  htmlFor="gambar_testimoni"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="judul_testimoni"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Judul Testimoni
              </label>
              <input
                type="text"
                name="judul_testimoni"
                id="judul_testimoni"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.judul_testimoni}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="deskripsi_testimoni"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Deskripsi Testimoni
              </label>
              <textarea
                type="text"
                name="deskripsi_testimoni"
                id="deskripsi_testimoni"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.deskripsi_testimoni}
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
