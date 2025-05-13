import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { LoadingSpinner } from "@/common/components/LoadingSpinner"
import UserTable from "@/common/components/user/UserTable"
import { STATUS } from "@/common/config/status"
import {
  getAllUsersAsync,
  selectAllUsers,
  selectStatus,
} from "@/features/user/userSlice"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function UserPage() {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)
  const status = useAppSelector(selectStatus)
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 20,
  )
  const [current, setCurrent] = useState(
    searchParams.get("current") ? Number(searchParams.get("current")) : 1,
  )

  useEffect(() => {
    dispatch(getAllUsersAsync())
  }, [dispatch])

  if (status === STATUS.LOADING)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  return (
    <>
      <UserTable
        data={users}
        pageSize={pageSize}
        current={current}
        onPageChange={setCurrent}
        onPageSizeChange={setPageSize}
      />
    </>
  )
}
