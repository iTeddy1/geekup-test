import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRangeOfAlbums = (pageSize: number, current: number) => {
  const start = (current - 1) * pageSize
  const end = current * pageSize
  return { start, end }
}
