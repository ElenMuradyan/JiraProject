import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { stateInterface, userData } from "@/types/userState";
import { getUser } from "@/services/firebase/databaseActions";

const initialState: stateInterface = {
    loading: true,
    authUserInfo: {
        isAuth: false,
        userData: null,
    },
    error: null
}

export const fetchUserProfileInfo = createAsyncThunk<userData | null, string>(
    'user/fetchUserProfileInfo',
    async (uid: string, { rejectWithValue }) => {
      try {
        const data = await getUser(uid);
        return data;  
      }catch(err: any){
        console.log(err.message);
        return rejectWithValue(null);
      }
    }
  );
  
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers: {
       setIsAuth: (state, action) => {
        state.authUserInfo.isAuth = action.payload;
       },
       setImageUrl: (state, action) => {
        if(state.authUserInfo.userData){
            state.authUserInfo.userData.imgUrl = action.payload;
        }
       },
    },
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserProfileInfo.pending, (state) =>{
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
export const { setIsAuth, setImageUrl } = userProfileSlice.actions;