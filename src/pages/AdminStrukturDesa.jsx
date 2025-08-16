import { useState,useEffect } from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";

export default function AdminStrukturDesa(){
    const [form,setForm] = useState([{
        nama:"",
        jabatan:"",
        gambar_url:"",
        marker_id:""
        }
    ]);
    const [editId,setEditId] = useState(null);
    const [dataStruktur,setDataStruktur] = useState([]);
    const [markers,setMarkers] = useState([]);
    const [delete_url,setDeleteurl] = useState(null);
    const [uploading,setIsuploading] = useState(null);
    

    useEffect(()=>{
        fetchDataStruktur();
        fetchMarkers();
    },[]);

    const fetchDataStruktur = async () => {
        const {data,error} = await supabase.from("datastruktur").select("*");
        setDataStruktur(data);
        }

    const fetchMarkers = async () => {
        const {data} = await supabase.from("markerdesa").select("*");
        setMarkers(data);
    }   

    const handleChange = (e) => {        
        const {name,value,files} = e.target;
        setForm((prev)=>({
            ...prev,[name]:files? files[0] : value,
        }));
        console.error(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();        
    };
    

        const updateData = async () => {
            if(!editId)return;
            if(uploading){return;}
            setIsuploading(true);

            if(form.gambar_url instanceof File){const filename = `${uuidv4()}-${form.gambar_url.name}`;
            console.error(form.gambar_url);
            const {data:uploadData,error:uploadError} = await supabase.storage.from("gambarstruktur")
            .upload(filename,form.gambar_url);

            const {data:urlData} = supabase.storage.from("gambarstruktur").getPublicUrl(filename);            
            console.error(urlData);
            
            form.gambar_url = urlData.publicUrl;
            const filepath = delete_url.split("/").pop().split("?")[0];            
            console.error(filepath);
            const {error} = await supabase.storage.from("gambarstruktur").remove([filepath]);
            if(error){            
            console.error(error);
            }
            
        }

            const {error} = await supabase.from("datastruktur")
            .update(form).eq('id',editId);

            if(!error){
                fetchDataStruktur();
                resetForm();
                fetchDataStruktur();
                setDeleteurl(null);
                setEditId(null)
                setIsuploading(false);
                
            }else{console.error(error)}
        }

        const startEdit= (item) => {            
            setForm({
                nama: item.nama,
                gambar_url: item.gambar_url,
                marker_id: item.marker_id,
                jabatan:item.jabatan,
            });
            setEditId(item.id)
            setDeleteurl(item.gambar_url);
            console.error(delete_url); 
            
        };
        

        const resetForm = () =>{
            setForm({ nama: '', gambar_url: '', jabatan: '', marker_id: '' });   
            setIsuploading(false);  
            window.location.reload();       
        }

        return(
        <div className="p-6 max-w-5xl mx-auto mt-4">
            <div className="bg-brand-maroonSoft rounded p-4 shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
            <h1 className="text-white font-bold mb-2 mt-2" > Edit Data Struktur Desa</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-brand-maroon p-4 rounded shadow">
                <input name="nama" placeholder="nama jabatan" value={form.nama} onChange={handleChange}
                className="input bg-brand-maroonDark rounded p-4 
                placeholder-white placeholder-opacity-60 text-white"/>
                
                <input name="jabatan" placeholder="jabatan" value={form.jabatan}
                onChange={handleChange} className="input bg-brand-maroonDark rounded p-4 
                placeholder-white placeholder-opacity-60 ml-2 text-white"
                />
                                
                <select name="marker_id" value={form.marker_id} onChange={handleChange}
                className="input bg-brand-maroonDark rounded p-4 placeholder-white placeholder-opacity-60 ml-2 text-white font-bold">
                    <option className="text-white font-bold" value={""}>Pilih Lokasi Marker</option>
                    {markers.map((m) => (
                        <option className="text-white font-bold" key={m.id} value={m.id}>{m.nama}</option>
                    ))}
                </select>

                <input name="gambar_url" type="file" accept="image/*" onChange={handleChange} 
                className="font-bold text-white bg-brand-maroonDark p-4 rounded"/>
                {form.gambar_url && <img src={form.gambar_url instanceof File ? URL.createObjectURL(form.gambar_url):form.gambar_url} alt="Preview" className="w-32 h-32 object-cover" style={{maxWidth:"200px"}}/>}
                {editId && <button onClick={updateData} className="bg-brand-maroonDark font-bold text-white px-4 py-2 rounded">
                    Simpan perubahan
                </button>}
                
                {editId && (
                    <button onClick={resetForm} className="ml-2 bg-brand-maroonDark font-bold text-white px-4 py-2 rounded mt-4">
                        batal edit
                    </button>
                )}

            </form>
            </div>



            <div className="mt-10 bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                <h2 className="text-lg font-bold mb-2 text-white">Data Struktur Desa</h2>
                <ul className="space-y-2">
                    {dataStruktur.map((item) => (
                        <li key={item.id} className="p-3 bg-brand-maroon rounded">
                            <p className="text-white font-bold"><strong>Nama : </strong>{item.nama}</p>
                            <p className="text-white font-bold"><strong>jabatan : </strong>{item.jabatan}</p>                            
                            <p className="text-white font-bold"><strong>Marker ID : </strong>{item.marker_id}</p>
                            <img src={item.gambar_url} className="w-52 h-52 object-cover mt-2"/>
                            <div className="flex gap-2 mt-2">
                            <button onClick={() => startEdit(item)} className="bg-brand-maroonDark 
                            px-3 py-1 text-white rounded font-bold">Edit</button>                            
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );

    
}