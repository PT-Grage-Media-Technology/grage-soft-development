import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import PelangganLayout from "../../layouts";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../../../components/layoutsAdmin/apiConfig";

export default function Invoice() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies] = useCookies(["token"]); // Ambil cookie
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [cartPaketData, setCartPaketData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    refrensi: "",
    tanggal: "",
    tgl_jatuh_tempo: "",
    pelanggan_id: "",
    subtotal: 0,
    total_diskon: 0,
    total: 0,
  });

  const fetchSettingData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/setting/`);
      setSettingData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching setting data:", error);
    }
  };

  const fetchCustomerData = async () => {
    try {
      console.log(id);

      // Ganti endpoint sesuai kebutuhan atau tambahkan ID pelanggan di parameter query
      const response = await axios.get(`${BASE_URL}/api/invoice/${id}`);
      console.log("tes", response.data);
      setInvoiceData(response.data);
      setCustomerData(response.data.pelanggas);
      setCartPaketData(response.data.cartPaket);
      console.log("coba123", response.data.pelanggas);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // Pastikan id sudah tersedia
      fetchSettingData();
      fetchCustomerData();
    }
  }, [id]); // Tambahkan id sebagai dependency

  const handlePrint = () => {
    window.print();
  };

  return (
    <PelangganLayout>
      <Head>
        <title>Invoice</title>
      </Head>
      <style jsx global>{`
        @media print {
          .navbar,
          .sidebar,
          .no-print {
            display: none !important;
          }
          .invoice-container {
            margin: 0;
            padding: 0;
            box-shadow: none;
            width: 100%;
          }
        }
      `}</style>
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
                    <div className="">{invoiceData?.refrensi}</div>
                  </div>
                  <div className="text-gray-600 grid grid-flow-col">
                    <div>Tanggal</div>
                    <div className="">{invoiceData?.tanggal}</div>
                  </div>
                  <div className="text-gray-600 grid grid-flow-col">
                    <div>Tgl. Jatuh Tempo </div>
                    <div className="">{invoiceData?.tgl_jatuh_tempo}</div>
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
                    <div>{customerData?.telp}</div>
                    <div>{customerData?.email}</div>
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
                        Harga
                      </th>
                      <th className="mx-auto py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Diskon
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
                          Rp {parseFloat(item.harga).toLocaleString("id-ID")},00
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          Rp {parseFloat(item.diskon).toLocaleString("id-ID")}
                          ,00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                    <div>Rp {invoiceData.subtotal.toLocaleString()},00</div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>Total Diskon</div>
                    <div>
                      (Rp {invoiceData.total_diskon.toLocaleString()},00)
                    </div>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <div>PPN</div>
                    <div>Rp {invoiceData.total_pajak},00</div>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2 underline">
                    <div>Total</div>
                    <div>Rp {invoiceData.total.toLocaleString()},00</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 no-print">
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
      </div>
    </PelangganLayout>
  );
}
