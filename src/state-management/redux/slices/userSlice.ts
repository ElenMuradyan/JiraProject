import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { stateInterface, userData } from "@/types/userState";

const initialState: stateInterface = {
    loading: true,
    authUserInfo: {
        isAuth: false,
        userData: null,
    },
    error: null
}

export const fetchUserProfileInfo = createAsyncThunk<userData | null>(
    'user/fetchUserProfileInfo',
    async () => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe(); 
  
          if (user) {
            try {
              const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, user.uid);
              const userSnap = await getDoc(userRef);
              if (userSnap.exists()) {
                resolve(userSnap.data() as userData);
              } else {
                resolve(null);
              }
            } catch (err: any) {
              reject(err.message);
            }
          } else {
            reject('No user found');
          }
        });
      });
    }
  );
  
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers: {
       setIsAuth: (state, action) => {
        state.authUserInfo.isAuth = action.payload;
       },
    },
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserProfileInfo.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) =>{
            state.loading = false;
            state.authUserInfo.userData = action.payload;
            state.authUserInfo.isAuth = true;
        })
        .addCase(fetchUserProfileInfo.rejected, (state, action) =>{
            state.loading = false;
            state.authUserInfo.isAuth = false;
            state.error = action.payload as string;
            state.authUserInfo.userData = null;
        })
    }
})

export default userProfileSlice.reducer;
export const { setIsAuth } = userProfileSlice.actions;