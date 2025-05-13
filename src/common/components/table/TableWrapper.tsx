import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Table as TableType } from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { LoadingSpinner } from "../LoadingSpinner"

type TableProps = {
  table: TableType<any>
}

export function TableWrapper({ table }: TableProps) {
  return (
    <Table className="bg-white rounded-lg ">
      <TableHeader className="bg-[#FAFAFA] ">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            className="p-4 border-[#f0f0f0] border-b"
            key={headerGroup.id}
          >
            {headerGroup.headers.map(header => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    className={`${
                      header.column.getIsResizing() ? "animate-pulse" : ""
                    } flex items-center gap-2 p-4 `}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsResizing() && <LoadingSpinner />}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className="min-h-16 border-b border-[#f0f0f0] hover:bg-[#FAFAFA] transition-colors duration-200"
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="p-4 min-h-8">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-24 text-center">No results.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
