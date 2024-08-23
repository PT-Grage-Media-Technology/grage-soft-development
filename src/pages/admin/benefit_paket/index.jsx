import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { BASE_URL } from '../../../components/layoutsAdmin/apiConfig';

const BenefitPaket = ({ isLoggedIn }) => {
  const router = useRouter();
  const [benefitPaket, setBenefitPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Tambahkan state untuk modal delete

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/benefitpaket?page=${currentPage}`
      );
      console.log("Respon", response.data.data);
      setBenefitPaket(response.data.data);
      // setbenefitPaket(response.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data benefit paket:", error);
      setError(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByKeyword = async (keyword) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/benefitpaket=${keyword}`
      );
      setBenefitPaket(response.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data benefit paket:", error);
      setError(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  // kondisi search
  useEffect(() => {
    if (searchTerm !== "") {
      fetchDataByKeyword(searchTerm);
    } else {
      fetchData();
    }
  }, [currentPage, searchTerm]);

  const handleDelete = async (id) => {
    setIsDeleting(id); // Simpan id yang akan dihapus
    toggleModalDelete(); // Tampilkan modal konfirmasi
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/benefitpaket/${isDeleting}`
      ); // Hapus data
      setBenefitPaket(benefitPaket.filter((item) => item.id !== isDeleting)); // Hapus dari state
      showToastMessage(); // Tampilkan pesan sukses
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Gagal menghapus item!"); // Tampilkan pesan error
    } finally {
      setShowDeleteModal(false); // Tutup modal
      setIsDeleting(false); // Reset state isDeleting
    }
  };

  // Tambahkan fungsi untuk toggle modal delete
  const toggleModalDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const showToastMessage = () => {
    toast.success("Item berhasil dihapus", {
      position: "top-right",
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error.message || "Terjadi kesalahan pada server"}
      </div>
    );
  }

  const firstPage = Math.max(1, currentPage - 4); // Menghitung halaman pertama yang akan ditampilkan

  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      // Cek apakah kode sedang berjalan di sisi klien
      router.push("/auth/login"); // Mengarahkan pengguna kembali ke halaman login
    }
    return <p>Loading...</p>; // or display loading indicator
  }
  return (
    <>
      <Head>
        <title>Data Benefit Paket</title>
      </Head>
      <AdminLayout>
        <ToastContainer />

        <div className="flex items-center justify-between mb-4 lg:-mt-48 md:-mt-48">
          <input
            type="text"
            placeholder="Cari benefit paket..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48 md:w-56 lg:w-72 rounded-xl border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <Link
            href={"/admin/benefit_paket/add"}
            className="flex items-center gap-1 px-4 py-2 text-white rounded-md shadow-sm bg-orange-400 hover:bg-orange-600"
          >
            <i className="fa-solid fa-plus"></i>
            Benefit Paket
          </Link>
        </div>
        <div className="flex flex-col overflow-x-auto lg:overflow-x-hidden bg-white rounded-xl">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-32 py-4">
                        Benefit
                      </th>
                      <th scope="col" className="px-32 py-4">
                        Paket
                      </th>
                      <th scope="col" className="px-14 py-4">
                        Action
                      </th>
                      {/* <th scope="col" className="px-6 py-4">
                        Jumlah Pilihan Desain
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status Website
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Id Kategori Website 
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {benefitPaket.map((item) => (
                      <tr
                        className="border-b dark:border-neutral-500 "
                        key={item.id}
                      >
                        <td className="px-24 py-4 whitespace-nowrap">
                          {item.nama_benefit}
                        </td>
                        <td className="px-24 py-4 whitespace-nowrap">
                          {item.paket.nama_paket}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.jumlah_pilihan_desain}
                        </td>     
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.status_website}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.kategori_Website_Id}
                        </td>
                        <td className="flex items-center gap-1 px-6 py-4 mt-8 whitespace-nowrap">
                          <Link href={"/admin/paket/edit?id=" + item.id}>
                            <div
                              className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 md:mb-0 hover:bg-gray-800"
                              aria-label="edit"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </div>
                          </Link>

                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 md:mb-0 hover:bg-gray-800"
                            aria-label="delete"
                          >
                            {isDeleting ? (
                              "Menghapus..."
                            ) : (
                              <i className="fa-solid fa-trash"></i>
                            )}
                          </button>
                        </td> */}
                        <td className="flex items-center gap-1 px-6 py-4 mt-8 whitespace-nowrap">
                          <Link
                            href={"/admin/benefit_paket/edit?id=" + item.id}
                          >
                            <div
                              className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-orange-400 hover:bg-orange-600"
                              aria-label="edit"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </div>
                          </Link>

                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white rounded-full shadow-sm bg-orange-400 hover:bg-orange-600"
                            aria-label="delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* pagination */}
                <div className="flex justify-center gap-5 my-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
                  >
                    Prev
                  </button>
                  <div className="flex">
                    {Array.from(
                      { length: Math.min(totalPages, 5) },
                      (_, index) => (
                        <button
                          key={index}
                          onClick={
                            () => setCurrentPage(firstPage + index) // Memperbarui halaman berdasarkan indeks dan halaman pertama yang ditampilkan
                          }
                          className={`mx-1 px-3 py-1 rounded-md ${
                            currentPage === firstPage + index
                              ? "bg-gradient-to-r from-indigo-400 to-gray-600 text-white"
                              : "bg-gray-200 hover:bg-gray-400"
                          }`}
                        >
                          {firstPage + index}{" "}
                          {/* Menggunakan halaman pertama yang ditampilkan */}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      {/* Modal konfirmasi delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative w-full max-w-md transition transform bg-white rounded-lg shadow-xl">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Hapus Item
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus item ini?
              </p>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleConfirmDelete} // Panggil fungsi baru untuk konfirmasi penghapusan
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Hapus
              </button>
              <button
                type="button"
                onClick={toggleModalDelete} // Tutup modal
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
// middleware
export async function getServerSideProps(context) {
  // Mendapatkan cookies dari konteks
  const cookies = parseCookies(context);

  // Mengecek apakah token JWT ada di cookies
  const isLoggedIn = !!cookies.token;

  // Mengembalikan props untuk komponen Dashboard
  return {
    props: { isLoggedIn },
  };
}

export default BenefitPaket;
