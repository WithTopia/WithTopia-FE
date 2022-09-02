import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./modules/userSlice";
import thunk from "redux-thunk";



const middlewares = [thunk];

// 리듀서 통합
const rootReducer = combineReducers({
    userSlice,
});
// 스토어 연결
const store = configureStore({
    reducer: rootReducer,

    middlewart: [...middlewares],
});;

export default store;