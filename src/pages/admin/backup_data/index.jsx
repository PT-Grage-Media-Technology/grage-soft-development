import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const BackupData = ({ isLoggedIn }) => {
  const router = useRouter();
  const [backupHistory, setBackupHistory] = useState([]);

  const handleBackup = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/backupdb", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.sql");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Tampilkan notifikasi sukses
      toast.success("Backup berhasil!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Menyimpan tanggal backup ke localStorage
      const backupDate = new Date().toLocaleString();
      const updatedHistory = [...backupHistory, backupDate];
      setBackupHistory(updatedHistory);
      localStorage.setItem("backupHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error during backup:", error);
      toast.error("Backup gagal!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClearHistory = () => {
    setBackupHistory([]);
    localStorage.removeItem("backupHistory");
    toast.info("Semua histori backup telah dihapus.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        router.push("/auth/login");
      }
      return;
    }

    // Memuat sejarah backup dari localStorage saat komponen dimuat
    const savedHistory =
      JSON.parse(localStorage.getItem("backupHistory")) || [];
    setBackupHistory(savedHistory);

    const now = new Date();
    const lastBackupDate =
      savedHistory.length > 0
        ? new Date(savedHistory[savedHistory.length - 1])
        : null;

    // Hanya lakukan backup otomatis jika sudah lewat 30 hari dari backup terakhir
    if (!lastBackupDate || now - lastBackupDate >= 2592000000) {
      handleBackup();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AdminLayout>
        <ToastContainer />
        <div>
          <h3 className="text-center text-xl font-semibold">
            Tekan Untuk Backup Data nya
          </h3>
          <div className="flex justify-center py-8">
            <button
              className="bg-blue-500 px-10 py-2 text-white rounded-xl "
              onClick={handleBackup}
            >
              Backup Manual
            </button>
          </div>
        </div>
        <div className="py-8">
          <h4 className="text-center text-lg font-semibold">Histori Backup</h4>
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Tanggal Backup</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((date, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {backupHistory.length > 0 && (
            <div className="flex justify-center py-4">
              <button
                className="bg-red-500 px-10 py-2 text-white rounded-xl"
                onClick={handleClearHistory}
              >
                Hapus Semua Histori
              </button>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

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

export default BackupData;
