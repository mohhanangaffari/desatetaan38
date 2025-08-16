import { useEffect, useState } from "react";
import { supabase } from "../Supabaseclient";
import {v4 as uuidv4} from "uuid";

export default function AdminGambarDesa(){
    const [delete_url,setDeleteurl] = useState(null);
    const [form,setForm]= useState({
        gambar_url:""
    });
    const [gambarset,setGambarset] = useState(null);
    const [uploading,setUploading] = useState(null);

    const pasangimage = async () => {
        const {data:data1,error} = await supabase.storage.from("gambardesa").list();
        if(!error){            
            const {data:data2,error:error2} =  supabase.storage.from("gambardesa").getPublicUrl(data1[0].name);            
            if(!error2){                
                setGambarset(data2.publicUrl);
                setDeleteurl(data2.publicUrl);
            }
            
        }
        
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
    }

    const handleChange = (e) =>{
        const {name,value,files} = e.target;
        setForm((prev) => ({
            ...prev,[name]:files? files[0]:value,
        }));
        console.error(form);
    }

    useEffect(() => {
        pasangimage();
    },[]);

    const gantiImgage = async() =>{        
        if(uploading){
            return;
        }
        setUploading(true);
        if(form.gambar_url instanceof File){
            
            const filename = `${uuidv4()}-${form.gambar_url.name}`;                
                const {data:uploadData,error:uploadError} = await supabase.storage.from("gambardesa")
                .upload(filename,form.gambar_url);
    
                const {data:urlData} = supabase.storage.from("gambardesa").getPublicUrl(filename);
                
                form.gambar_url = urlData.publicUrl;                           
                const filepath = delete_url.split("/").pop().split("?")[0];            
                await supabase.storage.from("gambardesa").remove([filepath]);
                
                pasangimage();
                
                setForm({gambar_url:''});
                setUploading(false);
                window.location.reload();
            }           
                
    }
        return(
        
        <div className="bg-brand-maroon p-4 rounded shadow-[0px_0px_25px_rgba(0,0,0,0.3)]
        place-self-center mt-8">
            <h1 className="text-white font-bold place-self-center text-2xl mb-4">Mengganti Gambar Header / background website desa</h1>
            {gambarset && 
            <div className="bg-brand-maroonSoft p-4 rounded">
                <h1 className="text-white font-bold">Gambar Header/Background Yang Sekarang Di Pakai :</h1>
            <img src={gambarset} className="max-h-96 w-full"/>
            {/* {gambarset instanceof File ? <img src={gambarset}alt="Preview" className="w-52 h-52 object-cover " 
            style={{maxWidth:"200px"}}/> :""} */}                        
            </div>
            }
        
        <form onSubmit={handleSubmit} className="mt-4 p-4 bg-brand-maroonSoft rounded">
            <div className="grid md:grid-cols-2 gap-2">
            <input type="file" name="gambar_url" accept="image/*" onChange={handleChange} 
            className="bg-brand-maroonDark p-4 rounded font-bold 
            text-white h-full"/>
            
            <button onClick={gantiImgage} className="bg-brand-maroonDark p-4 rounded shadow 
            font-bold text-white h-full">ganti gambar background website desa</button>
            
            </div>
            {form.gambar_url instanceof File && 
            <div className="p-4">
                <h1 className="text-white font-bold mb-2 mt-2">Diganti Menjadi : </h1>
            <img src={URL.createObjectURL(form.gambar_url)} alt="Preview" 
                        className="w-full h-80 object-cover "/>
                        </div>}
        </form>
        </div>
        )

}