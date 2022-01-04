import { FC } from 'react';
import type { NodeProps } from './types'

import './Node.css'

const Node: FC<NodeProps> = ({ id, classes }) => {
  return <div
    id={id}
    className={classes}
  />
}

export default Node;
