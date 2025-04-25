import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { collabState, community } from "@/types/communities";

const initialState: collabState = {
    loading: false,
    collab: null,
    error: null
}

export const fetchCollab = createAsyncThunk(
    'user/fetchCollab',
    async (id: string) => {
        const collabDoc = doc(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, id);
        const collabSnap = await getDoc(collabDoc);
        return collabSnap.data() as community;
}
);
  
const collabSlice = createSlice({
    name:'userCollabs',
    initialState,
    reducers: {},
    extraReducers:(promise) => {
        promise
        .addCase(fetchCollab.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchCollab.fulfilled, (state, action) =>{
            state.loading = false;
            state.collab = action.payload as community;
        })
        .addCase(fetchCollab.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
            state.collab = null
        })
    }
})

export default collabSlice.reducer;
export const { } = collabSlice.actions;