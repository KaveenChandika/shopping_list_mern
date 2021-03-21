import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import ShoppingList from "./components/ShoppingList";
import ItemModel from "./components/ItemModel";
import { loadUser } from "./actions/authActions";
import { Container } from "reactstrap";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <AppNavBar />
          <Container>
            <ItemModel />
          </Container>
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
