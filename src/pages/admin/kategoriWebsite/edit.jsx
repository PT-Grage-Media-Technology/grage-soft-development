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
    nama_kategori: "", // Set default value to empty string
    deskripsi_kategori: "", // Set default value to empty string
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/kategoriWebsite/${id}`
        );
        // console.log("API response:", response); // Log the entire API response
        if (!response.data.data || !response.data.data.attributes) {
          throw new Error("Data tidak lengkap.");
        }
        const data = response.data.data;

        setFormData((prevData) => ({
          ...prevData,
          nama_kategori: data.attributes['nama-kategori'] || "",
          deskripsi_kategori: data.attributes['deskripsi-kategori'] || "",
        }));

      } catch (error) {
        console.error("Error fetching data kategori website:", error);
        setError(error);
      } finally {
        setLoading(false);
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData;
      formDataToSend.append("nama_kategori", formData.nama_kategori);
      formDataToSend.append("deskripsi_kategori", formData.deskripsi_kategori);

      // Jika ada gambar baru, tambahkan ke formDataToSend
      if (formData.gambar) {
        formDataToSend.append("gambar", formData.gambar);
      }

      const response = await axios.patch(`http://localhost:5000/api/kategoriWebsite/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status == 200) {
        router.push("/admin/kategoriWebsite");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg lg:-mt-48">
          <Link href={"/admin/kategoriWebsite"} className="relative ml-32 lg:ml-60">
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>

          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>

            <div className="mb-5">
              <label
                htmlFor="nama_kategori"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                name="nama_kategori"
                id="nama_kategori"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.nama_kategori}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-5">
              <label
                htmlFor="deskripsi_kategori"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Deskripsi Kategori
              </label>
              <textarea
                name="deskripsi_kategori"
                id="deskripsi_kategori"
                rows="3"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.deskripsi_kategori} // Gunakan nilai awal jika value kosong
                onChange={handleInputChange}
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
