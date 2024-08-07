import AdminLayout from "../layouts";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import KategoriKlien from "../kategoriKlien";

export default function Add() {
  const router = useRouter();

  const [kategoriKlien, setKategoriKlien] = useState([]);
  const [paket, setPaket] = useState([]);

  const [formData, setFormData] = useState({
    id_kategori_klien: "",
    id_paket: "",
    url_klien: "",
    logo_klien: null,
    is_headline: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/kategoriKlien`
      );
      setKategoriKlien(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data kategori klien:", error);
    }
  };

  const fetchDataPaket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/paket`
      );
      console.log('rendi ganteng',response.data.data);
      setPaket(response.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data kategori klien:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataPaket();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData; 
      formDataToSend.append("kategori_klien_Id", formData.id_kategori_klien);
      formDataToSend.append("paket_Id", formData.id_paket);
      formDataToSend.append("url_klien", formData.url_klien);
      formDataToSend.append("is_headline", formData.is_headline);
      formDataToSend.append("logo_klien", formData.logo_klien);
   
      const response = await axios.post("http://localhost:5000/api/klien/", formDataToSend, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
      });

      if (response.status == 201) {
        // console.log("Data berhasil di tambahkan!");
        // tambahkan logika lainnya sesuai kebutuhan, seperti mereset form atau menampilkan pesan sukses
        router.push("/admin/klien");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Update formData state based on input name
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "logo_klien" ? files[0] : value,
    }));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12 ">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg  lg:-mt-48">
          <Link href={"/admin/kategoriKlien"} className="relative ml-32 lg:ml-60 ">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer m text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>

            <div className="mt-4 mb-5">
              <label
                htmlFor="id_paket"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Paket
              </label>
              <select
                name="id_paket"
                id="id_paket"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.id_paket}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Paket</option>
                {paket.map((item) => (
                  <option value={item.id}>{item.nama_paket}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 mb-5">
              <label
                htmlFor="id_kategori_klien"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Kategori Klien
              </label>
              <select
                name="id_kategori_klien"
                id="id_kategori_klien"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.id_kategori_klien}
                onChange={handleInputChange}
                required
              >
                <option value="">Pilih Kategori Klien</option>
                {kategoriKlien.map((item) => (
                  <option value={item.id}>{item.attributes['nama-kategori-klien']}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 mb-5">
              <label

                htmlFor="url_klien"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                URL Klien
              </label>
              <input
                type="text"
                name="url_klien"
                id="url_klien"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.url_klien}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6 ">
              <label className="mb-5 block text-base font-semibold text-[#07074D]">
                Logo Klien
              </label>
              <div className="mb-8">
                <input
                  type="file"
                  name="logo_klien"
                  id="logo_klien"
                  htmlFor="logo_klien"
                  className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 mb-5">
              <label
                htmlFor="nama_kategori_klien"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Headline
              </label>
              <select
                name="is_headline"
                id="is_headline"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.is_headline}
                onChange={handleInputChange}
                required
              >
                <option value="">Masukkan headline?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
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
