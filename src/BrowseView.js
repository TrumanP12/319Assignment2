import React from 'react';
import itemsData from './items.json';

class BrowseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: itemsData,
      searchText: '',
      cartQuantities: {}, 
    };
  }

  handleSearchChange = (event) => { // Placeholder
    this.setState({ searchText: event.target.value });
  };

  handleAddToCart = (item) => {
    const { cartQuantities } = this.state;
    const itemId = item.id;

    const updatedCartQuantities = {
      ...cartQuantities,
      [itemId]: (cartQuantities[itemId] || 0) + 1,
    };

    this.setState({ cartQuantities: updatedCartQuantities });
    this.props.addToCart(item);
  };

  handleRemoveFromCart = (item) => {
    const { cartQuantities } = this.state;
    const itemId = item.id;

    const updatedCartQuantities = {
      ...cartQuantities,
      [itemId]: Math.max((cartQuantities[itemId] || 0) - 1, 0),
    };

    this.setState({ cartQuantities: updatedCartQuantities });
  };

  handleCheckout = () => {
    this.props.navigateToCart();
  };

  render() {
    const { items, searchText, cartQuantities } = this.state;

    const filteredItems = items.filter( // throws some error, Needs fixed
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div>
        <h2>Browse Items</h2>
        <input
          type="text"
          placeholder="Search items..."
          value={searchText}
          onChange={this.handleSearchChange}
        />
        <div className="item-list">
          {filteredItems.map((item) => (
            <div key={item.id} className="item-card">
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '200px', height: '200px' }} 
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
              <div>
                <button onClick={() => this.handleAddToCart(item)}>+</button>
                <span>{cartQuantities[item.id] || 0}</span>
                <button onClick={() => this.handleRemoveFromCart(item)}>-</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={this.handleCheckout}>Checkout</button>
      </div>
    );
  }
}

export default BrowseView;