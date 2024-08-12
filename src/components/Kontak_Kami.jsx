import React, { useState, useEffect } from "react";
import axios from "axios"; // Tambahkan impor axios


function Kontak_Kami() {
    const [wcu, setWcu] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/wcu");
          setWcu(response.data.data);
        } catch (error) {
          console.error("Error fetching data wcu:", error);
          setError(error);
        };
      };
  
      fetchData();
    }, []);

    if (error) {
        return (
          <div className="text-center text-red-500">Error: {error.message}</div>
        );
      }
    
  return (
    <div className='grid text-start px-auto py-28'>
        <div className='grid grid-flow-row px-5 py-8 text-start lg:px-10'>
        <h3 className='text-lg font-semibold'>Jasa Pembuatan Website Murah Berkualitas</h3>
            <div>
                <p className='pt-4'>Testing</p>
            </div>
        </div>
        <div className='grid grid-flow-row px-5 py-8 text-start lg:px-10'>
        <h3 className='text-lg font-semibold'>MENGAPA KAMI?</h3>
                  {wcu.map((item, index) => (
                     <p className='pt-4'>
                         {index + 1}. {item.attributes.isi}
                    </p>
                  ))}
        </div>
        <div className='grid px-5 py-8 text-start lg:px-10'>
          <h3 className='text-lg font-semibold'>PROFIL KAMI</h3>
            <div>
                <p className='my-6'>Gmt Soft Development merupakan jasa pembuatan website profesional dan berkualitas terbaik Sejak 2008. Kami melayani jasa pembuatan Toko Online, Web Profile, Web Pulsa Elektrik, Web PPOB, Web Sekolah, Web Instansi, Web Rumah Sakit, Web Jejaring Sosial, Web Iklan baris, dll. Saat ini kami menawarkan pembuatan web toko online dan iklan baris dengan paket harga murah dengan server handal sehingga mendukung toko anda online 24 jam nonstop dan hasil jual beli anda akan semakin ramai. Gmt Soft Development juga membuka lapak di kaskus, silahkan dicari dengan kata kunci Gmt Soft Development. Selain itu kami juga melayani kursus membuat website. Penawaran yang kami berikan sangat menarik karena anda juga akan mendapat bonus website akan masuk google index dalam 6 jam saja. </p>
                <p className='my-6'>Gmt Soft Development merupakan jasa/ perusahaan bisnis yang menawarkan jasa pembuatan web murah di Yogyakarta (Jogja) , Jakarta, Surabaya, Semarang, Bali, Sumatra, Padang, Bandung, Kalimantan Dan seluruh wilayah indonesia tanpa batasan apapun. Sebagai jasa pembuatan website kami berdiri sejak tahun 2008 dan hingga kini telah menangani Lebih dari 2.000 klien aktif. Kualitas layanan pembuatan website adalah hal yang kami utamakan. Walaupun kami menawarkan buat web murah namun dengan harga murah itu kualitas web tetap terajamin. Bisa anda lihat testimoni klien yang sudah beli web di tempat kami. </p>
                <p className='my-6'>Gmt Soft Development memberikan beberapa kelebihan sebagai jasa pembuatan website profesional: kami selalu membackup data web anda mingguan maupun harian sehingga menjamin keamanan data anda dari berbagai kerusakan. Kami memberikan garansi keamanan dari hacker, virus dan malware, setiap saat. Jadi website anda akan terbebas dari serangan hacker/ malware karena kami selalu melindungi website anda setiap saat. Hal ini merupakan bagian dari pelayanan utama kami karena bagi kami, klien adalah aset berharga yang harus diutamakan kepuasannya. Bayangkan saja jika sebuah perusahaan skala besar websitenya terkena hacker maka akan kacau sistem informasinya. Nah maka dari itu ini adalah hal yang patut diutamakan untuk pelayanan klien kami. Karena jasa pembuatan website yang baik selalu mengutamakan kepuasakan konsumen. </p>
                <p className='my-6'>Kami juga memberikan tutorial pengeditan isi website. Perusahaan website yang baik dan profesional akan memberikan tutorial untuk pengelolaan website. Begitu juga Gmt Soft Development selalu memberikan tutorial pengeditan isi website, tidak hanyak untuk paket mahal, namun paket murahpun kami support sama. Sebagai jasa pembuatan website berkualitas maka setelah proses pembuatan selesai dilakukan kami juga memberi layanan gratis konsultasi setiap saat dan panduan edit web secara live via ym, telp, sms, facebook, WA atau BBM. Hanya membaca tutorial mungkin sangat sulit bagi orang awam/ belum pernah mengelola hosting. Maka kami memberikan service ini secara gratis khusus untuk pelanggan jasa pembuatan website di Gmt Soft Development. Kami siap memandu anda dalam pengeditan website setiap saat anda membutuhkan. Rasanya kurang cukup jika jasa pembuatan website seperti kami hanya memberikan service gratis hanya beberapa hari saja. Maka kami memberikan service gratis konsultasi setiap saat selama website anda masih aktif. Kami akan melayani segala pertanyaan anda dan tentunya menyangkut website anda tersebut. </p>
                <p className='my-6'>Teknologi yang kami gunakan untuk pembuatan/ membuat web dan blog adalah CMS terbaru dan terupdate, meliputi: Joomla, WP, Blogspot maupun script buatan sendiri. Dengan CMS maka dimungkinkan web site yang kami bikin dapat anda edit secara dinamis. Kami juga menggunakan teknologi HTML dan CSS terbaru untuk design web sehingga situs yang kami buat akan ringan diakses dan desain yang tetap menarik. Domain yang kami gunakan adalah .com .net .org .ac.id .web.id .or.id , dll. Beli Website? Ya di Gmt Soft Development aja. Pastikan jasa pembuatan website anda adalah Gmt Soft Development. </p>
            </div>
        </div>
    </div>
  )
}

export default Kontak_Kami