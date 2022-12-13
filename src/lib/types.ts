export type TimelineEvent = {
  title: string
  time?: string
  date?: Date
  detail?: string
  subEvents?: TimelineEvent[]
}
