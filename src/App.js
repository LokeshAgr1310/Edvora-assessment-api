import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './components/Orders';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <div className='w-full'>

        <Router>
          <header className="sticky z-30 top-0">
            <Header />
          </header>

          <Routes>

            <Route exact path='/products' element={<Products />} />
            <Route exact path='/orders' element={<Orders />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
