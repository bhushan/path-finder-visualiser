import React, { useState } from 'react';
import './App.css'
import { playDijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';
import Board from './components/Board';
import type { NodeInterface } from 'types';
import { randomNumber, range } from 'helpers/utils'

import { BOARD_ROW, BOARD_COL } from 'components/Board/constants';

const createNode = (
  col: number,
  row: number,
  startNodeCol: number,
  startNodeRow: number,
  finishNodeCol: number,
  finishNodeRow: number
): NodeInterface => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    isVisited: false,
    previousNode: undefined
  };
};

const createGrid = (
  boardRow: number,
  boardCol: number,
  startNodeCol: number,
  startNodeRow: number,
  finishNodeCol: number,
  finishNodeRow: number
): NodeInterface[][] => {
  return range(boardRow).map(row => {
    return range(boardCol).map(col => {
      return createNode(col, row, startNodeCol, startNodeRow, finishNodeCol, finishNodeRow);
    });
  });
}

const App = () => {
  const [ startNodeRow, setStartNodeRowState ] = useState(randomNumber(0, BOARD_ROW));
  const [ startNodeCol, setStartNodeColState ] = useState(randomNumber(0, BOARD_COL));
  const [ finishNodeRow, setFinishNodeRowState ] = useState(randomNumber(0, BOARD_ROW));
  const [ finishNodeCol, setFinishNodeColState ] = useState(randomNumber(0, BOARD_COL));

  const initialGrid = createGrid(BOARD_ROW, BOARD_COL, startNodeCol, startNodeRow, finishNodeCol, finishNodeRow);

  const [ grid, setGridState ] = useState(initialGrid);

  const handlePlay = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];

    const visitedNodesInOrder = playDijkstra(grid, startNode, finishNode);
    if (visitedNodesInOrder) {
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  const handleReset = () => {
    console.log('reset');
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
        className="my-1 mr-1"
        onClick={handlePlay}
      >
        Play
      </button>
      <button
        className="my-1"
        onClick={handleReset}
      >
        Reset
      </button>
      <Board grid={grid} />
    </div>
  );
}

export default App;
