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
  const [cartPaketData, setCartPaketData] = useState([]);
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
      console.log("respon setting", response.data.data[0]);
    } catch (error) {
      console.error("Error fetching setting data:", error);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/invoice/${id}`);
      console.log("respon", response.data);
      setInvoiceData(response.data);
      setCustomerData(response.data.pelanggas);
      setCartPaketData(response.data.cartPaket || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setLoading(false);
    }
  };
  

  const angkaTerbilang = (angka) => {
    const bilangan = [
      "",
      "Satu",
      "Dua",
      "Tiga",
      "Empat",
      "Lima",
      "Enam",
      "Tujuh",
      "Delapan",
      "Sembilan",
      "Sepuluh",
      "Sebelas",
    ];

    const konversiBilangan = (n) => {
      if (n < 12) return bilangan[n];
      if (n < 20) return `${bilangan[n - 10]} Belas`;
      if (n < 100)
        return `${bilangan[Math.floor(n / 10)]} Puluh ${
          n % 10 !== 0 ? bilangan[n % 10] : ""
        }`;
      if (n < 200) return `Seratus ${konversiBilangan(n - 100)}`;
      if (n < 1000)
        return `${bilangan[Math.floor(n / 100)]} Ratus ${konversiBilangan(
          n % 100
        )}`;
      if (n < 2000) return `Seribu ${konversiBilangan(n - 1000)}`;
      if (n < 1000000)
        return `${konversiBilangan(
          Math.floor(n / 1000)
        )} Ribu ${konversiBilangan(n % 1000)}`;
      if (n < 1000000000)
        return `${konversiBilangan(
          Math.floor(n / 1000000)
        )} Juta ${konversiBilangan(n % 1000000)}`;
      return `${konversiBilangan(
        Math.floor(n / 1000000000)
      )} Milyar ${konversiBilangan(n % 1000000000)}`;
    };

    const rupiah = Math.floor(angka);
    const sen = Math.round((angka - rupiah) * 100);
    let hasil = konversiBilangan(rupiah);

    if (sen > 0) {
      hasil += ` Koma ${konversiBilangan(sen)}`;
    }

    return `${hasil} Rupiah`;
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

  const getPaketInfo = () => {
    if (cartPaketData && cartPaketData.length > 0) {
      const paket = cartPaketData[0].pakets;
      return {
        kategori:
          paket && paket.kategoriWebsite
            ? paket.kategoriWebsite.nama_kategori
            : "Paket Website",
        nama: paket ? paket.nama_paket : "Tidak tersedia",
      };
    }
    return { kategori: "Paket Website", nama: "Tidak tersedia" };
  };

  const paketInfo = getPaketInfo();

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
            <strong>Terbilang:</strong> {angkaTerbilang(invoiceData.total)}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-lg">
            <strong>Untuk Pembayaran:</strong> {paketInfo.kategori}
          </p>
          <p className="text-lg">
            <strong>Paket:</strong> {paketInfo.nama}
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
