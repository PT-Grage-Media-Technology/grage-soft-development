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
    nama_paket: "",
    jumlah_pilihan_desain: "",
    status_website: "",
    kategori_website_id: "",
  });

  const [kategoriWebsite, setKategoriWebsite] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/kategoriWebsite`
      );
      console.log(response);
      setKategoriWebsite(response.data.data);
    } catch (error) {
      console.error("Error fetching data paket:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("harga", formData.harga);
      formDataToSend.append("nama_paket", formData.nama_paket);
      formDataToSend.append(
        "jumlah_pilihan_desain",
        formData.jumlah_pilihan_desain
      );
      formDataToSend.append("status_website", formData.status_website);
      formDataToSend.append(
        "kategori_website_id",
        formData.kategori_website_id
      );

      console.log('id',formData.kategori_website_id);
      console.log('id',formData.status_website);

      const response = await axios.post(
        "http://localhost:5000/api/paket",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 201) {
        showToastMessage();
        router.push("/admin/paket");
      } else {
        console.error("Gagal mengirim data", response);
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
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-orange-400 hover:bg-orange-500 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-20 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="nama_paket"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama Paket
              </label>
              <input
                type="text"
                name="nama_paket"
                id="nama_paket"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.nama_paket}
                onChange={handleInputChange}
                required
              />
            </div>
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
                htmlFor="status_website"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Status Website
              </label>

              <div className="mb-5">
                <select
                  name="status_website"
                  id="status_website"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.status_website}
                  onChange={handleInputChange}
                  required
                >
                  <option>Siap Di Pakai</option>
                  <option>Tersedia</option>
                  <option>Tidak Tersedia</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="kategori_website_id"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Kategori Website
              </label>

              <div className="mb-5">
                <select
                  name="kategori_website_id"
                  id="kategori_website_id"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.kategori_website_id}
                  onChange={handleInputChange}
                  required
                >
                  {kategoriWebsite.map((item) => (
                    <option key={item['id']} value={item['id']}>
                      {item['attributes']['nama-kategori']}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button className="w-full px-8 py-3 text-base font-semibold text-center text-white rounded-md outline-none hover:shadow-form bg-blue-400 hover:bg-blue-500">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
