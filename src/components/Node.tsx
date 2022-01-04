const Node = (props: { value: number }) => {
  return <div className="node">{props.value + 1}</div>
}

export default Node;
