import React from 'react';
import Button from './components/atoms/Button/Button';

const App: React.FC = () => {
  let x: boolean = true;

  x = false;

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App preparation</h1>
        <Button></Button>
      </header>
    </div>
  );
};

export default App;
