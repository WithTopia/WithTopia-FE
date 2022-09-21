import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


// const URI = {
//   BASE: process.env.REACT_APP_BASE_URI,
// };
const URL = process.env.REACT_APP_SERVER_URL


//회원가입
export const userRegister = createAsyncThunk(
  "/member/signup",
  async ({email,authKey,nickname,password,passwordConfirm}) => {
    try{
      console.log("1111",email);
      const response = await axios.post(`${URL}/member/signup`, {
        email : email,
        authKey : authKey,
        nickname : nickname,
        password : password,
        passwordConfirm : passwordConfirm,
      });
      console.log("2222",response.data);
    }catch (error) {
      console.log("3333",error);
      }
      
  }
)


export const userLogin = createAsyncThunk(
  "/member/login",
  async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
      const response = await axios.post(`${URL}/member/login`, {
        email,
        password,
      }); //email,pw를 axios로 보낸다.

      // const accessToken = response.headers.authorization;
      // const refreshToken = response.headers[`refresh-token`];

      // localStorage.setItem("accessToken", accessToken);
      // localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("email", response.payload);
      localStorage.setItem("nickname", response.payload); //payload로 안되면 data로 해보자.
      localStorage.setItem("userImgUrl", response.payload);


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
      axios.delete(`${URL}/member/login`, {
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
export const { asyncUserName, userLogout } = userSlice.actions;
export default userSlice.reducer;
