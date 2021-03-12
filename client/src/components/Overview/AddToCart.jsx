import React, { useState, useEffect} from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';

const AddToCart = ({ styles, style }) => {

  const [size, setSize] = useState('Select Size');
  const [quantity, setQuantity] = useState('Select Quantity');
  const [quantityInd, setQuantityInd] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);

  const quantityHandler = (e) => {
    setQuantity($(e.target).attr('data-ind'));
  };


  const sizeHandler = (e) => {
    setSize($(e.target).attr('value'));
    setButtonDisabled(false);
    setQuantityInd(Number($(e.target).attr('data-ind')));
    setQuantity(1);
    setAddToCartDisabled(false);
  };

  const addToLocalCart = (e) => {
    var cartItem = {
      style: styles[style].name,
      sku: sizes[quantityInd][2],
      size: size,
      quantity: quantity,
      time: Date(),
    };

    let yourCart = [];
    if (JSON.parse(localStorage.getItem('yourCart'))) {
      yourCart = JSON.parse(localStorage.getItem('yourCart'));
    }
    yourCart.push(cartItem);
    localStorage.setItem('yourCart', JSON.stringify(yourCart));
    console.log(localStorage.getItem('yourCart'));
  };

  // filled in star &#9733;
  if (styles[style]) {
    var skus = styles[style].skus;
    var sizes = [];
    var tuple;

    for (let k in skus) {
      tuple = [];
      if (skus[k].quantity === 0) {
        tuple.push('Out of Stock');
      } else {
        tuple.push(skus[k].size)
      }
      tuple.push(skus[k].quantity, k);
      sizes.push(tuple);
    }
    var quantityDropDownItems = [];

    for (let i = 0; i < 15 && i < sizes[quantityInd][1]; i++) {
      quantityDropDownItems.push(
        <Dropdown.Item
          value={ i + 1 }
          onClick={ quantityHandler }
          key={ i + 1 }
          data-ind={ i + 1 }>{i + 1}
        </Dropdown.Item>
      );
    }
  }

  useEffect(() => {
    setSize('Select Size');
    setQuantity('Select Quantity');
    setQuantityInd(0);
    setButtonDisabled(true);
  }, [styles]);

  useEffect(() => {
    setQuantity('Select Quantity');
  }, [style]);

  return (
    <div className="main-cart">
      <DropdownButton id="dropdown-basic-button" className="product-buttons size-but" title={ size }>
        {skus ? sizes.map((option, index) => {
          return (<Dropdown.Item onClick={ sizeHandler } key={ index } style={{width: '100%' }} value={ option[0] } data-ind={ index } >{ option[0] }</Dropdown.Item>);
        }) : ''}
      </DropdownButton>
      <DropdownButton
        id="dropdown-basic-button"
        className="product-buttons"
        title={ quantity }
        disabled={ buttonDisabled }>
        {quantityDropDownItems ? quantityDropDownItems : ''}
      </DropdownButton>
      <Button
        variant="primary"
        disabled={ addToCartDisabled }
        onClick={ addToLocalCart }
        className="product-buttons add-to-cart"><span className="button-text">Add To Cart</span>+</Button>{' '}
      <Button variant="primary" className="product-buttons"> &#9734; </Button>{' '}
    </div>
  );
};

export default AddToCart;