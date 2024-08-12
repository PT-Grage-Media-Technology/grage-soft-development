import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "../layouts";
import axios from "axios";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize formData state with empty strings for text inputs and null for file input
  // Inisialisasi state formData dengan nilai default jika tidak ada data sebelumnya
  const [formData, setFormData] = useState({
    nama_paket: "",
    harga: "",
    jumlah_pilihan_desain: "",
    status_website: "",
    kategori_website: "",
  });

  const [kategoriWebsite, setKategoriWebsite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/paket/${id}`
        );

        const data = response.data.data;
        console.log("Data:", data);
        // Log the data object
        // Access attributes directly
        const {
          nama_paket,
          harga,
          jumlah_pilihan_desain,
          status_website,
          kategori_website,
        } = data.attributes;
        // Update formData state with data from the API response
        setFormData((prevData) => ({
          ...prevData,
          nama_paket: data.attributes["nama-paket"] || "",
          harga: data.attributes.harga || "",
          jumlah_pilihan_desain: data.attributes["jumlah-pilihan-desain"] || "",
          status_website: data.attributes["status-website"] || "",
          kategori_website: data.attributes["kategori-website-id"] || "",
        }));
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }

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

    if (id) {
      fetchData();
    }
  }, [id]);

  // Handle input change function
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Update formData state based on input name
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gambar" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama_paket", formData.nama_paket);
      formDataToSend.append("harga", formData.harga);
      formDataToSend.append(
        "jumlah_pilihan_desain",
        formData.jumlah_pilihan_desain
      );
      formDataToSend.append("status_website", formData.status_website);
      formDataToSend.append("kategori_website_id", formData.kategori_website);

      // // Jika ada gambar baru, tambahkan ke formDataToSend
      // if (formData.gambar) {
      //   formDataToSend.append("gambar", formData.gambar);
      // }

      const response = await axios.put(
        `http://localhost:5000/api/paket/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        router.push("/admin/paket");
      } else {
        console.error("Gagal mengirim data.", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
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

            <div className="mb-6">
              <label
                htmlFor="status_website"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Status Website
              </label>
              <div className="relative">
                <select
                  name="status_website"
                  id="status_website"
                  className="block w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-2 pr-8 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.status_website}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled hidden>
                    Pilih Status Website
                  </option>
                  <option value="Siap Di Pakai">Siap Di Pakai</option>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Tidak Tersedia">Tidak Tersedia</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="kategori_website_id"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Kategori Website
              </label>
              <div className="relative">
                <select
                  name="kategori_website_id"
                  id="kategori_website_id"
                  className="block w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-2 pr-8 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.kategori_website}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Pilih Kategori Website
                  </option>
                  {kategoriWebsite.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.attributes["nama-kategori"]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
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
