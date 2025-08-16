import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./Supabaseclient";

export default function RequireAuth({children}){
    const [loading,setloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const {data : {session}} =await supabase.auth.getSession();

            if(!session){
                navigate("/loginadmin");
            }else{
                setloading(false);
            }
        };

        checkSession();

    },[navigate]);

    if(loading) return <p className="text-center mt-20">Memuat...</p>;

    return children;
}