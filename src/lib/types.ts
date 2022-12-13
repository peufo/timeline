export type TimeLineEvent = {
  title: string
  time?: string
  date?: Date
  detail?: string
  subEvents?: TimeLineEvent[]
}
