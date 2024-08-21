import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import PelangganLayout from "../layouts";
import { useCookies } from "react-cookie";
import Link from "next/link";

export default function Invoice() {
  const [cookies] = useCookies(["token"]);
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [cartPaketData, setCartPaketData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    if (cookies.token && userData) {
      fetchSettingData();
      fetchCustomerData(userData.id);
    }
  }, [cookies.token]);

  const fetchSettingData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/setting");
      setSettingData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching setting data:", error);
      setError("Failed to fetch setting data.");
    }
  };

  const fetchCustomerData = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        // `http://localhost:5000/api/invoice/user/${userId}`
        `http://localhost:5000/api/invoice/user/1`
      );
        console.log("data", response.data)
        console.log("coba", userId)
        setCustomerData(response.data);
        // setCartPaketData(response.data.cartPaket);

      // if (
      //   response.data &&
      //   response.data.cartPaket &&
      //   response.data.cartPaket.length > 0
      // ) {
      //   console.log("data", response.data)
      //   setCustomerData(response.data);
      //   setCartPaketData(response.data.cartPaket);
      // } else {
      //   setCartPaketData([]);
      //   setError("No invoice data found for this user.");
      // }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError("Failed to fetch invoice data.");
      setCartPaketData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PelangganLayout>
        <div>Loading...</div>
      </PelangganLayout>
    );
  }

  if (error) {
    return (
      <PelangganLayout>
        <div>{error}</div>
      </PelangganLayout>
    );
  }

  return (
    <PelangganLayout>
      <Head>
        <title>Data Invoice</title>
      </Head>
      <div className="flex flex-col bg-white rounded-xl md:-mt-44">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              {cartPaketData && cartPaketData.length > 0 ? (
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
                          <Link href="/pelanggan/detail_invoice">
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
              ) : (
                <div>No invoice data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PelangganLayout>
  );
}
