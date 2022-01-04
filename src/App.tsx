import React from 'react';
import Node from './components/Node';
import './App.css'

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  };
};

const range = (max: number) => Array.from(Array(max).keys())

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const grid = () => {
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
  return (
    <div className="container">
      <div className="grid">
        {
          grid().map(x => {
            return x.map(y => {
              return <Node
                key={`${y.col}-${y.row}`}
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
