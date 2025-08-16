import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function adminpopup(){
const [isOpen,setIsOpen] = useState(false);
const navigate = useNavigate();

const tombols = [
    {label: "ubah gambar background website desa",path:"/admingambardesa"},
    {label: "ubah data penduduk desa",path:"/admindatadesa"},
    {label: "ubah struktur Desa",path:"/adminstruktur"},
    {label: "ubah kegiatan desa",path:"/adminkegiatandesa"},
    {label: "ubah data fasilitas pendidikan dan ibadah",path:"/adminfasilitas"},
    {label: "ubah data peta desa",path:"/adminpetadesa"},
    {label: "ubah data gallery",path:"/admingallery"},        
    {label: "logout dari admin",path:"/adminlogout"}
]

return(
    <div className='fixed bottom-5 right-5 z-50'>
        <button className='bg-brand-maroonSoft font-bold text-white p-3 rounded-full shadow-lg'
        onClick={()=>{setIsOpen(!isOpen)}}
        >AM</button>

        {isOpen&&(
            <div className='mt-2 bg-brand-maroonDark shadow-xl rounded-lg p-4 space-y-2'>
                {tombols.map((btn,id)=>(
                    <button key={id} onClick={() => navigate(btn.path)}
                    className='block w-full text-left px-3 py-2 bg-brand-maroonSoft text-white font-bold rounded'
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        )}
    </div>
);

}