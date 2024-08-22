import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import PelangganLayout from "../layouts";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { BASE_URL } from '../../../components/layoutsAdmin/apiConfig';

export default function Invoice() {
  const [cookies] = useCookies(["token"]);
  const [settingData, setSettingData] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cookies.token) {
      fetchInvoiceData(), fetchSettingData();
    }
  }, [cookies.token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/authpelanggan/me`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setUser(response.data);
      fetchSettingData();
      fetchInvoiceData(response.data.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

  const fetchSettingData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/setting`);
      setSettingData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching setting data:", error);
      setError("Failed to fetch setting data.");
    }
  };

  const fetchInvoiceData = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/invoice`, {
        params: { userId },
      });
      console.log("invoice", response.data);
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoice data:", error);
      setError("Failed to fetch invoice data.");
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
              {invoices.length > 0 ? (
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
                    {invoices.map((invoice, index) =>
                      invoice.cartPaket?.map((item, subIndex) => (
                        <tr key={`${index}-${subIndex}`}>
                          <td className="px-12 py-4 whitespace-nowrap">
                            {item.paket?.nama_paket ||
                              "Nama paket tidak di temukan"}
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap">
                            {item.paket?.kategoriWebsite?.nama_kategori ||
                              "Nama Kategori tidak di temukan"}
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap">
                            Rp {item.harga.toLocaleString() || "Harga tidak di temukan"},00
                          </td>
                          <td className="flex items-center gap-1 px-12 py-4 mt-8 whitespace-nowrap">
                            <Link
                              href={`/pelanggan/detail_invoice?id=${invoice.id}`}
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
                      ))
                    )}
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
