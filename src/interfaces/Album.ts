export type TAlbum = {
  id: number
  title: string
  userId: number
}

export type TPhoto = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
