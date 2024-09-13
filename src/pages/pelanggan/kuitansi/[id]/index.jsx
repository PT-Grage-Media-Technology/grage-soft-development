import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import PelangganLayout from "../../layouts";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../../../components/layoutsAdmin/apiConfig";

export default function Kuitansi() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies] = useCookies(["token"]);
  const [settingData, setSettingData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      const response = await axios.get(`${BASE_URL}/api/invoice/${id}`);
      setInvoiceData(response.data);
      setCustomerData(response.data.pelanggas);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSettingData();
      fetchCustomerData();
    }
  }, [id]);

  useEffect(() => {
    const handlePrint = () => {
      if (!loading && invoiceData && print === "true") {
        window.print();
      }
    };

    if (window.opener && !window.opener.closed) {
      if (!loading && invoiceData) {
        setTimeout(handlePrint, 1000);
      }
    }
  }, [loading, invoiceData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PelangganLayout>
      <Head>
        <title>Kuitansi</title>
        <style type="text/css" media="print">{`
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        `}</style>
      </Head>
      <div className="max-w-2xl mx-auto my-10 p-6 border border-gray-300 shadow-lg rounded-lg bg-white">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-500">
          KUITANSI
        </h1>
        <div className="mb-6">
          <p className="text-lg">
            <strong>No. Kuitansi:</strong> {invoiceData.refrensi}
          </p>
          <p className="text-lg">
            <strong>Tanggal:</strong> {invoiceData.tanggal}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-lg">
            <strong>Telah diterima dari:</strong> {customerData?.nama}
          </p>
          <p className="text-lg">
            <strong>Uang Sejumlah:</strong> {formatCurrency(invoiceData.total)}
          </p>
          <p className="mt-2 text-lg">
            <strong>Terbilang:</strong>{" "}
            {/* You may want to add a function to convert number to words */}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-lg">
            <strong>Untuk Pembayaran:</strong> Pembelian Paket Website
          </p>
        </div>
        <div className="mt-10 text-center">
          <p className="text-lg">
            <strong>{settingData?.profil_perusahaan}</strong>
          </p>
          <div className="mt-16">
            <img
              src={settingData?.url_foto_ttd}
              alt="Tanda Tangan"
              className="mx-auto h-24"
            />
            <p className="text-lg">Penerima</p>
          </div>
        </div>
      </div>
    </PelangganLayout>
  );
}
