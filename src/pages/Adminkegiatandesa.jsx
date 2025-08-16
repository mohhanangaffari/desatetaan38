import React,{useEffect,useState} from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";

export default function adminkegiatandesa(){   
    const [uploading,setIsuploading] = useState(null); 
    const [editid,setEditId] = useState(null);    
    const [daftarkegiatan,setDaftarkegiatan] = useState([]);
    const [form,setForm] = useState({
        deskripsi:"",
        gambar_url:""
    });    
    const [delete_url,setDeleteurl] = useState(null);

    async function fetchkegiatan() {
        const {data,error} = await supabase.from("kegiatandesa").select("*");
        if(!error) setDaftarkegiatan(data);
        }

    useEffect(() => {
        fetchkegiatan();
    },[])

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

    const addData = async () => {
            if(!form.deskripsi || !form.gambar_url){
                alert("deskripsi dan gambar_url harus di isi");
                return;
            }            

            setIsuploading(true);
            console.log(form.gambar_url, form.gambar_url instanceof File);


            const filename = `${uuidv4()}-${form.gambar_url.name}`; 
            const {data:uploadData,error:uploadError} = await supabase.storage.from("gambarkegiatan")
            .upload(filename,form.gambar_url);  

            if(uploadError){
                alert("upload gagal ada errorr");
                alert(uploadError);
                return; 
            }

            const {data : urlData} = supabase.storage.from("gambarkegiatan").getPublicUrl(filename);

            const {error} =  await supabase.from("kegiatandesa").insert({
                deskripsi : form.deskripsi,                
                gambar_url: urlData.publicUrl,                
            });
                
            if(error){
                console.error("gagal :" ,error);
            }else{                
                setForm({deskripsi:"",gambar_url:""});
                setIsuploading(false);
                fetchkegiatan();
                resetForm();
            }
        }

        const updateData = async () => {
            if(!editid)return;
            if(uploading) return;
            setIsuploading(true);

            if(form.gambar_url instanceof File){const filename = `${uuidv4()}-${form.gambar_url.name}`;
            const {data:uploadData,error:uploadError} = await supabase.storage.from("gambarkegiatan")
            .upload(filename,form.gambar_url);

            const {data:urlData} = supabase.storage.from("gambarkegiatan").getPublicUrl(filename);
            
            form.gambar_url = urlData.publicUrl;
            const filepath = delete_url.split("/").pop().split("?")[0];
            await supabase.storage.from("gambarkegiatan").remove([filepath]);
        }            
            const {error} = await supabase.from("kegiatandesa")
            .update(form).eq('id',editid);

            if(!error){
                fetchkegiatan();
                resetForm();
                setDeleteurl(null);
            }else{console.error(error)}
        }

        const resetForm = () =>{
            setForm({ deskripsi: '', gambar_url: ''});
            setEditId(null);     
            setIsuploading(false);
            window.location.reload();       
        }

        const hapuskegiatan = async (id,url) =>{
            console.error(id,url);
            const filepath = url.split("/").pop().split("?")[0];
            await supabase.from("kegiatandesa").delete().eq("id",id);
            await supabase.storage.from("gambarkegiatan").remove([filepath]);
            fetchkegiatan();
        };

        async function editkegiatan(item) { 
            console.error(item.id)                      
            setEditId(item.id);
            setForm({
                deskripsi:item.deskripsi,
                gambar_url:item.gambar_url
            });
            setDeleteurl(item.gambar_url);
            
        }

        return(
            
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-xl font-bold mb-4 text-white">Admin Kegiatan Desa</h2>
                <div className=" bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)] mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-brand-maroon p-4 rounded shadow">
                    <textarea  name="deskripsi" placeholder="deskripsi" value={form.deskripsi} onChange={handleChange} 
                    className="p-2 w-full mb-2 bg-brand-maroonDark rounded placeholder-white placeholder-opacity-60 text-white"/>
                    <input type="file" accept="image/*" name="gambar_url" onChange={handleChange}
                    className="mb-2 bg-brand-maroonDark p-4 text-white font-bold"/>
                        {form.gambar_url && <img src={form.gambar_url instanceof File ? URL.createObjectURL(form.gambar_url) : form.gambar_url} alt="Preview" 
                        className="w-52 h-52 object-cover " style={{maxWidth:"200px"}}/>}
                    {editid? (<button onClick={updateData} className="bg-brand-maroonDark font-bold text-white px-4 py-2 rounded">
                        perbarui kegiatan
                    </button>):(<button onClick={!uploading ? addData : {}} className="bg-brand-maroonDark font-bold text-white px-4 py-2 rounded">
                        tambahkan kegiatan
                    </button>)}
                    {editid && <button onClick={resetForm} className="bg-brand-maroonDark font-bold text-white px-4 py-2 rounded ml-2">
                        reset form
                    </button>}
                    
                    </form>
                </div>

                <div className="bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]" >
                <h3 className="font-bold mb-2 text-white">List Kegiatan</h3>
                {daftarkegiatan.map(item => (
                    <div key={item.id} className="p-2 mb-2 flex justify-between items-center bg-brand-maroon rounded">
                        <div>
                            <p className="font-bold text-white mt-2 mb-2">{item.deskripsi}</p>
                            <img src={item.gambar_url} className="w-full h-52"/>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => editkegiatan(item)} className="bg-brand-maroonDark font-bold text-white px-2 py-1 rounded">edit</button>
                            <button onClick={() => hapuskegiatan(item.id,item.gambar_url)} className="bg-brand-maroonDark font-bold text-white px-2 py-1 rounded">hapus</button>
                        </div>
                    </div>
                ))}
                </div>

            </div>
        );
        
    }

