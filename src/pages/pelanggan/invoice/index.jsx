import { useState, useEffect } from "react";
import axios from "axios";
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

  useEffect(() => {
    setUser(localStorage.getItem("user"));

    if (cookies.token) {
      fetchSettingData();
      fetchCustomerData();
      // fetchCartPaketData();
    }
  }, [cookies.token]);

  const fetchSettingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/setting");
      setSettingData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching setting data:", error);
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
    <PelangganLayout>
      <Head>
        <title>Data Invoice</title>
      </Head>
      <div className="flex flex-col overflow-x-auto bg-white rounded-xl md:-mt-44">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm font-light text-left">
                  <thead className="font-medium border-b dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-12 py-4">
                        Nama Paket
                      </th>
                      <th scope="col" className="px-12 py-4">
                        Nama Kategori
                      </th>
                      <th scope="col" className="px-12 py-4">
                        Harga
                      </th>
                      <th scope="col" className="px-12 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {cartPaketData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-12 py-4 whitespace-nowrap">
                        {item.pakets.nama_paket}
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                        {item.pakets.kategoriWebsite.nama_kategori}
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                        Rp {item.harga},00
                        </td>
                        <td className="flex items-center gap-1 px-12 py-4 mt-8 whitespace-nowrap">
                          <Link
                            href={"/pelanggan/detail_invoice"}
                          >
                            <div
                              className="items-center w-auto px-5 py-2 mb-2 tracking-wider text-white font-semibold rounded-full shadow-sm bg-orange-400 hover:bg-orange-600"
                              aria-label="edit"
                            >
                              Detail
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </PelangganLayout>
  );
}
