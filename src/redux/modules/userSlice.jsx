import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URI = {
  BASE: process.env.REACT_APP_SERVER_URL,
};

// const LOGIN = "user/LOGIN";//이게뭘까 export function UserLogIn(user) {//이게뭘까
// console.log("UserLogIn");     return { type: LOGIN, user }; }

export const userLogin = createAsyncThunk(
  "/member/login",
  async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
      const datas = {email:email,password:password}
      fetch(`${URI.BASE}/member/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(datas)
      })
      .then(response=>{
        let token = response.headers.get("authorization")
        let refreshToken = response.headers.get("refreshtoken")
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshtoken", refreshToken);
        const resp = response.json()
      })
      
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {
    asyncUserName: (state, action) => {
      state.nickname = localStorage.getItem("nickname");
    },
    userLogout: (state, action) => {
      const userToken = localStorage.getItem("accessToken");
      axios.delete(`${URI.BASE}/member/login`, {
        headers: {
          Authorization: userToken,
        },
      });
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = true;
      state.userName = action.payload;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// export const { asyncUserName, userLogout } = userSlice.actions;
export default userSlice.reducer;
