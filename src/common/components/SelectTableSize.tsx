import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SELECT_PAGE_SIZE_OPTIONS } from "../config/table"

type SelectTableSizeProps = {
  onPageSizeChange: (pageSize: string) => void
}

export default function SelectTableSize({
  onPageSizeChange,
}: SelectTableSizeProps) {
  return (
    <Select onValueChange={onPageSizeChange}>
      <SelectTrigger className="top-0">
        <SelectValue placeholder="10 / page" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {SELECT_PAGE_SIZE_OPTIONS.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
