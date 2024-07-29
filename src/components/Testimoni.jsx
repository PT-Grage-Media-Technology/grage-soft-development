import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const Testimoni = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const testimonialData = [
    {
      id: 1,
      image: "/images/example.jpg",
      quote:
        "Et, dignissimos obcaecati. Recusandae praesentium doloribus vitae? Rem unde atque mollitia!",
      author: "Leroy Jenkins",
      position: "CEO of Company Co.",
    },
    {
      id: 2,
      image: "/images/example.jpg",
      quote:
        "Et, dignissimos obcaecati. Recusandae praesentium doloribus vitae? Rem unde atque mollitia!",
      author: "Leroy Jenkins",
      position: "CEO of Company Co.",
    },
  ];

  const [testimoniData, setTestimoniData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.ngurusizin.online/api/testimoni"
        );
        if (response.data && response.data.data.data) {
          setTestimoniData(response.data.data.data);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Error fetching data testimoni:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("testimoni", testimoniData);
  console.log("testimoni coba", testimonialData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="py-10">
      <h1 className="font-semibold text-3xl lg:text-3xl text-center text-transparent bg-clip-text bg-gray-900">
        Testimoni
      </h1>
      <div class="grid grid-cols-2 justify-items-center gap-5 mt-5 lg:flex-row py-6">
        {testimoniData.map((item, index) => (
          <div class="max-w-lg p-6 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.attributes.testimoni}
            </p>
            <div className="flex">
              <img
                src={item.attributes.urlGambar}
                alt=""
                className="rounded-full w-16 h-16"
              />
              <div className="grid grid-rows-2 justify-start">
                <p className="font-semibold ms-4">{item.attributes.nama}</p>
                <div className="flex px-2">
                  <FaStar className="text-yellow-500 ml-1" />
                  <FaStar className="text-yellow-500 ml-1" />
                  <FaStar className="text-yellow-500 ml-1" />
                  <FaStar className="text-yellow-500 ml-1" />
                  <FaStar className="text-yellow-500 ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <Slider {...settings}>
        {testimoniData.map((item, index) => (
          <div key={index}>
            <section className="p-6">
              <div className="container max-w-xl mx-auto">
                <div className="flex flex-col items-center w-full p-6 space-y-8 text-gray-900 bg-white rounded-md lg:h-full lg:p-8">
                  <img
                    src={item.attributes.urlGambar}
                    alt="gambar"
                    className="w-20 h-20 bg-gray-500 rounded-full"
                    width={100}
                    height={100}
                  />
                  <blockquote className="max-w-lg text-lg italic font-medium text-center">
                    {item.attributes.testimoni}
                  </blockquote>
                  <div className="text-center text-gray-900">
                    <p>{item.attributes.nama}</p>
                    <p>{item.attributes.jabatan}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </Slider> */}
      </div>
      <div className="flex justify-center">
      <Link
          href={"/layanan"}
          type="submit"
          className="block px-4 py-3 mt-6 font-semibold text-center text-white rounded-full w-52 bg-blue-400 hover:bg-blue-900"
        >
          Lihat Semua Testimoni
        </Link>
        </div>
    </div>
  );
};

export default Testimoni;
