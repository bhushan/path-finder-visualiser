import React from 'react';
import Node from './components/Node';
import './App.css'

const NODE_SIZE = 408;

const range = (max: number) => Array.from(Array(max).keys())

const App = () => {
  return (
    <div className="container">
      <div className="grid">
        {
          range(NODE_SIZE).map(item => {
            return <Node
              key={item}
              value={item}
            />
          })
        }
      </div>
    </div>
  );
}

export default App;
