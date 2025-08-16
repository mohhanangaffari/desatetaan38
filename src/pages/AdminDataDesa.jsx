import React,{useEffect,useState} from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";
import { data } from "react-router-dom";

export default function AdminDataDesa(){
    const [editid,setEditId] = useState(null);
    const [datadesa,setDatadesa] = useState([]);

    const [form,setForm] = useState({
        total_penduduk : "",
        perempuan:"",
        remaja:"",
        dewasa:"",
        lansia:"",
        ratarataumur:"",
        rataratapekerjaan:"",
        anakanak:"",
        lakilaki:""
    });

    const [uploading,setUploading] = useState(null);

    const fetchdatadesa = async() => {
    const {data,error} = await supabase.from("datadesa").select("*").eq("id","1");
    if(!error){
      setDatadesa(data);
      
    }else{
      console.error(error);
    }
    
  }

  useEffect(() => {
    fetchdatadesa();
    
  },[])

  useEffect(()=>{
    setFormValue();
  },[datadesa])

  const handleChange = (e) =>{
          const {name,value,files} = e.target;
          setForm((prev) => ({
              ...prev,[name]:files? files[0] : value,
          }));
          console.error(form);
      };
      
      const handleSubmit = async (e) => {
          e.preventDefault();                    
      };
  
  
          const updateData = async () => {              
              if(uploading){
                return;
              }
              setUploading(true);
              
              const {error} = await supabase.from("datadesa")
              .update(form).eq("id","1");
  
              if(!error){
                  fetchdatadesa();
                  resetForm();    
                  setUploading(false);
                  window.location.reload();
                              
              }else{console.error(error)}
          }
  
          const resetForm = () =>{
              setForm({
                total_penduduk : "",
                perempuan:"",
                remaja:"",
                dewasa:"",
                lansia:"",
                ratarataumur:"",
                rataratapekerjaan:"",
                anakanak:"",
                lakilaki:""
              });              
          }

          const setFormValue = () => {
            {datadesa.length > 0 && setForm({
                total_penduduk : datadesa[0].total_penduduk,
                perempuan:datadesa[0].perempuan,
                remaja:datadesa[0].remaja,
                dewasa:datadesa[0].dewasa,
                lansia:datadesa[0].lansia,
                ratarataumur:datadesa[0].ratarataumur,
                rataratapekerjaan:datadesa[0].rataratapekerjaan,
                anakanak:datadesa[0].anakanak,
                lakilaki:datadesa[0].lakilaki
              });}
          }
  
        
          return(
            <div className="max-w-xl mx-auto p-4 ">
                <h2 className="text-xl font-bold mb-4 text-white">Admin Data Desa</h2>
                <div className=" bg-brand-maroon p-4 rounded mb-6 shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                    {datadesa.length > 0 &&<form onSubmit={handleSubmit} 
                    className="space-y-4 bg-brand-maroonSoft p-4 rounded shadow">
                      <div className="grid md:grid-cols-2 ">
                        <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                          <label className=" text-white font-bold">
                            total penduduk
                            </label>
                            <br/>
                            <input type="number" name="total_penduduk" value={form.total_penduduk} 
                            placeholder="total penduduk" onChange={handleChange} 
                            className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                    </div>
                    <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                          <label className=" text-white font-bold">
                            total laki laki
                            </label>
                            <br/>
                            <input type="number" name="lakilaki" value={form.lakilaki} 
                            placeholder="total penduduk" onChange={handleChange} 
                            className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                    </div>
                    <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                          <label className=" text-white font-bold">
                            total perempuan
                            </label>
                            <br/>
                            <input type="number" name="perempuan" value={form.perempuan} 
                            placeholder="total penduduk" onChange={handleChange} 
                            className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                    </div>
                      <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                            <label className=" text-white font-bold">
                              rata rata umur
                              </label>
                              <br/>
                              <input type="number" name="ratarataumur" value={form.ratarataumur} 
                              placeholder="total penduduk" onChange={handleChange} 
                              className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                      </div>
                      <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                            <label className=" text-white font-bold">
                              total anak anak
                              </label>
                              <br/>
                              <input type="number" name="anakanak" value={form.anakanak} 
                              placeholder="total penduduk" onChange={handleChange} 
                              className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                      </div>
                      <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4  shadow">
                            <label className=" text-white font-bold">
                              total remaja
                              </label>
                              <br/>
                              <input type="number" name="remaja" value={form.remaja} 
                              placeholder="total penduduk" onChange={handleChange}
                              className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                      </div>
                      <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4 shadow">
                            <label className=" text-white font-bold">
                              total orang dewasa
                              </label>
                              <br/>
                              <input type="number" name="dewasa" value={form.dewasa} 
                              placeholder="total penduduk" onChange={handleChange}
                              className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                      </div>
                      <div className="bg-brand-maroon rounded place-self-center text-center p-4 mt-4 shadow">
                            <label className=" text-white font-bold">
                              total lansia
                              </label>
                              <br/>
                              <input type="number" name="lansia" value={form.lansia} 
                              placeholder="total penduduk" onChange={handleChange}
                              className="mb-2 bg-brand-maroonDark rounded text-white text-center"/>
                      </div>
                    

                    </div> 
                    <div className="mt-4 bg-brand-maroon rounded text-center p-4 shadow-lg">
                    <label className="text-white font-bold">Rata Rata Pekerjaan</label>
                    <textarea  name="rataratapekerjaan" placeholder="rata-rata pekerjaan" 
                    value={form.rataratapekerjaan} onChange={handleChange} 
                    className="bg-brand-maroonDark rounded p-2 w-full mb-2 text-white mt-4"/>
                    </div>
                                      
                    <button onClick={updateData} className="bg-brand-maroon text-white shadow-lg font-bold px-4 py-2 rounded">
                        perbarui kegiatan
                    </button>                    
                    
                    </form>}
                </div>            

            </div>
          )

}