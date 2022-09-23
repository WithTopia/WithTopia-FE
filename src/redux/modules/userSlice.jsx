import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

//회원가입
export const userRegister = createAsyncThunk(
  "/member/signup",
  async ({email,authKey,nickname,password,passwordConfirm}) => {
    try{
      console.log("1111",email);
      const response = await axios.post(`/member/signup`, {
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
      const datas = {email:email,password:password}
      const {data,headers} = await axios.post(`/member/login`, datas)
      
      let token = headers.authorization
      let refreshToken = headers.refreshtoken
      let nickname = data.data.nickname
      
      localStorage.setItem("nickname",nickname)
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshtoken", refreshToken);
      
      // return thunkAPI.fulfillWithValue(payload);
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
      axios.delete(`/member/login`, {
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
