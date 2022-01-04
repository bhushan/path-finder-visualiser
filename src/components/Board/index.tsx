import { FC } from 'react';
import Node from 'components/Node';

import type { NodeInterface } from 'App';
import type { BoardProps } from 'components/Board/types';

const Board: FC<BoardProps> = ({ grid }) => {

  return <div className="grid">
    {
      grid.map((x: NodeInterface[]) => {
        return x.map((y: NodeInterface) => {
          return <Node
            key={`node-${y.col}-${y.row}`}
            id={`node-${y.col}-${y.row}`}
            col={y.col}
            row={y.row}
            isStart={y.isStart}
            isFinish={y.isFinish}
          />;
        })
      })
    }
  </div>
}

export default Board;
