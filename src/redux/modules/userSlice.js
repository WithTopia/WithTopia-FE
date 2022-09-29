import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      console.log("2222",response.data.data);
      console.log(response)
      alert("회원가입에 성공했습니다 :)")
    }catch (error) {
      console.log("3333",error);
      alert(error.response.data.errormessage)
    }
    console.log("4444",email);
  }
)

export const userLogin = createAsyncThunk(
  "/member/login",
  async (payload, thunkAPI ) => {
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
      window.location.href = "/main"
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log(error)
      if(error.response.data.errormessage === "로그인에 실패했습니다."){
        alert("로그인에 실패했습니다.")
      }
      if(error.response.data.errormessage === "사용자가 존재하지않습니다."){
        alert("사용자가 존재하지않습니다.")
      }
      if(error.message === "Request failed with status code 500"){
        alert("회원정보가 없습니다. 회원가입 후 다시 시도해주세요")
      }
      if(error.response.data.errormessage === "삭제된 회원입니다."){
        alert(error.response.data.errormessage)
      }
      // return thunkAPI.rejectWithValue(error);
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
