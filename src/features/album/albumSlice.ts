import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { TAlbum, TPhoto } from "@/interfaces/Album"
import {
  getAlbumById,
  getAlbumsByUserId,
  getAllAlbums,
  getPhotosByAlbumId,
} from "./albumAPI"
import { STATUS } from "@/common/config/status"

export type AlbumSliceState = {
  albums: TAlbum[]
  selectedAlbumByUserId: Record<string, TAlbum[]>
  selectedAlbumById: Record<string, TAlbum>
  selectedPhotosByAlbumId: Record<string, TPhoto[]>
  total: number
  status: typeof STATUS.IDLE | typeof STATUS.LOADING | typeof STATUS.FAILED
}

const initialState: AlbumSliceState = {
  albums: [],
  selectedAlbumByUserId: {},
  selectedAlbumById: {},
  selectedPhotosByAlbumId: {},
  total: 0,
  status: STATUS.IDLE,
}

export const albumSlice = createAppSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllAlbumsAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getAllAlbumsAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.albums = action.payload.data
        state.total = action.payload.total
      })
      .addCase(getAllAlbumsAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
      .addCase(getAlbumsByUserIdAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getAlbumsByUserIdAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.selectedAlbumByUserId[action.meta.arg] = action.payload
      })
      .addCase(getAlbumsByUserIdAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
      .addCase(getAlbumByIdAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getAlbumByIdAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.selectedAlbumById[action.meta.arg] = action.payload
      })
      .addCase(getAlbumByIdAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
      .addCase(getPhotosByAlbumIdAsync.pending, state => {
        state.status = STATUS.LOADING
      })
      .addCase(getPhotosByAlbumIdAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.selectedPhotosByAlbumId[action.meta.arg] = action.payload
      })
      .addCase(getPhotosByAlbumIdAsync.rejected, state => {
        state.status = STATUS.FAILED
      })
  },
  selectors: {
    selectAllAlbums: album => album.albums,
    selectAlbumByUserId: (album, userId: number) =>
      album.selectedAlbumByUserId[userId],
    selectAlbumById: (album, albumId: number) =>
      album.selectedAlbumById[albumId],
    selectPhotosByAlbumId: (album, albumId: number) =>
      album.selectedPhotosByAlbumId[albumId],
    selectTotalAlbumSize: album => album.total,
    selectStatus: album => album.status,
  },
})

const getAllAlbumsAsync = createAsyncThunk(
  "album/getAllAlbumsAsync",
  async (
    { pageSize, current }: { pageSize: number; current: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await getAllAlbums(pageSize, current)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const getAlbumByIdAsync = createAsyncThunk(
  "album/getAlbumById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getAlbumById(id)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
const getPhotosByAlbumIdAsync = createAsyncThunk(
  "album/getPhotosByAlbumId",
  async (albumId: string, { rejectWithValue }) => {
    try {
      const res = await getPhotosByAlbumId(albumId)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const getAlbumsByUserIdAsync = createAsyncThunk(
  "album/getAlbumsByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await getAlbumsByUserId(userId)
      return res
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export {
  getAllAlbumsAsync,
  getAlbumByIdAsync,
  getPhotosByAlbumIdAsync,
  getAlbumsByUserIdAsync,
}

export const {
  selectAllAlbums,
  selectAlbumById,
  selectPhotosByAlbumId,
  selectStatus,
  selectTotalAlbumSize,
  selectAlbumByUserId,
} = albumSlice.selectors
