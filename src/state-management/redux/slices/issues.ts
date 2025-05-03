import { collection, getDocs } from "firebase/firestore"
import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/services/firebase/firebase";
import { transformIssueData } from "@/utilis/helpers/transformIssueData";
import { issue, issueState } from "@/types/issues";

const initialState: issueState = {
    data: {},
    loading: false,
    error: null,
}

export const fetchIssueData = createAsyncThunk(
    'data/fetchIssueData',
    async (id: string) => {        
        const queryData = await getDocs(collection(db, FIRESTORE_PATH_NAMES.COLLABORATIONS, id, FIRESTORE_PATH_NAMES.ISSUES));
        const resultData = queryData.docs.map((doc) => doc.data() as issue);                
        return transformIssueData(resultData);
    }
)

const issueSlice = createSlice({
    name: 'issueSlice',
    initialState,
    reducers: {
        changeIssueColumns: (state, action) => {
            if(state.data){
                const columns = state.data;
                const { source, destination } = action.payload;
                const sourceColumnItems = [...columns[source.droppableId]];
                const destinationColumnItems =[...columns[destination.droppableId]]; 
    
                const [removeItem] = sourceColumnItems.splice(source.index, 1);
                destinationColumnItems.splice(destination.index, 0, removeItem);
    
                let changedColumns = {};
                if(source.droppableId !== destination.droppableId){
                    changedColumns = {
                        ...columns,
                        [source.droppableId]: sourceColumnItems,
                        [destination.droppableId]: destinationColumnItems
                    }
                } else {
                    sourceColumnItems.splice(destination.index, 0, removeItem);
                    changedColumns = {
                        ...columns,
                        [source.droppableId]: sourceColumnItems
                    }               
                }
                state.data = changedColumns;
            }    
        }
    },
    extraReducers: (promise) => {
        promise
        .addCase(fetchIssueData.pending, state => {
            state.loading = true;
        })
        .addCase(fetchIssueData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(fetchIssueData.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload as string;
        })
    }
})

export const {changeIssueColumns} = issueSlice.actions;
export default issueSlice.reducer;