import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../type";
import { UserQueryParams } from "../services/api";


interface UserState {
  user: UserProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: [],
  isLoading: false,
  error: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        fetchUserRequested(state, action: PayloadAction<UserQueryParams | undefined>) {
            state.isLoading = true
            state.error = null
        },
        fetchUserSucceeded(state, action: PayloadAction<UserProps[]>) {
            state.user = action.payload
            state.isLoading = false
            state.error = null
        },
        fetchUserFailed(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = "Failed to fetch user"
        },
    }
});


export const { fetchUserRequested, fetchUserSucceeded, fetchUserFailed } = userSlice.actions;
export default userSlice.reducer;
