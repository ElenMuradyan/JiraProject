import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { collabsState, community } from "@/types/communities";

const initialState: collabsState = {
    loading: false,
    collabs: [],
    error: null
}

export const fetchUserCollabs = createAsyncThunk(
    'user/fetchUserCollabs',
    async (ids: string[]) => {
        const collabs = await Promise.all(ids.map(async id => {
            const collabDoc = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, id);
            const collabSnap = await getDoc(collabDoc);
            return collabSnap.data() as community;
        }));

        return collabs;
    }
);
  
const userCollabsSlice = createSlice({
    name:'userCollabs',
    initialState,
    reducers: {},
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserCollabs.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchUserCollabs.fulfilled, (state, action) =>{
            state.loading = false;
            state.collabs = action.payload as community[];
        })
        .addCase(fetchUserCollabs.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
            state.collabs = []
        })
    }
})

export default userCollabsSlice.reducer;
export const { } = userCollabsSlice.actions;