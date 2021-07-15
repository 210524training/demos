import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../models/user";
import { sendLogin } from "../../remote/grubdash-backend/grubdash.api";
import { RootState } from "../store";
import { AxiosError } from 'axios';
import { Auth } from 'aws-amplify';

export type UserState = User | null;

export type LoginCredentials = {
  username: string;
  password: string;
}

export function isAxiosError(error: any): error is AxiosError {
  return "isAxiosError" in error;
}

export const loginAsync = createAsyncThunk<User, LoginCredentials>(
  'user/login/async',
  async ({username, password}, thunkAPI) => {

    try {
      const user = await Auth.signIn(username, password)
        .then((cognitoUser: any) => {
          console.log(cognitoUser);

          return {
            username: cognitoUser.username,
            password: cognitoUser.password
          } as User
        });

        return user;
    } catch(error) {
      // console.log(`error is an AxiosError: ${isAxiosError(error)}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // return null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;