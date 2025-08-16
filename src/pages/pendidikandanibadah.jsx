import React,{useEffect,useState} from "react";
import { supabase } from "../Supabaseclient";
import { useNavigate } from "react-router-dom";



export default function pendidikandanibadah(){
    const [pendidikan,setPendidikan] = useState([]);
    const [ibadah,setIbadah] = useState([]);
    const navigate = useNavigate();
    const base = "px-4 py-2 rounded-xl2 font-medium transition focus-ring";
    const variants = {
    primary: "bg-brand-maroon text-white hover:bg-brand-maroonDark",
    ghost: "border border-brand-maroon text-brand-maroon hover:bg-brand-maroon/10",
    white: "bg-white text-brand-maroon border border-brand-maroon hover:bg-brand-maroon/10",}
    

    useEffect(() => {
        fetchdata();
    },[]);

    async function fetchdata(params) {
        const {data:pendidikanData,error:pendidikanError} = await supabase
        .from("fasilitaspendidikan")
        .select("*");

        const {data:ibadahData,error:ibadahError} = await supabase
        .from("fasilitasibadah")
        .select("*");

        if(pendidikanError) console.error("pendidikan error",pendidikanError);
        else setPendidikan(pendidikanData);
        if(ibadahError) console.error("ibadah error",ibadahError);
        else setIbadah(ibadahData);
    }

    function handleceklokasi(id_marker){
        navigate(`/petadesa?marker=${id_marker}`);
    }

    return(
        <div className="p-4 grid md:grid-cols-2 gap-4">
            <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-4">Fasilitas Pendidikan</h2>
            <div className="grid grid-cols-1 gap-4 place-items-center bg-brand-maroonSoft 
            w-full p-2 rounded-lg shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                {pendidikan.map((item)=>(
                    <div key={item.id} className="bg-brand-maroon p-3 shadow-lg rounded-lg w-full ">
                        <img src={item.gambar_url}
                        alt={item.nama}
                        className="w-full h-72 object-cover"
                        />

                        <h3 className="text-white font-bold mt-2">{item.nama}</h3>
                        <p className="text-white">{item.alamat}</p>
                        <button onClick={()=>handleceklokasi(item.marker_id)}
                        // className="mt-2 bg-blue-100 text-white px-3 py-1 rounded"
                        className="bg-[#7d2122] text-white px-6 py-2 rounded-lg shadow-md hover:bg-brand-maroonSoft transition-colors duration-300"
                        >
                            Lihat Lokasi
                        </button>                
                    </div>
                ))}
            </div>
            </div>
            <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-4">Fasilitas Ibadah</h2>
            <div className="grid grid-cols-1 gap-4 place-items-center bg-brand-maroonSoft p-2 rounded-lg shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                {ibadah.map((item)=>(
                    <div key={item.id} className="bg-brand-maroon p-3 shadow-lg rounded-lg w-full ">
                        <img src={item.gambar_url}
                        alt={item.nama}
                        className="w-full h-72 object-cover"
                        />

                        <h3 className="text-white font-bold mt-2">{item.nama}</h3>
                        <p className="text-white">{item.alamat}</p>
                        <button onClick={()=>handleceklokasi(item.marker_id)}
                        // className="mt-2 bg-blue-100 text-white px-3 py-1 rounded"
                        // className={`${base} ${variants.primary}`}
                        className="bg-[#7d2122] text-white px-6 py-2 rounded-lg shadow-md hover:bg-brand-maroonSoft transition-colors duration-300"
                        >
                            Lihat Lokasi
                        </button>                
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}