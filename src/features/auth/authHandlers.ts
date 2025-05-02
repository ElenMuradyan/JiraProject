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
            uid, firstName, lastName, email, collaborations: collabId ? [ collabId ] : [], messages: []
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
    
    const user = await signInWithEmailAndPassword( auth, email, password );
    if(dispatch){
        dispatch(fetchUserProfileInfo(user.user.uid));
    };

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.user.uid,
        })
      });

      if (res.ok) {
        push(ROUTE_CONSTANTS.HOME);
      } else {
        console.log('Authentication failed, please try again.');
      }
    }catch(error:any){
        console.log(error.message);
    }finally{
        setLoading(false);
    };
};
