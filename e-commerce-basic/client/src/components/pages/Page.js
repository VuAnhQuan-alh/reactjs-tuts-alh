import React from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Category from "./categories/Category";
import Create from "./createProd/Create";
import OrderDetail from "./history/Details";
import OrderHtr from "./history/OrderHtr";
import Detail from "./products/Detail";
import Products from "./products/Products";
import NotFound from "./utils/not/NotFound";

export default function Page() {
  const {
    userAPI: {
      isLogged: [isLogged],
      isAdmin: [isAdmin],
    },
  } = React.useContext(GlobalState);
  return (
    <Switch>
      <Route path="/products" exact component={Products}></Route>
      <Route path="/detail/:id" exact component={Detail}></Route>
      <Route
        path="/Category"
        exact
        component={isAdmin ? Category : NotFound}
      ></Route>
      <Route
        path="/login"
        exact
        component={isLogged ? NotFound : Login}
      ></Route>
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      ></Route>
      <Route
        path="/history"
        exact
        component={isLogged ? OrderHtr : NotFound}
      ></Route>
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetail : NotFound}
      ></Route>
      <Route
        path="/create-prod"
        exact
        component={isAdmin ? Create : NotFound}
      ></Route>
      <Route
        path="/edit-prod/:id"
        exact
        component={isAdmin ? Create : NotFound}
      ></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="*" exact component={NotFound}></Route>
    </Switch>
  );
}
