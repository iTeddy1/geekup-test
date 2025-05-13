import { API } from "@/service/axios"

export const getAllUsers = async () => {
  const res = await API.get("/users")
  return res.data
}

export const getUserById = async (id: number) => {
  const res = await API.get(`/users/${id}`)
  return res.data
}

export const getUsersByIds = async (ids: number[]) => {
  if (ids.length === 0) return []
  const idsQuery = ids.map(id => `id=${id}`).join("&")
  const res = await API.get(`/users?${idsQuery}`)
  return res.data
}
