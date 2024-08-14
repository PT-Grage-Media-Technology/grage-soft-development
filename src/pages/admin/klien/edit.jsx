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
  const [kategoriKlien, setKategoriKlien] = useState([]);
  const [paket, setPaket] = useState([]);

  const [formData, setFormData] = useState({
    id_kategori_klien: "",
    id_paket: "",
    url_klien: "",
    logo_klien: null,
    is_headline: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/klien/${id}`
        );

        const data = response.data.data.data;

        setFormData((prevData) => ({
          ...prevData,
          id_kategori_klien: data.attributes["kategori-klien-id"] || "",
          id_paket: data.attributes["paket-id"] || "",
          url_klien: data.attributes["url-klien"] || "",
          logo_klien: data.attributes["logo-klien"] || null,
          is_headline: data.attributes["is-headline"] ? "true" : "false" || "",
        }));
      } catch (error) {
        console.error("Error fetching data kategori klien:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchDataKategori = async () => {
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
      setPaket(response.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data kategori klien:", error);
    }
  };

  useEffect(() => {
    fetchDataKategori();
    fetchDataPaket();
  }, []);

  // Handle input change function
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Update formData state based on input name
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "logo_klien" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("kategoriId", formData.id_kategori_klien);
      formDataToSend.append("paketId", formData.id_paket);
      formDataToSend.append("url_klien", formData.url_klien);
      formDataToSend.append("is_headline", formData.is_headline);

      if (formData.logo_klien) {
        formDataToSend.append("logo_klien", formData.logo_klien);
    }

      const response = await axios.put(
        `http://localhost:5000/api/klien/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        router.push("/admin/klien");
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
        <title>Edit Klien</title>
      </Head>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[700px] bg-white rounded-lg lg:-mt-40">
          <div className="flex justify-end pt-4 px-4">
            <Link
              href={"/admin/klien"}
              className="relative"
            >
              <div className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-lg cursor-pointer text-end bg-orange-400">
                <i className="fas fa-arrow-left"></i>
                <span>Kembali</span>
              </div>
            </Link>
          </div>
          <form className="bg-white px-9" onSubmit={handleSubmit}>
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
                  className="w-full rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                  className="w-full rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={formData.id_kategori_klien}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih Kategori Klien</option>
                  {kategoriKlien.map((item) => (
                    <option value={item.id} >{item.attributes['nama-kategori-klien']}</option>
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
                  className="w-full rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                    className="w-full  rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    onChange={handleInputChange}
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
                  className="w-full rounded-md border-2 border-indigo-300 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={formData.is_headline == 'true' ? "true" : "false"}
                  onChange={handleInputChange}
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
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
