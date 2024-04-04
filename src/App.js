import React from 'react';
import BrowseView from './BrowseView';
import CartView from './CartView.js';
import ConfirmationView from './ConfirmationView';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'browse',
      cart: [],
      userInfo: {},
    };
  }

  changeView = (view, userInfo) => {
    if (view === 'browse') {
      this.setState({ view, cart: [], userInfo: {} });
    } else {
      this.setState({ view, userInfo });
    }
  };

  addToCart = (item) => {
    const newItem = { ...item, quantity: 1 }; 
    this.setState((prevState) => ({
      cart: [...prevState.cart, newItem],
    }));
  };

  navigateToCart = () => {
    this.setState({ view: 'cart' });
  };

  render() {
    const { view, cart, userInfo } = this.state;

    return (
      <div className="App">
        {view === 'browse' && <BrowseView addToCart={this.addToCart} navigateToCart={this.navigateToCart} />}
        {view === 'cart' && <CartView cart={cart} changeView={this.changeView} />}
        {view === 'confirmation' && <ConfirmationView userInfo={userInfo} changeView={this.changeView}/>}
      </div>
    );
  }
}

export default App;