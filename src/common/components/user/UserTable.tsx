import type { ColumnDef } from "@tanstack/react-table"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { TableWrapper } from "../table/TableWrapper"
import type { TUser } from "@/interfaces/User"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

type TableProps = {
  data: TUser[]
  pageSize: number
  current: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <span className="">{row.original.id}</span>
    },
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <span className="size-8">
          <img
            width={30}
            height={30}
            src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${row.original.name}`}
            alt={row.original.name}
          />
        </span>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <p className="flex items-center gap-2 ">{row.original.name}</p>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <Link
          to={`mailto:${row.original.email}`}
          className="flex items-center gap-2 hover:text-[#69b1ff] text-[#1677ff]"
        >
          <span>{row.original.email}</span>
        </Link>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <Link
          to={`tel:${row.original.phone}`}
          className="flex items-center gap-2 hover:text-[#69b1ff] text-[#1677ff]"
        >
          <span>{row.original.phone}</span>
        </Link>
      )
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          to={`https://${row.original.website}`}
          className="flex items-center gap-2 hover:text-[#69b1ff] text-[#1677ff]"
        >
          <span>{row.original.website}</span>
        </Link>
      )
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link to={`/users/${row.original.id}`}>
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

export default function UserTable({ data }: TableProps) {
  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <TableWrapper table={table} />
    </>
  )
}
