import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { getAllUsers, getUserById, getUsersByIds } from "./userAPI"
import type { TUser } from "@/interfaces/User"
import { STATUS } from "@/common/config/status"

export type UserSliceState = {
  users: TUser[]
  selectedUserById: Record<number, TUser>
  status: typeof STATUS.IDLE | typeof STATUS.LOADING | typeof STATUS.FAILED
}

const initialState: UserSliceState = {
  users: [],
  selectedUserById: {},
  status: STATUS.IDLE,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsersAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.users = action.payload as TUser[]
      })
      .addCase(getAllUsersAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
      .addCase(getUserByIdAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.selectedUserById[action.payload.id] = action.payload as TUser
      })
      .addCase(getUserByIdAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
      .addCase(getUsersByIdsAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getUsersByIdsAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.users = action.payload as TUser[]
      })
      .addCase(getUsersByIdsAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
  },
  selectors: {
    selectAllUsers: user => user.users,
    selectUserById: (user, userId: number) => user.selectedUserById[userId],
    selectStatus: user => user.status,
  },
})

const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsersAsync",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllUsers()
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const getUserByIdAsync = createAsyncThunk(
  "user/getUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await getUserById(id)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const getUsersByIdsAsync = createAsyncThunk(
  "user/getUsersByIds",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const res = await getUsersByIds(ids)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export { getAllUsersAsync, getUserByIdAsync, getUsersByIdsAsync }

// Action creators are generated for each case reducer function.
// export const { decrement, increment, incrementByAmount, incrementAsync } =
// userSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAllUsers, selectStatus, selectUserById } =
  userSlice.selectors
