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
    link_contoh_desain: "",
    is_gambar: null,
    deskripsi: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/contohdesain/${id}`
        );
       // console.log("API response:", response.data); // Log the entire API response
        const data = response.data;
      //  console.log("Data:", data);
        // Log the data object
        // Access attributes directly
        const { link_contoh_desain, is_gambar, deskripsi} = data;
        // Update formData state with data from the API response
        setFormData((prevData) => ({
          ...prevData,
          link_contoh_desain: link_contoh_desain || "",
          is_gambar: is_gambar || "",
          deskripsi: deskripsi || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error); // Perbaiki pesan error
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
      [name]: name === "image_bank" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("link_contoh_desain", formData.link_contoh_desain);
      formDataToSend.append("is_gambar", formData.is_gambar);
      formDataToSend.append(
        "deskripsi",
        formData.deskripsi
      );

      console.log("link", formData.link_contoh_desain);
      console.log("isgambar", formData.is_gambar);
      console.log("deskripsi", formData.deskripsi);

      const response = await axios.put(
        `http://localhost:5000/api/contohdesain/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        router.push("/admin/contoh_desain");
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
              <input
                type="text"
                name="link_contoh_desain"
                id="link_contoh_desain"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.link_contoh_desain}
                onChange={handleInputChange}
                required
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.is_gambar}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" hidden>
                    Pilih True / False
                  </option>
                  <option value="1">True</option>
                  <option value="0">False</option>
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
