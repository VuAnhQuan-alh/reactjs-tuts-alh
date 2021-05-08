import React from 'react';
import { Data } from './components/Data';
import Footer from './components/Footer';
import FormInput from './components/FormInput';
import List from './components/List';

function App() {
  return (
    <Data>
      <div className="App">
        <h1>To Do List</h1>
        <FormInput />
        <List />
        <Footer />
      </div>
    </Data>
  );
}

export default App;
