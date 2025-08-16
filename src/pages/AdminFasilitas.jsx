import { useEffect,useState } from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";

export default function AdminFasilitas(){
    const [mode,setMode] = useState("pendidikan");
    const [form,setForm] = useState({
        nama:"",        
        alamat:"",
        gambar_url:"",
        marker_id:""
    }); 
    const [formType,setFormType] = useState("");

    const [markers,setMarkers] = useState([]);
    const [dataPendidikan,setdataPendidikan] = useState([]);    
    const [dataIbadah,setdataIbadah] = useState([])
    const [editMode,setEditMode] = useState(null);
    const [delete_url,setDeleteurl] = useState(null);
    const [uploading,setUploading] = useState(null);

    const deleteData = async (item)=> {
        const filepath = (item.gambar_url).split("/").pop().split("?")[0];
        const {error} = await supabase.from(mode === "pendidikan" ? "fasilitaspendidikan":"fasilitasibadah")
        .delete().eq('id',item.id);
        await supabase.storage.from("gambarfasilitas").remove([filepath]);
        if(!error){
            fetchPendidikanIbadah();
        }
    }

    useEffect(()=>{
        fetchMarkers();
        fetchData();
        fetchPendidikanIbadah();
    },[]);

    const fetchMarkers = async () => {
        const {data} = await supabase.from("markerdesa").select("*");
        setMarkers(data || []);
    }

    const fetchData = async () => {
        const {data: pendidikan} = await supabase.from("fasilitaspendidikan").select("*");
        const {data: ibadah} = await supabase.from("fasilitasibadah").select("*");
        setdataPendidikan(pendidikan || []);
        setdataIbadah(ibadah || []);
    }

    const handleChange = (e) => {        
        const {name,value,files} = e.target;
        setForm((prev)=>({
            ...prev,[name]:files? files[0] : value,
        }));
        console.error(form)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();        
    };

    const addData = async () => {
            if(!form.nama || !form.marker_id || !form.gambar_url || !form.alamat){
                alert("nama,marker,alamat, dan gambar harus di isi");
                return;
            }            
            
            setUploading(true);

            const tableName = mode === "pendidikan" ? "fasilitaspendidikan" : "fasilitasibadah";

            const filename = `${uuidv4()}-${form.gambar_url.name}`;
            const {data:uploadData,error:uploadError} = await supabase.storage.from("gambarfasilitas")
            .upload(filename,form.gambar_url);

            if(uploadError){
                alert("upload gagal mass");
                alert(uploadError);
                return; 
            }

            const {data : urlData} = supabase.storage.from("gambarfasilitas").getPublicUrl(filename);

            const {error} = await supabase.from(tableName).insert({
                nama : form.nama,                
                marker_id: form.marker_id,
                gambar_url: urlData.publicUrl,
                alamat : form.alamat
            });
                
            if(error){
                console.error("gagal :" ,error);
            }else{
                fetchData();
                setForm({nama:"",marker_id:"",gambar_url:"",alamat:""});
                fetchPendidikanIbadah();
                resetForm();
             
            }
        }

        const updateData = async () => {
            if(!editMode)return;
            if(uploading) return;
            setUploading(true);
            const tableName = mode === "pendidikan" ? "fasilitaspendidikan" : "fasilitasibadah";
            if(form.gambar_url instanceof File){const filename = `${uuidv4()}-${form.gambar_url.name}`;            
            const {data:uploadData,error:uploadError} = await supabase.storage.from("gambarfasilitas")
            .upload(filename,form.gambar_url);

            const {data:urlData} = supabase.storage.from("gambarfasilitas").getPublicUrl(filename);            
            
            form.gambar_url = urlData.publicUrl;
            const filepath = delete_url.split("/").pop().split("?")[0];            
            await supabase.storage.from("gambarfasilitas").remove([filepath]);
            const {error} = await supabase.from(tableName)
                                    .update(form).eq('id',editMode.id);

            resetForm();
            
            
        }

            const {error} = await supabase.from(mode === "pendidikan" ? "fasilitaspendidikan":"fasilitasibadah" )
            .update(form).eq('id',editMode.id);

            if(!error){
                fetchPendidikanIbadah();
                resetForm();
                setDeleteurl(null);
                
            }else{console.error(error)}
        }

        const startEdit= (type,item) => {
            setFormType(type);
            setForm({
                nama: item.nama,
                gambar_url: item.gambar_url,
                marker_id: item.marker_id,
                alamat:item.alamat,                
                
            });
            setDeleteurl(item.gambar_url);
            console.error(delete_url);
            setEditMode({ type, id: item.id });
            
        };

        const fetchPendidikanIbadah = async () => {
            const {data:pendidikanData} = await supabase.from("fasilitaspendidikan").select('*,markerdesa(*)');
            const {data:ibadahData} = await supabase.from("fasilitasibadah").select('*,markerdesa(*)');

            setdataPendidikan(pendidikanData);
            setdataIbadah(ibadahData);

        }

        const resetForm = () =>{
            setForm({ nama: '', gambar_url: '', marker_id: '' ,alamat:""});
            setFormType(null);
            setEditMode(null);
            setUploading(false);
            window.location.reload();
            
        }


    return(
        <div className="p-6 max-w-5xl mx-auto ">
            <div className="bg-brand-maroonSoft p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
            <div className="flex space-x-4 mb-6">
                <button onClick={() => setMode("pendidikan")}
                    className={`px-4 py-2 rounded font-bold ${mode==="pendidikan" ? "bg-brand-maroon text-white":
                        "bg-brand-maroonDark text-white"}`}
                    >
                        Tambah Fasilitas Pendidikan                    
                </button>
                <button onClick={() => setMode("ibadah")}
                    className={`px-4 py-2 rounded font-bold ${mode==="pendidikan" ? "bg-brand-maroonDark text-white":
                        "bg-brand-maroon text-white"}`}
                    >
                        Tambah Fasilitas ibadah                 
                </button>
            </div>

            
            <form onSubmit={handleSubmit} className="space-y-4 bg-brand-maroon p-4 rounded shadow">
                <input name="nama" placeholder="nama fasilitas" value={form.nama} onChange={handleChange}
                className="input bg-brand-maroonDark placeholder-white 
                placeholder-opacity-60 p-2 rounded m-2 text-white"/>

                <input name="alamat" placeholder="alamat" value={form.alamat} onChange={handleChange} 
                className="input bg-brand-maroonDark placeholder-white 
                placeholder-opacity-60 p-2 rounded m-2 text-white"/>
                <select name="marker_id" value={form.marker_id} onChange={handleChange}
                 className="input bg-brand-maroonDark 
                 placeholder-white placeholder-opacity-60 p-2 rounded m-2 text-white">
                    <option value={""} >Pilih Lokasi Marker</option>
                    {markers.map((m) => (
                        <option key={m.id} value={m.id}>{m.nama}</option>
                    ))}
                </select>

                <input name="gambar_url" type="file" accept="image/*" onChange={handleChange}
                className="bg-brand-maroonDark placeholder-white 
                placeholder-opacity-60 p-2 rounded m-2 text-white"/>
                {form.gambar_url && <img src={form.gambar_url instanceof File ? 
                    URL.createObjectURL(form.gambar_url):form.gambar_url} alt="Preview" 
                    className="w-52 h-52 object-cover m-2" style={{maxWidth:"200px"}}/>}
                {editMode ? (<button onClick={updateData} 
                className="bg-brand-maroonDark text-white px-4 py-2 rounded m-2 font-bold">
                    Simpan perubahan
                </button>):
                (<button onClick={!uploading ? addData:{}} 
                className="bg-brand-maroonDark text-white px-4 py-2 rounded m-2 font-bold">
                    tambah data
                </button>)}
                {editMode && (
                    <button onClick={resetForm} 
                    className="ml-2 bg-brand-maroonDark text-white px-4 py-2 rounded mt-4 font-bold">
                        batal edit
                    </button>
                )}

            </form>
            </div>



            <div className="mt-10 bg-brand-maroonSoft rounded p-4 shadow-[0px_0px_25px_rgba(0,0,0,0.3)]">
                <h2 className="text-lg font-bold mb-2 text-white">Data {mode}</h2>
                <ul className="space-y-2">
                    {(mode==="pendidikan"?dataPendidikan : dataIbadah).map((item) => (
                        <li key={item.id} className="p-3 bg-brand-maroon rounded ">
                            <p className="text-white"><strong >Nama : </strong>{item.nama}</p>
                            <p className="text-white" ><strong>{mode === "pendidikan"?"Jenjang":"Jenis"}</strong>{mode === "pendidikan" ? item.jenjang : item.jenis}</p>
                            <p className="text-white"><strong>Alamat : </strong>{item.alamat}</p>
                            <p className="text-white"><strong>Marker ID : </strong>{item.marker_id}</p>
                            <img src={item.gambar_url} className="w-52 h-52 object-cover mt-2"/>
                            <div className="flex gap-2 mt-2">
                            <button onClick={() => startEdit(mode=== "pendidikan"? 'pendidikan':'ibadah', item)} className="bg-brand-maroonDark px-3 py-1 text-white rounded font-bold">Edit</button>
                            <button onClick={() => deleteData(item)} className="bg-brand-maroonDark px-3 py-1 text-white rounded font-bold">Hapus</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );

}