import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import { supabase } from '../Supabaseclient';
import { data } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../UI/Header';
import Header2 from '../UI/Header2';

export default function Home(){
  const [kegiatanDesa,setkegiatanDesa] = useState([]);  
  const [Imgbg,setImgbg] = useState(null);
  const [dataDesa,setDatadesa] = useState([]);
  const [strukturdesa,setStrukturdesa] = useState([]);
  const navigate = useNavigate();
  const base = "px-4 py-2 rounded-xl2 font-medium transition focus-ring";
  const variants = {
    primary: "bg-brand-maroon text-white hover:bg-brand-maroonDark",
    ghost: "border border-brand-maroon text-brand-maroon hover:bg-brand-maroon/10",
    white: "bg-white text-brand-maroon border border-brand-maroon hover:bg-brand-maroon/10",}

  const fetchImgBg = async () => {
    const {data:data1,error} = await supabase.storage.from("gambardesa").list();
        if(!error){            
            const {data:data2,error:error2} =  supabase.storage.from("gambardesa").getPublicUrl(data1[0].name);            
            if(!error2){                              
                setImgbg(data2.publicUrl);
                
            }
            
        }
  }  

  const fetchstrukturdesa = async() => {
    const {data,error} = await supabase.from("datastruktur").select("*");
    if(!error){
      const kadesi = data.find(item => item.id === 1);
      const sekdesi = data.find(item => item.id === 2);
      const bpdi = data.find(item => item.id === 3);
      const datareordered = [bpdi,kadesi,sekdesi];
      setStrukturdesa(datareordered);
      console.error(data);
    }else{
      console.error(error);
    }
  }

  const fetchdatadesa = async() => {
    const {data,error} = await supabase.from("datadesa").select("*").eq("id","1");
    if(!error){
      setDatadesa(data);
      console.log(data);
    }else{
      console.error(error);
    }
    
  }

  const fetchkegiatan = async () => {
    const {data} = await supabase.from("kegiatandesa").select("*");
    setkegiatanDesa(data);
  }

  useEffect(()=>{
    fetchkegiatan();
    fetchstrukturdesa();
    fetchdatadesa();
    fetchImgBg();
    console.log(dataDesa);
  },[]);

  useEffect(() => {
  console.log("dataDesa updated:", dataDesa);
  
}, [dataDesa]);

  function handleceklokasi(id_marker){
    console.log("kepencet");
    navigate(`/petadesa?marker=${id_marker}`);
  }

    return(
      <div className='relative -mx-[calc(50vw-50%)] w-screen'>                  
          <Header
          imageUrl={Imgbg}
          title="Selamat Datang Di Desa Tetaan"
          subtitle="Dikelola Oleh Desa Tetaan sebagai Saran Informasi Bagi Masyarakat"          
          />
        <div 
        className="max-w-4xl mx-auto text-center"
        >                      
            <br/>
            {/* <p className="text-lg leading-relaxed text-white">jumlah pengunjung : 0000</p>             */}
            {/* data penduduk */}
            {dataDesa.length > 0 && <div className='max-w-4xl mx-auto p-4'>
              <h2 className='text-3xl font-bold text-center text-white mb-6'>Data Penduduk Desa</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='bg-brand-maroon p-4 rounded-lg shadow'>
                  <h3 className='text-lg font-semibold text-white'>Total Penduduk</h3>
                  <p className='text-white text-2xl'>{dataDesa[0].total_penduduk}</p>
                </div>
                <div className='bg-brand-maroon p-4 rounded-lg shadow'>
                  <h3 className='text-lg font-semibold text-white'>Laki-Laki</h3>
                  <p className='text-white text-2xl'>{dataDesa[0].lakilaki}</p>
                </div>
                <div className='bg-brand-maroon p-4 rounded-lg shadow'>
                  <h3 className='text-lg font-semibold text-white'>perempuan</h3>
                  <p className='text-white text-2xl'>{dataDesa[0].perempuan}</p>
                </div>
                <div className="bg-brand-maroon p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-white">Rata-rata Umur</h3>
                  <p className="text-white text-2xl">{dataDesa[0].ratarataumur} tahun</p>
                </div>                
              </div>
              <h3 className='text-2xl font-bold mt-8 text-white'>Kategori Umur</h3>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4'>
                <div className='bg-brand-maroon p-4 rounded-lg shadow text-center'>
                  <p className='font font-medium text-white'>Anak</p>
                  <p className='text-white text-xl'>{dataDesa[0].anakanak}</p>
                </div>
                <div className='bg-brand-maroon p-4 rounded-lg shadow text-center'>
                  <p className='font font-medium text-white'>Remaja</p>
                  <p className='text-white text-xl'>{dataDesa[0].remaja}</p>
                </div>
                <div className='bg-brand-maroon p-4 rounded-lg shadow text-center'>
                  <p className='font font-medium text-white'>Dewasa</p>
                  <p className='text-white text-xl'>{dataDesa[0].dewasa}</p>
                </div>
                <div className='bg-brand-maroon p-4 rounded-lg shadow text-center'>
                  <p className='font font-medium text-white'>Lansia</p>
                  <p className='text-white text-xl'>{dataDesa[0].lansia}</p>
                </div>
              </div>
              <div className='bg-brand-maroon p-4 rounded-lg shadow mt-8'>
                <h3 className='text-lg font-semibold text-white'>pekerjaan terbanyak</h3>
                <p className='text-white text-2xl'>{dataDesa[0].rataratapekerjaan}</p>
              </div>
            </div>}
            {/* struktur */}
            <div className="max-w-5xl mx-auto p-6">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Struktur Aparat Desa</h2>
                
                    {strukturdesa.length > 0 &&<div className="grid grid-cols-1 md:grid-cols-3 gap-6">                                        
                        {strukturdesa.map(item=>
                          (<div key={item.id} className="bg-brand-maroon shadow-lg rounded-lg p-4 flex flex-col items-center">
                            <img src={item.gambar_url}
                            alt={item.nama}
                            className="w-20 h-20 rounded-full object-cover mb-4"
                            />
                            <h3 className="text-lg font-semibold text-white">{item.nama}</h3>
                            <p className="text-white">{item.jabatan}</p>
                            <button onClick={()=>handleceklokasi(item.marker_id)}
                            // className='mt-2 bg-blue-200 text-white px-3 py-1 rounded'
                            // className={`${base} ${variants.primary} `}
                            className='bg-[#7d2122] text-white px-6 py-2 rounded-lg shadow-md hover:bg-brand-maroonSoft transition-colors duration-300'
                            >
                              Cek Lokasi
                            </button>
                        </div>
                      ))}      
                </div>}
            </div>
            {/* kegiatan */}
            <div className='max-w-5xl mx-auto py-10 px-4'>
                <h2 className='text-3xl font-bold text-white text-center mb-8'>Kegiatan Desa</h2>
                <Swiper modules={[Navigation,Pagination,Autoplay]} spaceBetween={30} slidesPerView={1} 
                navigation
                pagination={{clickable: true}}
                autoplay={{delay:4000}}
                loop={true}
                >{kegiatanDesa.map((item) =>(
                    <SwiperSlide key={item.id}>
                        <div className='rounded-lg overflow-hidden shadow-lg mb-2'>
                            <img src={item.gambar_url} alt={`kegiatan ${item.id + 1}`} className='w-full h-64 object-cover'/>
                            <div className='p-4 bg-brand-maroon text-white text-lg'>
                                {item.deskripsi}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            {/*  */}
        </div>
        </div>
    );
}