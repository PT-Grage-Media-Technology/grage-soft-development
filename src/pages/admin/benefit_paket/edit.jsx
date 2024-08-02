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

  const [formData, setFormData] = useState({
    nama_benefit: "",
    paket_id: "",
  });

  const [paket, setPaket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/benefitpaket/${id}`
        );
        if (!response.data.data || !response.data.data.attributes) {
          throw new Error("Data tidak lengkap.");
        }
        const data = response.data.data.attributes;
        setFormData({
          nama_benefit: data.nama_benefit || "",
          paket_id: data.paket_id || "",
        });
      } catch (error) {
        console.error("Error fetching data layanan:", error);
        setError(error);
      } finally {
        setLoading(false);
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/paket`
        );
        setPaket(response.data.data);
      } catch (error) {
        console.error("Error fetching data benefit paket:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "gambar" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nama_benefit", formData.nama_benefit);
      formDataToSend.append("paket_id", formData.paket_id);

      const response = await axios.put(
        `http://localhost:5000/api/benefitpaket/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        router.push("/admin/benefit_paket");
      } else {
        console.error("Gagal mengirim data.", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-lg lg:-mt-48">
          <Link
            href={"/admin/benefit_paket"}
            className="relative ml-32 lg:ml-60"
          >
            <div className="absolute flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer text-end bg-gradient-to-r from-indigo-400 to-gray-600 lg:left-24 left-4 top-10 text-md">
              <i className="fas fa-arrow-left"></i>
              <span>Kembali</span>
            </div>
          </Link>

          <form className="py-6 bg-white px-9" onSubmit={handleSubmit}>
            <div className="mt-4 mb-5">
              <label
                htmlFor="nama"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Benefit
              </label>
              <input
                type="text"
                name="nama_benefit"
                id="nama_benefit"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={formData.nama_benefit}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5">
              <select
                name="paket_id"
                id="paket_id"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                value={formData.paket_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  Pilih Paket
                </option>
                {paket.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item["nama_paket"]}
                  </option>
                ))}
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