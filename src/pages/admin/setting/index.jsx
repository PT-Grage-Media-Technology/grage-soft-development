import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

const Setting = () => {
  const [setting, setSetting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/setting?page=${currentPage}&search=${searchTerm}`
      );

      console.log(response.data.data.data);
      setSetting(response.data.data.data);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching data setting:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (!confirmDelete) {
      setIsDeleting(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/setting/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setSetting(setting.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <>
      <Head>
        <title>Data Setting</title>
      </Head>
      <AdminLayout>
        <div className="flex items-center justify-end mb-4 lg:-mt-48 md:-mt-48">
          <Link
            href={"/admin/setting/add"}
            className="z-10 flex items-center gap-1 px-4 py-2 text-white rounded-md shadow-sm bg-gradient-to-r from-indigo-400 to-gray-600 i tems-center text-end hover:bg-green-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500"
          >
            <i className="fa-solid fa-plus"></i>
            Setting
          </Link>
        </div>
        <div className="flex flex-col overflow-x-auto bg-white ">
          <div className=" sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                {/* search */}
                <input
                  type="text"
                  placeholder="Cari setting..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Setting Warna
                      </th>

                      <th scope="col" className="px-6 py-4">
                        WA
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Telepon
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Profil Perusahaan
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Alamat
                      </th>

                      <th scope="col" className="px-6 py-4">
                        Foto
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {setting.map((item) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={item.id}
                      >
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.settingWarna}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.wa}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.telp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.profilPerusahaan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.attributes.alamat}
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <img
                            src={item.attributes.gambarSetting}
                            alt="Foto"
                            className="object-scale-down w-24 h-24 rounded-2xl"
                          />
                        </td>

                        <td className="flex items-center gap-1 px-6 py-4 mt-8 whitespace-nowrap">
                          <Link href={"/admin/setting/edit?id=" + item.id}>
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
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-md ${
                          currentPage === index + 1
                            ? "bg-gray-300"
                            : "bg-gray-200 hover:bg-gray-400"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
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
    </>
  );
};

export default Setting;
