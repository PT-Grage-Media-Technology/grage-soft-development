import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const BackupData = ({ isLoggedIn }) => {
  const router = useRouter();

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
    } catch (error) {
      console.error("Error during backup:", error);
      alert("Backup failed");
    }
  };

  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      // Cek apakah kode sedang berjalan di sisi klien
      router.push("/auth/login"); // Mengarahkan pengguna kembali ke halaman login
    }
    return <p>Loading...</p>; // or display loading indicator
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
              className="bg-blue-500 px-10 py-2 text-white rounded-xl"
              onClick={handleBackup}
            >
              Backup
            </button>
          </div>
        </div>
      </AdminLayout>
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

export default BackupData;
