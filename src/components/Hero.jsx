import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative -mt-5 bg-transparent">
      <div className="flex flex-col w-full mx-auto sm:px-10 md:px-12 lg:px-28 lg:flex-row lg:gap-12 bg-blue-500 py-24  lg:py-36 lg:min-h-screen">
        <div className="relative text-white flex flex-col max-w-3xl mx-auto lg:text-left lg:py-12 xl:py-8 lg:items-start lg:max-w-none lg:mx-0 lg:flex-1 lg:w-1/ lg:px-48">
          <h1 className="text-3xl text-center font-bold leading-tight lg:text-5xl">
            Jasa Pembuatan Website Terpercaya Sejak 2008
          </h1>
          <h1 className="flex justify-center  text-center mx-auto lg:px-24 mt-8 mb-4 text-lg leading-tight">
            Gratis pemanduan, Garansi hacker, Dan mempunyai 3.000 klien aktif
            diseluruh dunia. Berdiri sejak 2008
          </h1>
          <div className="px-36 mt-4 lg:px-60">
            <button
              type="button"
              class="flex text-white bg-orange-400 hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              HARGA WEB
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
