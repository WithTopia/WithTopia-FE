import { createSlice } from "@reduxjs/toolkit";

export const targetName = createSlice({
    name: "targetName",
    initialState: {targetName:""},
    reducers: {
        addNickName(state,action){
            state.targetName = action.payload
        }
    }
})

export const { addNickName } = targetName.actions
export default targetName.reducer;