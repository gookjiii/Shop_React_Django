import './App.css';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Contact from './pages/contact/Contact';
import Delivery from './pages/delivery/Delivery';
import ProductPage from './pages/productPage/ProductPage';
import DetailedCategory from './pages/detailedCategory/DetailedCategory';
import Page404 from './pages/page404/Page404';

import { BrowserRouter as HashRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/clothes/:category/:productId" element={<ProductPage />} />
          <Route path="/:category/:productId" element={<ProductPage />} />
          <Route path="/clothes/:category" element={<DetailedCategory />} />
          <Route path="/:category" element={<DetailedCategory />} />
          <Route path="/404" element={<Page404 />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
// This will give you experience, because those are more challenging than real jobs
// Only the main branch will be deployed to the server. if you merge changes usually it's on the main branch so it goes to production directly
// He will setup the ci/cd and server
// Nginx is a http server/proxy
// You backend guy can be devops
// but nginx are on the server
// It all depends on you

// When react started, react router wasn't this good. People made it better.
// When you make changes, you don't make them in the main branch, it's a different branch and people will check your changes before committing hem
// When you bargain you start high, then lowers it
// If you friend have said 20 the owner would still accept it
// So you say something high and see the owners reaction.
// Shopping card
// why would you use product name in the url????
// In the url, don't work with names, just work with id

// if you know that all products will have something like:
// clothes/category/productId
export default App;

