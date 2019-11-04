import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/organisms/Navbar/Navbar';
import Preferences from './components/views/Preferences/Preferences';

const App: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app" />} />
          <Route path="/app" component={Navbar} />
          <Route path="/preferences" component={Preferences} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
