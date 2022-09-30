import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {searchSlice:""},
    reducers: {
        addSearching(state,action){
            state.searchSlice = action.payload
        },
    }
})

export const { addSearching ,searchData } = searchSlice.actions
export default searchSlice.reducer;