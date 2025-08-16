import { useState,useEffect } from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";

export default function AdminGallery(){
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);    

    const [editid,setEditid] = useState(null);
    const [form,setForm] = useState({
        deskripsi:"",
        link_gambar:""
    });

    const [delete_url,setDeleteurl] = useState(null);
    

    useEffect(() => {
        fetchImages();
    },[]);

    const fetchImages = async () => {
        const {data,error} = await supabase.from('gallery').select("*").order("created_at",{ascending:false});
        if(!error)setImages(data);
    };

    const handleChange = (e) =>{
        const {name,value,files} = e.target;
        setForm((prev) => ({
            ...prev,[name]:files? files[0]:value,
        }));
        console.error(form);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
    }

    const addData = async () => {
                if(!form.deskripsi || !form.link_gambar){
                    alert("deskripsi dan link_gambar harus di isi");
                    return;
                }
                if(uploading){
                    return;
                }
                setUploading(true);
    
                console.log(form.link_gambar, form.link_gambar instanceof File);
    
    
                const filename = `${uuidv4()}-${form.link_gambar.name}`; 
                const {data:uploadData,error:uploadError} = await supabase.storage.from("gallerydesa")
                .upload(filename,form.link_gambar);  
    
                if(uploadError){
                    alert("upload gagal ada errorr");
                    alert(uploadError);
                    return; 
                }
    
                const {data : urlData} = supabase.storage.from("gallerydesa").getPublicUrl(filename);
    
                const {error} =  await supabase.from("gallery").insert({
                    deskripsi : form.deskripsi,                
                    link_gambar: urlData.publicUrl,                
                });
                    
                if(error){
                    console.error("gagal :" ,error);
                }else{                
                    resetForm();
                    fetchImages();
                    resetForm();
                    setUploading(false);
                    fetchImages();
                }
            }

            const updateData = async () => {
                        if(!editid)return;
                        if(uploading) return;
                        setUploading(true);
            
                        if(form.link_gambar instanceof File){const filename = `${uuidv4()}-${form.link_gambar.name}`;
                        const {data:uploadData,error:uploadError} = await supabase.storage.from("gallerydesa")
                        .upload(filename,form.link_gambar);
            
                        const {data:urlData} = supabase.storage.from("gallerydesa").getPublicUrl(filename);
                        
                        form.link_gambar = urlData.publicUrl;
                        const filepath = delete_url.split("/").pop().split("?")[0];
                        await supabase.storage.from("gallerydesa").remove([filepath]);
                    }            
                        const {error} = await supabase.from("gallery")
                        .update(form).eq('id',editid);
            
                        if(!error){
                            fetchImages();
                            resetForm();
                            setDeleteurl(null);
                        }else{console.error(error)}
                    }

    const resetForm = () =>{
                setForm({ deskripsi: '', link_gambar: ''});
                setEditid(null);    
                setUploading(false);
                window.location.reload();       
            }
    
            const hapuskegiatan = async (id,url) =>{
                console.error(id,url);
                const filepath = url.split("/").pop().split("?")[0];
                await supabase.from("gallery").delete().eq("id",id);
                await supabase.storage.from("gallerydesa").remove([filepath]);
                fetchImages();
            };
    
            async function editkegiatan(item) { 
                console.error(item.id)                      
                setEditid(item.id);
                setForm({
                    deskripsi:item.deskripsi,
                    link_gambar:item.link_gambar
                });
                setDeleteurl(item.link_gambar);
                
            }    

    return(
        <div className="max-w-xl mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4 text-center text-white">Halaman Admin Gallery</h1>
            <div className="mb-6 bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                <label className="block mb-2 text-white font-bold">Pilih Gambar</label>
                <form onSubmit={handleSubmit} className="bg-brand-maroon p-4 rounded shadow mb-6">
                <input type="file" onChange={handleChange} accept="image/*" name="link_gambar"
                className="mb-4 bg-brand-maroonDark p-4 text-white"/>
                {form.link_gambar && <img src={form.link_gambar instanceof File ? 
                    URL.createObjectURL(form.link_gambar) : form.link_gambar} alt="Preview" />}

                <label className="block mb-2 text-white font-bold">Deskripsi</label>
                <textarea className="w-full p-2  bg-brand-maroonDark rounded
                placeholder-white 
                placeholder-opacity-60 text-white" rows={3}
                placeholder="masukan deskripsi..."
                value={form.deskripsi}
                onChange={handleChange}
                name="deskripsi"            
                ></textarea>
                {editid?(<button onClick={updateData} disabled={uploading} 
                className="mt-4 bg-brand-maroonDark font-bold text-white py-2 px-4 rounded">
                    tambahkan perubahan
                </button>):(<button onClick={addData} disabled={uploading} 
                className="mt-4 bg-brand-maroonDark font-bold text-white py-2 px-4 rounded">
                    silahkan upload
                </button>)}
                {editid && <button onClick={resetForm} disabled={uploading} 
                className="mt-4 bg-brand-maroonDark font-bold text-white py-2 px-4 rounded">
                    reset form
                </button>}
                
                </form>
            </div>

        <div className="bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
        <h2 className="text-xl font-bold mb-2 text-white">Foto yang sudah di unggah</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img)=> (
                <div key={img.id} className="rounded p-2 shadow bg-brand-maroon">
                    <img src={img.link_gambar} alt="Gallerydesa" 
                    className="w-full h-48 object-cover mb-2 rounded"/>
                    <p className="text-sm mb-2 text-white font-bold">{img.deskripsi}</p>
                    <button onClick={()=> editkegiatan(img)}
                    className="bg-brand-maroonDark text-white py-1 px-3 rounded 
                    text-sm font-bold"
                    >edit</button>
                    <button onClick={()=> hapuskegiatan(img.id,img.link_gambar)}
                    className="bg-brand-maroonDark text-white py-1 px-3 rounded text-sm
                     ml-2 font-bold"
                    >Hapus</button>
                </div>
            ))}
        </div>
        </div>

        </div>
    )

}