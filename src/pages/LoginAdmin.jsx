import { useState } from "react";
import { supabase } from "../Supabaseclient";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const navigate = useNavigate();

    const handlelogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({email,password});

        if(error){
            alert("Login gagal:"+error.message);
        }else{
            navigate("/");
            window.location.reload();
        }
    };
    return(
        <div className="max-w-sm mx-auto mt-20 p-4 rounded shadow-lg bg-brand-maroon">
            <h2 className="text xl font-bold mb- text-center text-white m-4">Login Admin</h2>
            <input 
            type="email"
            placeholder="masukan Email"        
            value={email}
            
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 text-white rounded 
            bg-brand-maroonSoft placeholder-white placeholder-opacity-60"
            />

            <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            className="w-full mb-4 p-2 rounded text-white
            bg-brand-maroonSoft placeholder-white placeholder-opacity-60"
            />

            <button onClick={handlelogin} 
            className="w-full bg-brand-maroonDark text-white font-bold py-2 rounded">Login</button>
            
        </div>
    )
}