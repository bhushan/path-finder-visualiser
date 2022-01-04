import { FC } from 'react';
import Node from 'components/Node';

import type { NodeInterface } from 'types';
import type { BoardProps } from 'components/Board/types';

const Board: FC<BoardProps> = ({ grid }) => {

  return <div className="grid">
    {
      grid.map((x: NodeInterface[]) => {
        return x.map((y: NodeInterface) => {
          const startClass = y.isStart ? 'node-start' : '';
          const finishClass = y.isFinish ? 'node-end' : '';
          const classes = `node ${startClass} ${finishClass}`;

          return <Node
            key={`node-${y.col}-${y.row}`}
            id={`node-${y.col}-${y.row}`}
            col={y.col}
            row={y.row}
            classes={classes}
          />;
        })
      })
    }
  </div>
}

export default Board;
