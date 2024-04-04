import React from 'react';

class ConfirmationView extends React.Component {
  handleBackToBrowse = () => {
    this.props.changeView('browse');
  };

  render() {
    const { userInfo } = this.props;
    const { fullName, email, phoneNumber, cardNumber, address, totalCost, itemsBought, cart } = userInfo || {};
    const formattedTotalCost = totalCost ? totalCost.toFixed(2) : 0; 

    const redactCreditCard = (cardNumber) => {
      return "XXXX-XXXX-XXXX-" + cardNumber.slice(-4); 
    };

    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Thank you {fullName} for your purchase!</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {address}</p>
        <p>Credit Card: {redactCreditCard(cardNumber)}</p>
        <p>Total Cost: ${formattedTotalCost}</p>
        <h3>Purchased Items:</h3>
        <div>
          {cart.map((item) => (
            <div key={item.id} className="purchased-item">
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <p>{item.name} - Price per item: ${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <button onClick={this.handleBackToBrowse}>Back to Browse</button>
      </div>
    );
  }
}

export default ConfirmationView;