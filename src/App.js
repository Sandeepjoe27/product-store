import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Product from './components/Product';
import Account from './components/Account';
import Wishlist from './components/wishlist';
import Signup from './components/Signup';
import Additems from './components/Additems';
import Update from './components/Update';
import './App.css';

function Navigation() {
  const location = useLocation(); // Get the current route

  // Define routes where you don't want the navigation bar (like login and signup)
  const hideNavbarRoutes = ["/account", "/signup"];

  // Conditionally render the navigation links if the path is not in hideNavbarRoutes
  if (!hideNavbarRoutes.includes(location.pathname)) {
    return (
      <table className='dash'>
        <tbody>
          <thead>
            <td>
              <Link to='/'>Home</Link>
            </td>
            <td>
              <Link to='/product'>Product</Link>
            </td>
            <td>
              <Link to='/wishlist'>Wishlist</Link>
            </td>
            <td>
              <Link to='/account'>Account</Link>
            </td>
          </thead>
        </tbody>
      </table>
    );
  }

  return null; // Do not render anything if path is in hideNavbarRoutes
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation /> {/* The navigation bar component */}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/additem" element={<Additems />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
