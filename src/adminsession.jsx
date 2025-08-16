import { useEffect, useState } from 'react';
import { supabase } from './Supabaseclient';

export default function useAdminAuth(){
    const [isadmin,setIsadmin] = useState(false);
    
    useEffect(() =>{
        const check = async () => {
            const {data:{session}} = await supabase.auth.getSession();

            setIsadmin(!!session);            
        };
        check();        
    },[]);

    return{isadmin};
}