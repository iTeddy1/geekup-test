import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DynamicBreadcrumb from "@/common/components/Breadcrumb"
import { LoadingSpinner } from "@/common/components/LoadingSpinner"
import { TableWrapper } from "@/common/components/table/TableWrapper"
import { STATUS } from "@/common/config/status"
import { Button } from "@/components/ui/button"
import {
  getAlbumsByUserIdAsync,
  selectAlbumByUserId,
} from "@/features/album/albumSlice"
import {
  getUserByIdAsync,
  selectStatus,
  selectUserById,
} from "@/features/user/userSlice"
import type { TAlbum } from "@/interfaces/Album"
import type { ColumnDef } from "@tanstack/react-table"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowLeft, Eye } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function UserDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, id as string))
  const albumsOfUser = useAppSelector(state =>
    selectAlbumByUserId(state, id as number),
  )
  const userStatus = useAppSelector(selectStatus)

  useEffect(() => {
    dispatch(getUserByIdAsync(id || ""))
  }, [dispatch, id])

  useEffect(() => {
    if (user) {
      dispatch(getAlbumsByUserIdAsync(user.id))
    }
  }, [dispatch, user])

  if (userStatus === STATUS.LOADING || !user || !albumsOfUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div>
      <DynamicBreadcrumb title="Users" />
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => navigate(-1)}
          variant={"ghost"}
          className="hover:bg-[#0000000f] flex items-center "
        >
          <ArrowLeft className=" size-4" />
        </Button>
        <p className="text-xl">Show user</p>
      </div>

      {/* Detail user render */}
      <section className="border border-[#f0f0f0] rounded-lg mt-4 bg-white">
        <div className="border border-[#f0f0f0] p-6 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex items-center">
              <span className="size-8">
                <img
                  width={50}
                  height={50}
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`}
                  alt={user.name}
                />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-medium">{user.name}</h1>
              <Link
                to={`mailto:${user.email}`}
                className="text-sm hover:text-[#69b1ff] text-[#1677ff] "
              >
                {user.email}
              </Link>
            </div>
          </div>
          <h1>Albums</h1>
          {/* Display Album of User  */}
          <AlbumTable data={albumsOfUser} />
        </div>
      </section>
    </div>
  )
}

const AlbumTable = ({ data }: { data: TAlbum[] }) => {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    enableRowSelection: true,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="">
      <TableWrapper table={table} />
    </div>
  )
}
type AlbumColumn = {
  id: number
  title: string
}

const columns: ColumnDef<AlbumColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <span className="">{row.original.id}</span>
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Link to={`/albums/${row.original.id}`}>
          <Button
            variant="outline"
            className="px-[7px] text-[#000000e0] h-6 border border-[#d9d9d9] hover:text-[#4096ff] hover:border-[#4096ff] rounded-[4px] cursor-pointer"
            size={"sm"}
          >
            <span className="size-[14px]">
              <Eye size={14} />
            </span>
            <span>Show</span>
          </Button>
        </Link>
      )
    },
  },
]
