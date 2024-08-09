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
    link_contoh_desain: "",
    gambar_link_contoh_desain: null,
    is_gambar: "",
    deskripsi: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("link_contoh_desain", formData.link_contoh_desain);
      formDataToSend.append("is_gambar", formData.is_gambar);

      if(formData.is_gambar){
        formDataToSend.append("gambar_link_contoh_desain", formData.gambar_link_contoh_desain);
      }

      formDataToSend.append(
        "deskripsi",
        formData.deskripsi
      );

      const response = await axios.post(
        "http://localhost:5000/api/contohdesain",
        formDataToSend,
        {
          headers: {
            "Content-Type": formData.is_gambar ? "multipart/form-data" : "application/json",
          },
        }
      );

      if (response.status == 201) {
        showToastMessage();
        router.push("/admin/contoh_desain");
      } else {
        console.error("Gagal mengirim data", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = ({ target: { name, value, files } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: name === "gambar_link_contoh_desain" ? files[0] : value,
      ...(name === "gambar_link_contoh_desain" && { gambarUrl: URL.createObjectURL(files[0]) }),
    }));
  };

  const showToastMessage = () => {
    toast.success("Item berhasil ditambahkan", {
      position: "top-right",
    });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg  lg:-mt-48">
          <Link href={"/admin/contoh_desain"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mt-4 mb-5">
              <label
                htmlFor="nama_rek"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Link Contoh Desain
              </label>
              <div className="mb-6 ">
                {" "}
                <label className="mb-5 block text-base font-semibold text-[#07074D]">
                  Gambar
                </label>
                <div className="mb-8">
                  <input
                    type="file"
                    name="gambar_link_contoh_desain"
                    id="gambar_link_contoh_desain"
                    htmlFor="gambar_link_contoh_desain"
                    className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
                {" "}
                <label className="mb-5 block text-base font-semibold text-[#07074D]">
                  Link Website
                </label>
              <input
                type="text"
                name="link_contoh_desain"
                id="link_contoh_desain"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.link_contoh_desain}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4 mb-5">
              <label
                htmlFor="nama_rek"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Is Gambar
              </label>
              <select
                name="is_gambar"
                id="is_gambar"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.is_gambar}
                onChange={handleInputChange}
                required
              >
                <option value="" hidden>
                  Pilih Ya / Tidak
                </option>
                <option value="1">Ya</option>
                <option value="0">Tidak</option>
              </select>
            </div>


            <div className="mb-5">
              <label
                htmlFor="no_rek"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Deskripsi
              </label>
              <input
                type="text"
                name="deskripsi"
                id="deskirpsi"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.deskripsi}
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
