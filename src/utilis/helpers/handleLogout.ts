import { auth } from "@/services/firebase/firebase"
import { setIsAuth } from "@/state-management/redux/slices/userSlice";
import { store } from "@/state-management/redux/store";
import { signOut } from "firebase/auth"

export const handleLogout = async () => {
    try{
        await signOut(auth);
        store.dispatch(setIsAuth(false));
        const res = await fetch('/api/header', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
          },
          });
    
          if(!res.ok){
            throw new Error('Something is wrong.')
          };
          window.location.reload();    
    }catch(err: any){
        console.log(err.message);
    }
}