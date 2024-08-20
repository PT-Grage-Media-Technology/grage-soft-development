import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import PelangganLayout from "../layouts";

export default function Invoice() {
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [paketData, setpaketData] = useState([]);
  const [cartPaketData, setCartPaketData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    referensi: "",
    tanggal: "",
    tgl_jatuh_tempo: "",
    pelanggan_id: "",
    subtotal: 0,
    total_diskon: 0,
    total: 0,
  });

  useEffect(() => {
    fetchSettingData();
    fetchCustomerData();
    fetchpaketData();
  }, []);

  const fetchSettingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/setting");
      setSettingData(response.data.data[0]);
      console.log("setting", response.data.data);
    } catch (error) {
      console.error("Error fetching setting data:", error);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pelanggan");
      console.log("Pelanggan", response.data);
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const fetchpaketData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/paket");
      setpaketData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching available packages:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updatedCart = [...cartPaketData];
    updatedCart[index] = { ...updatedCart[index], [field]: value };
    setCartPaketData(updatedCart);
  };

  const addPackage = () => {
    setCartPaketData((prevData) => [
      ...prevData,
      { id_paket: "", diskon: 0, harga: 0 },
    ]);
  };

  const removePackage = (index) => {
    const updatedCart = cartPaketData.filter((_, i) => i !== index);
    setCartPaketData(updatedCart);
  };

  const calculateTotals = () => {
    const subtotal = cartPaketData.reduce((sum, item) => sum + item.harga, 0);
    const totalDiskon = cartPaketData.reduce(
      (sum, item) => sum + item.diskon,
      0
    );
    const total = subtotal - totalDiskon;

    setInvoiceData((prevData) => ({
      ...prevData,
      subtotal,
      total_diskon: totalDiskon,
      total,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the invoice first
      const invoiceResponse = await axios.post(
        "http://localhost:5000/api/invoices",
        invoiceData
      );

      // Assuming invoiceResponse contains the new invoice ID
      const invoiceId = invoiceResponse.data.id;

      // Update cartPaketData with the new invoice ID
      const updatedCart = cartPaketData.map((item) => ({
        ...item,
        id_invoice: invoiceId,
      }));

      // Send the updated cart data
      await axios.post(
        "http://localhost:5000/api/cartpaket/update",
        updatedCart
      );

      console.log("Invoice and cart packages saved:", invoiceResponse.data);
    } catch (error) {
      console.error("Error creating invoice or updating cart:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PelangganLayout>
      <Head>
        <title>Invoice</title>
      </Head>
      <div className="flex flex-col overflow-hidden bg-white rounded-xl md:-mt-44">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            {/* Invoice Template */}
            <div className="invoice-container p-6 bg-white rounded-md shadow-md">
              <div className="flex justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold mb-2">
                    GMT SOFT DEVELOPMENT
                  </h1>
                  <img
                    className="w-20 h-20 mx-16 mt-4"
                    src="/images/GMT.png"
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
                      <span className="font-semibold text-sm">
                        GMT SOFT DEVELOPMENT
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">
                        ALAMAT GMT NYA COY
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">No Telp GMT</span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Email GMT</span>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h3 className="font-bold">Tagihan Kepada</h3>
                  <hr className="border-black w-3/4 mb-4" />
                  <div className="text-gray-600">
                    <div>
                      <span className="font-semibold text-sm">
                        Nama Pelanggan
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">
                        Alamat Pelanggan
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">
                        No Telp Pelanggan
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">
                        Email Pelanggan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Paket
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Nama Kategori
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Kuantitas
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Harga
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Diskon
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Pajak
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-300 divide-y divide-gray-200">
                    <tr>
                      <td className="mx-auto text-sm py-4 text-center">
                        Paket
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Nama Kategori
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Kuantitas
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Harga
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Diskon
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Pajak
                      </td>
                      <td className="mx-auto text-sm py-4 text-center">
                        Jumlah
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-flow-col">
                {/* Tambahkan bagian untuk Pesan dan Total */}
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
                    <div>Rp 0,00</div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>Total Diskon</div>
                    <div>(Rp 0,00)</div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>PPN</div>
                    <div>Rp 0,00</div>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2 underline">
                    <div>Total</div>
                    <div>Rp 0,00</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-8 mx-24">
                <span className="text-xs mx-4">
                 Dengan Hormat,
                </span>
              </div>

              {/* Foto Tanda Tangan */}
              <div className="flex justify-end pt-16">
                <img src="" alt="" />
              </div>

              {/* Foto Cap */}
              <div className="flex justify-end pt-16">
                <img src="" alt="" />
              </div>

              <div className="flex justify-end mx-16 pt-4">
                <div>
                  <span className="text-sm underline">
                    PT. Kledo Berhati Nyaman
                  </span>
                </div>
              </div>

              <div className="flex justify-end mx-28 pt-4">
                <div>
                  <span className="text-xs">Finance Dept</span>
                </div>
              </div>
            </div>
            {/* End of Invoice Template */}
          </div>
        </div>
      </div>
    </PelangganLayout>
  );
}
