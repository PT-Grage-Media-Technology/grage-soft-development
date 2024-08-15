import AdminLayout from "../layouts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invoice = () => {
  const [editableField, setEditableField] = useState(null);
  const [newValue, setNewValue] = useState("");

  const handleEdit = (field) => {
    setEditableField(field);
    setNewValue(field.value || ""); // Menangani nilai default
  };

  const handleEditField = (field) => {
    setEditableField(field);
    setNewValue(field.value || ""); // Menangani nilai default
  };

  const handleSave = () => {
    setEditableField(null);
  };

  return (
    <>
      <Head>
        <title>Invoice</title>
      </Head>
      <AdminLayout>
        <div className="flex flex-col overflow-hidden bg-white rounded-xl md:-mt-44">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              {/* Invoice Template */}
              <div className="invoice-container p-6 bg-white rounded-md shadow-md">
                <div className="flex justify-between mb-6">
                  <div>
                    <h1 className="text-xl font-bold mb-2">
                      Nama Perusahaan Anda
                    </h1>
                    <button className="text-gray-700 border text-sm border-gray-700 py-2 px-3 rounded-md mb-2">
                      <i class="fa-solid fa-cloud-arrow-up me-2"></i>
                      Upload Logo
                    </button>
                  </div>
                  <div className="mx-auto">
                    <h1 className="text-xl font-bold pb-2">Invoice</h1>
                    <div className="text-gray-600 grid grid-flow-col">
                      <div>Referensi</div>
                      <div className="">
                        {editableField === "reference" ? (
                          <input
                            type="text"
                            value={newValue}
                            className="border-2 w-2/2 py-1 border-indigo-300 rounded-xl"
                            onChange={(e) => setNewValue(e.target.value)}
                            onBlur={handleSave}
                          />
                        ) : (
                          <>
                            INV/00001
                            <i
                              className="fa-regular fa-pen-to-square mx-1"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("reference")}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-600 grid grid-flow-col">
                      <div>Tanggal</div>
                      <div className="">
                        {editableField === "date" ? (
                          <input
                            type="text"
                            value={newValue}
                            className="border-2 w-2/2 py-1 border-indigo-300 rounded-xl"
                            onChange={(e) => setNewValue(e.target.value)}
                            onBlur={handleSave}
                          />
                        ) : (
                          <>
                            15/08/2024
                            <i
                              className="fa-regular fa-pen-to-square mx-1"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("date")}
                            ></i>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-600 grid grid-flow-col">
                      <div>Tgl. Jatuh Tempo </div>
                      <div className="">
                        {editableField === "dueDate" ? (
                          <input
                            type="text"
                            value={newValue}
                            className="border-2 w-2/2 py-1 border-indigo-300 rounded-xl"
                            onChange={(e) => setNewValue(e.target.value)}
                            onBlur={handleSave}
                          />
                        ) : (
                          <>
                            15/08/2024
                            <i
                              className="fa-regular fa-pen-to-square mx-1"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("dueDate")}
                            ></i>
                          </>
                        )}
                      </div>
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
                          {editableField === "companyName" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Nama Perusahaan Anda"
                          )}
                          <span onClick={() => handleEditField("companyName")}>
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("companyName")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "companyAddress" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Alamat Perusahaan Anda"
                          )}
                          <span
                            onClick={() => handleEditField("companyAddress")}
                          >
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("companyAddress")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "companyPhone" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "No Telp Perusahaan Anda"
                          )}
                          <span onClick={() => handleEditField("companyPhone")}>
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("companyPhone")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "companyEmail" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Email@perusahaan.anda"
                          )}
                          <span onClick={() => handleEditField("companyEmail")}>
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("companyEmail")}
                            ></i>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <h3 className="font-bold">Tagihan Kepada</h3>
                    <hr className="border-black w-3/4 mb-4" />
                    <div className="text-gray-600">
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "customerName" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Nama Pelanggan"
                          )}
                          <span onClick={() => handleEditField("customerName")}>
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("customerName")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "customerAddress" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Alamat Pelanggan"
                          )}
                          <span
                            onClick={() => handleEditField("customerAddress")}
                          >
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("customerAddress")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "customerPhone" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "No Telp Pelanggan"
                          )}
                          <span
                            onClick={() => handleEditField("customerPhone")}
                          >
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("customerPhone")}
                            ></i>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">
                          {editableField === "customerEmail" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-1/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "email@perusahaan.pelanggan"
                          )}
                          <span
                            onClick={() => handleEditField("customerEmail")}
                          >
                            <i
                              className="fa-regular fa-pen-to-square mx-3"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("customerEmail")}
                            ></i>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 mx-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Paket
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Nama Kategori
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Kuantitas
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Harga
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Diskon
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Pajak
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-300 divide-y divide-gray-200">
                      <tr>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "packageName" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Nama Paket"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("packageName")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "categoryName" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "Nama Kategori"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("categoryName")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "quantity" ? (
                            <input
                              type="number"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "1"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("quantity")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "price" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "0,00"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("price")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "discount" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "0%"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("discount")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "tax" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "PPN 10%"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("tax")}
                            ></i>
                          </span>
                        </td>
                        <td className="mx-auto text-sm py-4 text-center">
                          {editableField === "total" ? (
                            <input
                              type="text"
                              value={newValue}
                              className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                              onChange={(e) => setNewValue(e.target.value)}
                              onBlur={handleSave}
                            />
                          ) : (
                            "0,00"
                          )}
                          <span>
                            <i
                              className="fa-regular fa-pen-to-square mx-2"
                              style={{ color: "#FFD43B" }}
                              onClick={() => handleEditField("total")}
                            ></i>
                          </span>
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
                  <div>
                    {editableField === "greeting" ? (
                      <input
                        type="text"
                        value={newValue}
                        className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                        onChange={(e) => setNewValue(e.target.value)}
                        onBlur={handleSave}
                      />
                    ) : (
                      <span className="text-xs">Dengan Hormat,</span>
                    )}
                    <span>
                      <i
                        className="fa-regular fa-pen-to-square mx-2"
                        style={{ color: "#FFD43B" }}
                        onClick={() => handleEditField("greeting")}
                      ></i>
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-16">
                  <button className="border border-gray-700 text-gray-700 py-2 px-4 rounded-md text-sm me-20">
                    <i class="fa-solid fa-cloud-arrow-up me-2"></i>
                    Upload Signature
                  </button>
                </div>

                <div className="flex justify-end mx-14 pt-4">
                  <div>
                    {editableField === "companyName" ? (
                      <input
                        type="text"
                        value={newValue}
                        className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                        onChange={(e) => setNewValue(e.target.value)}
                        onBlur={handleSave}
                      />
                    ) : (
                      <span className="text-sm underline">
                        PT. Kledo Berhati Nyaman
                      </span>
                    )}
                    <i
                      className="fa-regular fa-pen-to-square mx-2"
                      style={{ color: "#FFD43B" }}
                      onClick={() => handleEditField("companyName")}
                    ></i>
                  </div>
                </div>

                <div className="flex justify-end mx-24 pt-4">
                  <div>
                    {editableField === "department" ? (
                      <input
                        type="text"
                        value={newValue}
                        className="w-2/2 px-3 py-2 border-2 border-indigo-300 rounded-xl"
                        onChange={(e) => setNewValue(e.target.value)}
                        onBlur={handleSave}
                      />
                    ) : (
                      <span className="text-xs">Finance Dept</span>
                    )}
                    <i
                      className="fa-regular fa-pen-to-square mx-2"
                      style={{ color: "#FFD43B" }}
                      onClick={() => handleEditField("department")}
                    ></i>
                  </div>
                </div>

                <div className="flex justify-center py-14">
                  <button className="bg-blue-400 w-full py-3 rounded-xl text-white">
                    Buat Invoice
                  </button>
                </div>
              </div>
              {/* End of Invoice Template */}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Invoice;
