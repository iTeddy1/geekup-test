import { useAppDispatch, useAppSelector } from "@/app/hooks"
import AlbumTable from "@/common/components/album/AlbumTable"
import { LoadingSpinner } from "@/common/components/LoadingSpinner"
import { STATUS } from "@/common/config/status"
import {
  getAllAlbumsAsync,
  selectAllAlbums,
  selectStatus,
} from "@/features/album/albumSlice"
import { getUsersByIdsAsync, selectAllUsers } from "@/features/user/userSlice"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function AlbumPage() {
  const [searchParams] = useSearchParams()

  const dispatch = useAppDispatch()
  const albums = useAppSelector(selectAllAlbums)
  const status = useAppSelector(selectStatus)
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 20,
  )
  const [current, setCurrent] = useState(
    searchParams.get("current") ? Number(searchParams.get("current")) : 1,
  )
  const usersGetByIds = useAppSelector(selectAllUsers)
  const usersMap = useMemo(() => {
    const userIds = [...new Set(albums.map(a => a.userId))]
    const filteredUsers = usersGetByIds.filter(user =>
      userIds.includes(user.id),
    )
    return Object.fromEntries(filteredUsers.map(u => [u.id, u]))
  }, [usersGetByIds, albums])

  useEffect(() => {
    if (albums.length > 0) {
      const userIds = [...new Set(albums.map(a => a.userId))]
      dispatch(getUsersByIdsAsync(userIds))
    }
  }, [dispatch, albums])

  useEffect(() => {
    dispatch(getAllAlbumsAsync({ current, pageSize }))
  }, [dispatch, current, pageSize])

  if (status === STATUS.LOADING)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )

  return (
    <>
      <AlbumTable
        data={albums}
        users={usersMap}
        pageSize={pageSize}
        current={current}
        onPageChange={setCurrent}
        onPageSizeChange={setPageSize}
      />
    </>
  )
}
