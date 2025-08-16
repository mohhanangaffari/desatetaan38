import { useEffect } from "react";
import { supabase } from "./Supabaseclient";
import { Navigate, useNavigate } from "react-router-dom";

export default function LogoutAdmin(){
    const navigate = useNavigate();

    useEffect(()=>{
        const logoutadmin = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("isadmin");
        navigate("/");
        window.location.reload();
    };
    logoutadmin();},[navigate]);
    <p>kembali ke dashboard</p>
}