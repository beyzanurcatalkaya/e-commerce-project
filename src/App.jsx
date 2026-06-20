import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CreateOrder from "./pages/CreateOrder";
import { verifyToken } from "./store/actions/clientActions";
import PreviousOrders from "./pages/PreviousOrders";
function App() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuthToken() {
      try {
        await dispatch(verifyToken());
      } catch (error) {
        // Token geçersizse verifyToken zaten localStorage ve header temizliği yapıyor.
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuthToken();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-[36px] h-[36px] border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Header />

    <Switch>
  <Route exact path="/" component={Home} />
  <Route exact path="/shop" component={Shop} />
  <Route
    path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
    component={ProductDetail}
  />
  <Route exact path="/shop/:gender/:categoryName/:categoryId" component={Shop} />
  <Route path="/cart" component={Cart} />

  <ProtectedRoute path="/checkout" component={CreateOrder} />
    <ProtectedRoute path="/orders" component={PreviousOrders} />
  <Route path="/contact" component={Contact} />
  <Route path="/team" component={Team} />
  <Route path="/about" component={About} />
  <Route path="/signup" component={Signup} />
  <Route path="/login" component={Login} />
</Switch>

      <Footer />

      <ToastContainer position="top-right" autoClose={4000} />
    </Router>
  );
}

export default App;