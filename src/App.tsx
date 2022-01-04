import React, { useState } from 'react';
import './App.css'
import { playDijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import Board from './components/Board';

import { range } from 'helpers/utils'

import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  BOARD_ROW,
  BOARD_COL
} from 'components/Board/constants';

export interface NodeInterface {
  col: number
  row: number
  isStart: boolean
  isFinish: boolean
  distance: number
  isVisited: boolean
  previousNode: NodeInterface | undefined,
}

const createNode = (col: number, row: number): NodeInterface => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: undefined
  };
};

const createGrid = (): NodeInterface[][] => {
  return range(BOARD_ROW).map(row => {
    return range(BOARD_COL).map(col => {
      return createNode(col, row);
    });
  });
}
const App = () => {
  const initialGrid = createGrid();

  const [ grid ] = useState(initialGrid);

  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const handlePlay = () => {
    const visitedNodesInOrder = playDijkstra(grid)
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  const animateDijkstra = (visitedNodesInOrder: NodeInterface[], nodesInShortestPathOrder: NodeInterface[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node) {
          // @ts-ignore
          document.getElementById(`node-${node.col}-${node.row}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder: NodeInterface[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node) {
          // @ts-ignore
          document.getElementById(`node-${node.col}-${node.row}`).className =
            'node node-shortest-path';
        }
      }, 50 * i);
    }
  }

  return (
    <div className="container">
      <button
        className="my-1"
        onClick={handlePlay}
      >
        Play
      </button>
      <Board grid={grid} />
    </div>
  );
}

export default App;
