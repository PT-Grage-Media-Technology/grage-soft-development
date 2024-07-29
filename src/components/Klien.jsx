import React from "react";

export default function Rating() {
  return (
    <section className="py-5  bg-white rounded lg:px-28">
      <div className="flex flex-col items-center gap-5 mt-5 lg:flex-row">
          <h3 className="text-start text-gray-800 text-xl font-bold">Klien Kami</h3>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <img src="/images/example.jpg" alt="" className="w-36 h-36 rounded-full"/>
            </div>
            <span className="font-semibold">Nama Klien</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <img src="/images/example.jpg" alt="" className="w-36 h-36 rounded-full"/>
            </div>
            <span className="font-semibold">Nama Klien</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <img src="/images/example.jpg" alt="" className="w-36 h-36 rounded-full"/>
            </div>
            <span className="font-semibold">Nama Klien</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <img src="/images/example.jpg" alt="" className="w-36 h-36 rounded-full"/>
            </div>
            <span className="font-semibold">Nama Klien</span>
          </div>
          <button className="flex py-12 bg-blue-400 hover:bg-blue-900 text-white rounded-full px-4"><p className="text-center">Lihat Semua Klien Kami</p></button>
      </div>
    </section>
  );
}
