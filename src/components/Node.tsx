import './Node.css'

const Node = (props: { col: number, row: number, isStart: boolean, isFinish: boolean }) => {
  const startClass = props.isStart ? 'node-start' : '';
  const finishClass = props.isFinish ? 'node-end' : '';

  return <div className={`node ` + startClass + finishClass} />
}

export default Node;
