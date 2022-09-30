import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {searchSlice:""},
    reducers: {
        addSearching(state,action){
            state.searchSlice = action.payload
        }
    }
})

export const { addSearching } = searchSlice.actions
export default searchSlice.reducer;