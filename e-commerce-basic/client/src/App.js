import React from 'react';
import Header from './components/headers/Header';
import { DataProvider } from './GlobalState';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './components/pages/Page';


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Page />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
