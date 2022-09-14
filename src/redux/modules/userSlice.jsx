import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const URI = {
  BASE: process.env.REACT_APP_SERVER_URL2,
};

// const LOGIN = "user/LOGIN";//이게뭘까 export function UserLogIn(user) {//이게뭘까
// console.log("UserLogIn");     return { type: LOGIN, user }; }

export const userLogin = createAsyncThunk(
  "/member/login",
  async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
console.log("US-1", payload);
      const response = await axios.post(`${URI.BASE}/member/login`, {
        email,
        password,
      }); //email,pw를 axios로 보낸다.
console.log("US-2", payload);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers[`refresh-token`];

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("email", response.payload);
      localStorage.setItem("nickname", response.payload); //payload로 안되면 data로 해보자.
      localStorage.setItem("userImgUrl", response.payload);
console.log("US-3", payload);

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
