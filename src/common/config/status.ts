export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  FAILED: "failed",
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]
