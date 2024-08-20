import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import PelangganLayout from "../layouts";
import { useCookies } from "react-cookie";

export default function Invoice() {
  const [cookies] = useCookies(["token"]); // Ambil cookie
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [cartPaketData, setCartPaketData] = useState([]);
  const [user, setUser] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    referensi: "",
    tanggal: "",
    tgl_jatuh_tempo: "",
    pelanggan_id: "",
    subtotal: 0,
    total_diskon: 0,
    total: 0,
  });


  // kondisi search
  useEffect(() => {
    setUser(localStorage.getItem("user"));

    if (cookies.token) {
      fetchSettingData();
      fetchCustomerData();
      // fetchCartPaketData();
    }
  }, [cookies.token]);

  const handleDelete = async () => {
    const id = isDeleting;
    setIsDeleting(true);
    try {
      const response = await axios.get("http://localhost:5000/api/setting");
      setSettingData(response.data.data[0]);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const fetchCustomerData = async () => {
    try {
      // Ganti endpoint sesuai kebutuhan atau tambahkan ID pelanggan di parameter query
      const response = await axios.get(`http://localhost:5000/api/invoice/8`);
      setCustomerData(response.data);
      setCartPaketData(response.data.cartPaket);
      console.log("coba123", response.data.cartPaket);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  // const fetchCartPaketData = async () => {
  //   try {
  //     // Ganti endpoint sesuai kebutuhan atau tambahkan ID pelanggan di parameter query
  //     const response = await axios.get(
  //       `http://localhost:5000/api/cartpaket/${user.id}`
  //     );
  //     setCartPaketData(response.data.data);
  //     console.log('coba aja', response.data);
  //   } catch (error) {
  //     console.error("Error fetching cart paket data:", error);
  //   }
  // };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Head>
        <title>Data Invoice</title>
      </Head>
      <div className="flex flex-col overflow-hidden bg-white rounded-xl md:-mt-44">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="invoice-container p-6 bg-white rounded-md shadow-md">
              {/* Konten invoice */}
              <div className="flex justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold mb-2">
                    {settingData?.profil_perusahaan}
                  </h1>
                  <img
                    className="w-20 h-20 mx-16 mt-4"
                    src={settingData?.gambar_setting}
                    alt=""
                  />
                </div>
                <div className="mx-auto">
                  <h1 className="text-xl font-bold pb-2">Invoice</h1>
                  <div className="text-gray-600 grid grid-flow-col">
                    <div>Referensi</div>
                    <div className="">INV/00001</div>
                  </div>
                  <div className="text-gray-600 grid grid-flow-col">
                    <div>Tanggal</div>
                    <div className="">15/08/2024</div>
                  </div>
                  <div className="text-gray-600 grid grid-flow-col">
                    <div>Tgl. Jatuh Tempo </div>
                    <div className="">15/08/2024</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 pt-6 pb-12">
                <div className="">
                  <h3 className="font-bold">Informasi Perusahaan</h3>
                  <hr className="border-black w-3/4 mb-4" />
                  <div className="text-gray-600">
                    <div>
                      Nama Perusahaan : {settingData?.profil_perusahaan}
                    </div>
                    <div>Alamat Perusahaan: {settingData?.alamat}</div>
                    <div>Telefon Perusahaan : {settingData?.telp}</div>
                    <div>Email: Perusahaan : {settingData?.email}</div>
                  </div>
                </div>

                <div className="">
                  <h3 className="font-bold">Tagihan Kepada</h3>
                  <hr className="border-black w-3/4 mb-4" />
                  <div className="text-gray-600">
                    <div>{customerData?.nama}</div>
                    <div>{customerData?.alamat}</div>
                    <div>{customerData?.no_telp}</div>
                    <div>{customerData?.email}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6 mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th scope="col" className="px-12 py-4">
                        Nama Paket
                      </th>
                      <th scope="col" className="px-12 py-4">
                        Nama Kategori
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Harga
                      </th>
                      <th scope="col" className="px-12 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-300 divide-y divide-gray-200">
                    {cartPaketData.map((item, index) => (
                      <tr key={index}>
                        <td className="mx-auto text-sm py-4 text-center">
                          {item.pakets.nama_paket}
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {item.pakets.kategoriWebsite.nama_kategori}
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          Rp {item.harga},00
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          Rp {item.diskon},00
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          Rp {item.pajak},00
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          Rp {item.total},00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              <div className="grid grid-flow-col">
                <div className="mt-6">
                  <h3 className="font-bold">Pesan</h3>
                  <hr className="border-black w-3/4 py-2" />
                  <textarea
                    className="w-3/4 border rounded-md p-2"
                    rows="4"
                    placeholder="Tulis pesan di sini..."
                  ></textarea>
                </div>

                <div className="grid grid-flow-row mt-4">
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>Subtotal</div>
                    <div>Rp {invoiceData.subtotal},00</div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>Total Diskon</div>
                    <div>(Rp {invoiceData.total_diskon},00)</div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>PPN</div>
                    <div>Rp {invoiceData.total_pajak},00</div>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2 underline">
                    <div>Total</div>
                    <div>Rp {invoiceData.total},00</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Cetak Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative w-full max-w-md transition transform bg-white rounded-lg shadow-xl">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Hapus Kategori Klien
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus kategori ini?
              </p>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Hapus
              </button>
              <button
                type="button"
                onClick={toggleModalDelete}
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

export default KategoriKlien;
