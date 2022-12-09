export type TimelineEventEditable = {
  title: string
  detail?: string
  time: string
}

export type TimeLineEvent = TimelineEventEditable & {
  time: string | number | Date
}
