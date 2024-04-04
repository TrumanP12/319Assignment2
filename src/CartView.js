import React from 'react';

class CartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      cardNumber: '',
      city: '',
      state: '',
      zip: ''
    };
  }

  handleContinueShopping = () => {
    this.props.changeView('browse');
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  calculateTotalCost = () => {
    const { cart } = this.props;
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  calculateItemsBought = () => {
    const { cart } = this.props;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { cart, changeView } = this.props;
    const { fullName, email, phoneNumber, address, cardNumber } = this.state;
    const totalCost = this.calculateTotalCost();
    const itemsBought = this.calculateItemsBought();
  
    changeView('confirmation', {
      fullName,
      email,
      phoneNumber,
      address,
      cardNumber: 'XXXX-XXXX-XXXX-' + cardNumber.slice(-4), // Redact card number except the last 4 digits
      totalCost,
      itemsBought,
      cart: cart.map(item => ({ ...item, total: (item.price * item.quantity).toFixed(2) })) // Add total cost for each item
    });
  };

  render() {
    const { cart } = this.props;
    const totalCost = this.calculateTotalCost();

    const uniqueCartItems = cart.reduce((uniqueItems, currentItem) => {
      const existingItemIndex = uniqueItems.findIndex(item => item.name === currentItem.name);
      if (existingItemIndex !== -1) {
        uniqueItems[existingItemIndex].quantity += currentItem.quantity;
      } else {
        uniqueItems.push({ ...currentItem });
      }
      return uniqueItems;
    }, []);

    return (
      <div>
        <h2>Cart</h2>
        <div className="cart-items">
          {uniqueCartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - Quantity: {item.quantity} - Price per item: ${item.price.toFixed(2)} - Cost: ${item.total}</p>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '200px', height: '200px' }} 
              />
            </div>
          ))}
        </div>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <form onSubmit={this.handleSubmit}>
          <h3>Payment Information</h3>
          <input type="text" name="fullName" placeholder="Full Name" value={this.state.fullName} onChange={this.handleInputChange} required /><br />
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required /><br />
          <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleInputChange} required /><br />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleInputChange} required /><br />
          <input type="text" name="cardNumber" placeholder="Card Number" value={this.state.cardNumber} onChange={this.handleInputChange} required /><br />
          <input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleInputChange} required /><br />
          <input type="text" name="state" placeholder="State" value={this.state.state} onChange={this.handleInputChange} required /><br />
          <input type="text" name="zip" placeholder="Zip" value={this.state.zip} onChange={this.handleInputChange} required /><br />
          <button type="submit">Submit Payment</button>
        </form>
        <button onClick={this.handleContinueShopping}>Continue Shopping</button>
      </div>
    );
  }
}

export default CartView;