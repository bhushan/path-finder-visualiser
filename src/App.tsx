import React, { useState } from 'react';
import Node from './components/Node';
import './App.css'
import { playDijkstra, getNodesInShortestPathOrder } from './algorithms/dijkstra';

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

const range = (max: number) => Array.from(Array(max).keys())

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export interface NodeInterface {
  col: number
  row: number
  isStart: boolean
  isFinish: boolean
  distance: number
  isVisited: boolean
  previousNode: NodeInterface | undefined,
}

const createGrid = (): NodeInterface[][] => {
  return range(BOARD_ROW).map(row => {
    return range(BOARD_COL).map(col => {
      return createNode(col, row);
    });
  });
}

const BOARD_COL = 41;
const BOARD_ROW = 28;

const START_NODE_COL = randomNumber(0, BOARD_COL);
const START_NODE_ROW = randomNumber(0, BOARD_ROW);

const FINISH_NODE_COL = randomNumber(0, BOARD_COL);
const FINISH_NODE_ROW = randomNumber(0, BOARD_ROW);

const App = () => {
  const initialGridState = createGrid();
  const [ grid ] = useState(initialGridState);

  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const handlePlay = () => {
    const visitedNodesInOrder = playDijkstra(grid, startNode, finishNode)
    console.log(visitedNodesInOrder)
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
          console.log(document.getElementById(`node-${node.col}-${node.row}`))
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
      <div className="grid">
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
    </div>
  );
}

export default App;
