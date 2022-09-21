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
      const {data,headers} = await axios.post(`${URI.BASE}/member/login`, datas)
      
      let token = headers.authorization
      let refreshToken = headers.refreshtoken
      let nickname = data.nickname
      
      localStorage.setItem("nickname",nickname)
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshtoken", refreshToken);
      
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
