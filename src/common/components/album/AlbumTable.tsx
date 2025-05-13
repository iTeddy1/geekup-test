import type { ColumnDef } from "@tanstack/react-table"
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { TableWrapper } from "../table/TableWrapper"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { TAlbum } from "@/interfaces/Album"
import type { TUser } from "@/interfaces/User"
import { TablePagination } from "../Paginition"

import { useAppSelector } from "@/app/hooks"
import { selectTotalAlbumSize } from "@/features/album/albumSlice"
import SelectTableSize from "../SelectTableSize"

type AlbumColumn = {
  id: number
  title: string
  userId: number
}

type TableProps = {
  data: TAlbum[]
  users: Record<number, TUser> | null
  pageSize: number
  current: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export default function AlbumTable({
  data,
  users,
  pageSize,
  current,
  onPageChange,
  onPageSizeChange,
}: TableProps) {
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
      accessorKey: "userId",
      header: "User",
      cell: ({ row }) => {
        const user = users?.[row.original.userId]
        return (
          <Link
            to={`/users/${user?.id}`}
            className="flex items-center gap-2 hover:text-[#69b1ff] text-[#1677ff]"
          >
            <span className="size-8">
              <img
                src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user?.name}`}
                alt={user?.name}
              />
            </span>
            <span>{user?.name}</span>
          </Link>
        )
      },
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
  const totalAlbums = useAppSelector(selectTotalAlbumSize)

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalAlbums / pageSize),
  })

  const [, setSearchParams] = useSearchParams()

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value)
    onPageSizeChange(newPageSize)
    setSearchParams({ current: String(current), pageSize: value })
  }

  return (
    <>
      <TableWrapper table={table} />

      <div className="relative flex justify-end gap-4">
        <TablePagination
          currentPage={current}
          pageSize={pageSize}
          total={totalAlbums}
          onPageChange={(page: number) => {
            onPageChange(page)
            setSearchParams({
              current: String(page),
              pageSize: String(pageSize),
            })
          }}
        />
        <SelectTableSize onPageSizeChange={handlePageSizeChange} />
      </div>
    </>
  )
}
