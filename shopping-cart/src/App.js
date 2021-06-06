import React from 'react';
import Header from './components/Header';
import Shop from './components/Shop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataProvider from './components/DataProvider';
import Details from './components/Details';
import Cart from './components/Cart';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Header />

          <section>
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<Details />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </section>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
