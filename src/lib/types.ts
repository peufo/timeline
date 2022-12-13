export type TimelineEventEditable = {
  title: string
  time: string
  detail?: string
  subEvents?: TimelineEventEditable[]
}

export type TimeLineEvent = TimelineEventEditable & {
  time: string | number | Date
}
