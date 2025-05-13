import { getRangeOfAlbums } from "@/lib/utils"
import { API } from "@/service/axios"

export const getAllAlbums = async (pageSize: number, current: number) => {
  const { start, end } = getRangeOfAlbums(pageSize, current)
  const res = await API.get(`/albums?_start=${start}&_end=${end}`, {
    headers: {
      Accept: "application/json",
    },
  })

  const total = Number(res.headers["x-total-count"])
  console.log("total", total)
  return {
    data: res.data,
    total,
  }
}
export const getAlbumById = async (id: string) => {
  const res = await API.get(`/albums/${id}`)
  return res.data
}

export const getAlbumsByUserId = async (id: string) => {
  const res = await API.get(`/albums/?userId=${id}`)
  return res.data
}

export const getPhotosByAlbumId = async (albumId: string) => {
  const res = await API.get(`/photos/?_end=10&_start=0&album${albumId}`)
  return res.data
}
