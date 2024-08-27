import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from './layoutsAdmin/apiConfig';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Kontak_Kami() {
    const [wcu, setWcu] = useState([]);
    const [error, setError] = useState(null);
    const [isOpenWcu, setIsOpenWcu] = useState(false);
    const [isOpenProfil, setIsOpenProfil] = useState(false);
    const wcuContentRef = useRef(null);
    const profilContentRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/wcu`);
                setWcu(response.data.data);
            } catch (error) {
                console.error("Error fetching data wcu:", error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div className="text-center text-red-500">Error: {error.message}</div>
        );
    }

    const toggleWcu = () => {
        setIsOpenWcu(!isOpenWcu);
    };

    const toggleProfil = () => {
        setIsOpenProfil(!isOpenProfil);
    };

    const getDropdownStyle = (isOpen, contentRef) => ({
        maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        overflow: "hidden",
        transition: "max-height 0.6s ease-in-out",
    });

    return (
        <div className='grid text-start px-auto mt-12'>
            <div className='grid grid-flow-row px-5 py-4 text-start lg:px-10'>
                <h3 className='text-lg font-semibold flex items-center' onClick={toggleWcu} style={{ justifyContent: 'space-between' }}>
                    MENGAPA KAMI?
                    <span>{isOpenWcu ? <FaChevronUp /> : <FaChevronDown />}</span>
                </h3>
                <div
                    ref={wcuContentRef}
                    style={getDropdownStyle(isOpenWcu, wcuContentRef)}
                >
                    {wcu.map((item, index) => (
                        <p className='pt-4' key={index}>
                            {index + 1}. {item.attributes.isi}
                        </p>
                    ))}
                </div>
            </div>
            <div className='grid px-5 py-8 text-start lg:px-10'>
                <h3 className='text-lg font-semibold flex items-center' onClick={toggleProfil} style={{ justifyContent: 'space-between' }}>
                    PROFIL KAMI
                    <span>{isOpenProfil ? <FaChevronUp /> : <FaChevronDown />}</span>
                </h3>
                <div
                    ref={profilContentRef}
                    style={getDropdownStyle(isOpenProfil, profilContentRef)}
                >
                    <p className='my-6'>Gmt Soft Development merupakan jasa pembuatan website profesional dan berkualitas terbaik Sejak 2008. ...</p>
                    {/* ... isi lainnya ... */}
                </div>
            </div>
        </div>
    );
}

export default Kontak_Kami;
