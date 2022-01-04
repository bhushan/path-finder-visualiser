import './Node.css'

const Node = (props: { col: number, row: number, isStart: boolean, isFinish: boolean, id: string }) => {
  const startClass = props.isStart ? 'node-start' : '';
  const finishClass = props.isFinish ? 'node-end' : '';

  return <div
    id={props.id}
    className={`node ` + startClass + finishClass}
  />
}

export default Node;
