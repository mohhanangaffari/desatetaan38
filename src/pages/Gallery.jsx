import { useEffect, useState } from "react"
import { supabase } from "../Supabaseclient";

export default function Gallery(){
    const [fotokol,setFotokol] = useState([]);

    useEffect(()=>{
        fetchFoto();
    })

    const fetchFoto = async () => {
        const {data,error} =await supabase.from('gallery').select("**").order("created_at",{ascending:false});
        if(!error)setFotokol(data);
    }

    return(
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">Gallery Desa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {fotokol.map((foto)=>(
                    <div key={foto.id} className="rounded overflow-hidden shadow-lg bg-brand-maroon">
                        <img src={foto.link_gambar} alt="gallerydesa" className="w-full h-56 object-cover"/>
                        
                        <div className="px-4 py-3">
                            <p className="text-white font-bold text-sm">{foto.deskripsi}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}