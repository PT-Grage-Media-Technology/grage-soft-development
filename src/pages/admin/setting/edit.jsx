import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminLayout from "../layouts";
import axios from "axios";
import Head from "next/head";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize formData state with empty strings for text inputs and null for file input
  // Inisialisasi state formData dengan nilai default jika tidak ada data sebelumnya
  const [formData, setFormData] = useState({
    setting_warna: "",
    wa: "",
    telp: null, // Set default value to null
    email: "",
    profil_perusahaan: "",
    alamat: "",
    urlGambar: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/setting/${id}`
        );

        const data = response.data.data;
        console.log("Data:", data);
        // Log the data object
        // Access attributes directly
        const { settingWarna, wa, telp, email, profilPerusahaan, alamat } = data.attributes;
        // Update formData state with data from the API response
        setFormData((prevData) => ({
          ...prevData,
          setting_warna: settingWarna || "",
          wa: wa || "",
          telp: telp || "",
          email: email || "",
          profil_perusahaan: profilPerusahaan || "",
          alamat: alamat || "",
        }));

      } catch (error) {
        console.error("Error fetching data setting:", error);
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
      [name]: name === "gambar" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("setting_warna", formData.setting_warna);
      formDataToSend.append("wa", formData.wa);
      formDataToSend.append("telp", formData.telp);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profil_perusahaan", formData.profil_perusahaan);
      formDataToSend.append("alamat", formData.alamat);

      // Jika ada gambar baru, tambahkan ke formDataToSend
      if (formData.gambar) {
        formDataToSend.append("foto", formData.gambar);
      }

      const response = await axios.patch(`http://localhost:5000/api/setting/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status == 200) {
        router.push("/admin/setting");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Edit Setting</title>
      </Head>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[700px] bg-white rounded-lg lg:-mt-40">
          <div className="relative py-3">
          <Link href={"/admin/setting"} className="absolute right-4 top-10">
            <div className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer text-end bg-orange-400">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>
          </div>

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