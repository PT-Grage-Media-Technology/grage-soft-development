import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import AdminLayout from "../layouts";

export default function Invoice() {
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [paketData, setpaketData] = useState([]);
  const [cartPaketData, setCartPaketData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    refrensi: "",
    tanggal: "",
    refrensi: "",
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
      // Validate cart data
      if (
        cartPaketData.some(
          (item) =>
            !item.id_paket || item.diskon === null || item.harga === null
        )
      ) {
        alert("Semua field paket harus diisi");
        return;
      }

      // Create the invoice first
      const invoiceResponse = await axios.post(
        "http://localhost:5000/api/invoice",
        invoiceData
      );

      // Assuming invoiceResponse contains the new invoice ID
      const invoiceId = invoiceResponse.data.id;

      // Update cartPaketData with the new invoice ID
      const updatedCart = cartPaketData.map((item) => ({
        ...item,
        id_invoice: invoiceId,
        id_paket: item.id_paket,
        diskon: item.diskon || 0, // Use 0 if diskon is null
        harga: item.harga || 0, // Use 0 if harga is null
      }));

      // Send the updated cart data
      await axios.post("http://localhost:5000/api/cartpaket/", updatedCart, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Invoice and cart packages saved:", invoiceResponse.data);

      alert("Invoice berhasil disimpan");
    } catch (error) {
      console.error("Error creating invoice or updating cart:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <Head>
        <title>Create Invoice</title>
      </Head>
      <div className="p-6 bg-white rounded-lg md:-mt-40">
        <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
        {settingData && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {settingData.nama_perusahaan}
            </h2>
            <p>Alamat: {settingData.alamat}</p>
            <p>Telp: {settingData.telp}</p>
            <p>Email: {settingData.email}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Pelanggan</label>
            <select
              name="pelanggan_id"
              value={invoiceData.pelanggan_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Masukan Pelanggan</option>
              {customerData &&
                customerData.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.nama}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Refrensi</label>
            <input
              type="text"
              name="refrensi"
              value={invoiceData.refrensi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Invoice Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={invoiceData.tanggal}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jatuh Tempo</label>
            <input
              type="date"
              name="tgl_jatuh_tempo"
              value={invoiceData.tgl_jatuh_tempo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Info Paket</h3>
            {cartPaketData.map((item, index) => (
              <div key={index} className="flex mb-2">
                <select
                  value={item.id_paket}
                  onChange={(e) =>
                    handlePackageChange(index, "id_paket", e.target.value)
                  }
                  className="w-1/3 p-2 border rounded mr-2"
                >
                  <option value="">Masukan Paket</option>
                  {paketData.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.nama_paket}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  value={item.harga || 0}
                  onChange={(e) =>
                    handlePackageChange(
                      index,
                      "harga",
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  className="w-1/3 p-2 border rounded mr-2"
                />
                <input
                  type="number"
                  placeholder="Discount"
                  value={item.diskon}
                  onChange={(e) =>
                    handlePackageChange(
                      index,
                      "diskon",
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  className="w-1/3 p-2 border rounded mr-2"
                />
                <button
                  type="button"
                  onClick={() => removePackage(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPackage}
              className="bg-blue-500 text-white p-2 rounded mt-2"
            >
              Tambah Paket Invoice
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={calculateTotals}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Hitung Total
            </button>
            <span>Subtotal: {invoiceData.subtotal}</span>
            <span className="ml-4">
              Total Diskon: {invoiceData.total_diskon}
            </span>
            <span className="ml-4">Total: {invoiceData.total}</span>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Simpan Invoice
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Print Invoice
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
