import { auth, db } from "@/services/firebase/firebase";
import { fetchUserProfileInfo } from "@/state-management/redux/slices/userSlice";
import { RegisterFunctionProps } from "@/types/auth";
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "@/utilis/constants";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const handleRegister = async ({values, setLoading, push}: RegisterFunctionProps) => {
    setLoading(true);
    const { firstName, lastName, email, password, collabId } = values;
    try{
        const response = await createUserWithEmailAndPassword( auth, email, password );
        const { uid } = response.user;

        const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
        await setDoc(createDoc, {
            uid, firstName, lastName, email, collaborations: collabId ? [ collabId ] : []
        });

        push(ROUTE_CONSTANTS.LOGIN);
    }catch(error: any){
        console.log(error.message);
    }finally{
        setLoading(false);
    };
};


export const handleLogin = async ({values, setLoading, push, dispatch}: RegisterFunctionProps) => {
    setLoading(true);
    
    try{        
    const { email, password } = values;
    
    await signInWithEmailAndPassword( auth, email, password );
    if(dispatch){
        dispatch(fetchUserProfileInfo());
    }
    push(ROUTE_CONSTANTS.CABINET);
    }catch(error:any){
        console.log(error.message);
    }finally{
        setLoading(false);
    };
};
