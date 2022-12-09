export type TimelineEventEditable = {
  title: string
  detail?: string
  time: string
}

export type TimeLineEvent = TimelineEventEditable & {
  time: string | number | Date
}

export type Control = {
  colorPoint: string
  colorLine: string
  hasNext: boolean
}
