import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  isLogin: false,
  email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload
      state.isLogin = true
    },
    removeUser: (state, action) => {
        state.data = {}
        state.isLogin = false
    },
    addEmailForOTP: (state, action) => {
        state.email = action.payload
    },
    removeEmailForOTP: (state, action) => {
        state.email = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, addEmailForOTP, removeEmailForOTP} = userSlice.actions

export default userSlice.reducer