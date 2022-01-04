export interface NodeInterface {
  col: number
  row: number
  classes?: string
  isStart: boolean
  isFinish: boolean
  distance: number
  isVisited: boolean
  previousNode: NodeInterface | undefined,
}
