import { FC } from 'react';
import type { NodeProps } from './types'

import './Node.css'

const Node: FC<NodeProps> = ({ isStart, isFinish, id }) => {
  const startClass = isStart ? 'node-start' : '';
  const finishClass = isFinish ? 'node-end' : '';

  return <div
    id={id}
    className={`node ` + startClass + finishClass}
  />
}

export default Node;
